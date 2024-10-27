import { User } from "@finsel-dgi/pasby-react";
import { keys } from "@finsel-dgi/pasby-react";
import { eidResource } from "@finsel-dgi/pasby-react/server";
import { cookies } from "next/headers";

export const getEID = async (): Promise<User | undefined> => {
  const access = cookies().get(keys.eid)?.value;
  if (!access) return;
  const challenge = cookies().get(keys.csrf)?.value;
  const accessCode = cookies().get(keys.eid)?.value;
  try {
    const res = await eidResource({
      challenge,
      accessCode
    });
    // console.log(`User info -- ${JSON.stringify(res)}`);
    return res;
  } catch (error) {
    console.error(`EID resource error: ${error}`);
    return;
  }
}