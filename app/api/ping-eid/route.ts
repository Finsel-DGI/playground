import { keys } from "@finsel-dgi/pasby-react";
import { pingSignatureFlows } from "@finsel-dgi/pasby-react/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = cookies().get(keys.eid)?.value;
  if (!token) {
    return NextResponse.json({ error: "No session found" }, {
      status: 400,
    });
  }
  const req: { id: string } = await request.json();
  try {
    const res = await pingSignatureFlows(req.id ?? '');
    return NextResponse.json(res);
  } catch (error) {
    const e = (error as Error);
    console.log(`Error response -- ${e}`);
    return NextResponse.json({ error: e.message }, {
      status: 400,
    });
  }
}