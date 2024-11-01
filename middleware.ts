import { keys } from "@finsel-dgi/pasby-react";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
  const authenticated = cookies().get(keys.eid)?.value;
  if (!authenticated) return NextResponse.redirect(new URL(`/shop/t-shirt`, request.url));
  return NextResponse.next();
}


export const config = {
  matcher: ["/shop/cart-checkout"],
};