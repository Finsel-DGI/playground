import { keys } from "@finsel-dgi/pasby-react";
import { confirmWithPasby, getUser } from "@finsel-dgi/pasby-react/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = cookies().get(keys.eid)?.value;
  if (!token) {
    return NextResponse.json({ error: "No session found" }, {
      status: 400,
    });
  }
  const user = await getUser({ cookie: token });
  const req: { amount: string, card: string, date: string, } = await request.json();

  try {
    const res = await confirmWithPasby({
      payload: `
      **Approve your payment**

      \n\nAmount: __${req.amount}__
      \n\nVendor: **Demobutik**

      \n\n\n\n
      This demonstration leverages the same e-commerce application's service provider credentials to simulate a card authorization process. It aims to provide insight into the potential of utilizing pasby eIDs for card 3D secure transactions, as an alternative to traditional methods involving OTP codes, email, and passwords.
    `,
      nin: user.eid,
    });
    return NextResponse.json(res);
  } catch (error) {
    const e = (error as Error)
    return NextResponse.json({ error: e.message }, {
      status: 400,
    });
  }
}