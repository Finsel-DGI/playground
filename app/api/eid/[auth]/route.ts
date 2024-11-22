import { handler } from "@finsel-dgi/pasby-next/server";
import { cookies } from "next/headers";

export const GET = handler({
  claims: ['naming.given', 'naming.family', 'contact.phone', 'contact.email', 'address.country', 'address.postcode', 'address.city', 'address.place', 'address.formatted'],
  action: 'login',
  payload: "Make use of the demobutik using one of our Next.js sdk"
}, (key, value, exp) => {
  cookies().set(key, value,
    { secure: true, sameSite: true, maxAge: (exp) });
}, async (key) => {
  return cookies().get(key)?.value;
});