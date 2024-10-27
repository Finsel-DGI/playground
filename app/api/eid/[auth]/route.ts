import { NextRequest, NextResponse } from "next/server";
import { eidResource, loginWithSecret, tokenSwap } from "@finsel-dgi/pasby-react/server";
import { keys } from "@finsel-dgi/pasby-react";
import { cookies } from "next/headers";
import { expiresAt, unixTimestampToMaxAge } from "@rebatlabs/ui-funs";

export async function GET(req: NextRequest, { params }: { params: { auth: string } }) {
  try {
    switch (params.auth) {
      case 'login':
        return await login(req);
      case 'handshake':
        return await handshake(req);
      case 'user':
        return await resource(req);
      default:
        return NextResponse.json({ error: 'Method request not accepted' }, {
          status: 400,
        });
    }
  } catch (error) {
    const message = (error as Error).message;
    console.error(`This happens: ${message}`);
    return NextResponse.redirect(constructErrorPath(req, message));
  }
}



async function login(req: NextRequest, redirect = false) {
  const searchParams = req.nextUrl.searchParams;
  const state = searchParams.get('state');

  const res = await loginWithSecret({
    claims: ['naming.given', 'naming.family', 'contact.phone', 'contact.email', 'address.country', 'address.postcode', 'address.city', 'address.place', 'address.formatted'],
    action: 'login',
    payload: 'SDK development',
    redirect_uri: req.nextUrl.origin + '/api/eid/handshake'
  });
  await setChallengeCookie(res.pkceverifier);
  if (state) await setRedirectState(state);
  if (redirect) {
    return NextResponse.redirect(res.redirect);
  } else {
    return NextResponse.json({ url: res.redirect });
  }
}

async function handshake(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('handshake') ?? '';
  const flow = searchParams.get('flow') ?? '';
  const verifier = cookies().get(keys.pkce)?.value;
  if (!verifier) {
    throw new Error("You are not permitted to commit such authentication action.");
  }
  const res = await tokenSwap({
    flow,
    code,
    pkceverifier: verifier,
  });
  await setChallengeCookie(res.challenge, res.exp, keys.csrf);
  cookies().set(keys.eid, res.access,
    { maxAge: unixTimestampToMaxAge(res.exp), secure: true, sameSite: true, httpOnly: true });
  // return to your fall back url like /dashboard or saved state
  const state = cookies().get(keys.state)?.value
  return NextResponse.redirect(`${req.nextUrl.origin}${state ? state : '/dashboard'}`);
}

async function resource(_req: NextRequest) {
  const challenge = cookies().get(keys.csrf)?.value;
  const accessCode = cookies().get(keys.eid)?.value;
  const res = await eidResource({
    challenge,
    accessCode
  });
  return NextResponse.json({ user: res });
}

const constructErrorPath = (req: NextRequest, e: string): string => {
  return `${req.nextUrl.origin}${authError(e)}`;
}

function authError(e: string) {
  return `/?reject=${btoa((e))}`;
}

async function setChallengeCookie(value: string, expires?: number, key?:string) {
  const exp = expires ?? expiresAt(10, 'm');
  cookies().set(key ?? keys.pkce, value,
    { secure: true, sameSite: true, maxAge: unixTimestampToMaxAge(exp) });
}

async function setRedirectState(value: string) {
  const exp = expiresAt(10, 'm');
  cookies().set(keys.state, value,
    { secure: true, sameSite: true, maxAge: unixTimestampToMaxAge(exp) });
}