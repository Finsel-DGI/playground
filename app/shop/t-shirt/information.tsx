"use client"

import { AuthenticationButton } from "@/components/branding/button";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { User } from "@finsel-dgi/pasby-react";
import { getValueByQuery } from "@rebatlabs/ui-funs";
import { useRouter } from "next/navigation";

export function MyInformation({eid}: {eid?: User}) {
  return (
    <div className="rounded-xl ring-1 ring-gray-200 flex flex-col items-center px-10 py-8 space-y-4">
      {!eid && (
        <>
          <AuthenticationButton style='dark' type='identify' className="lg:w-[60%] w-[90%]" returnPage="/shop/t-shirt" />
          <div className="flex w-full items-center gap-2">
            <div className="w-[60%] bg-gray-300 h-[.1rem]" />
            <Text>Or</Text>
            <div className="w-[60%] bg-gray-300 h-[.1rem]" />
          </div>
        </>
      )}
      <Form eid={eid?.claims}/>
    </div>
  );
}

const fields = [
  {
    label: "First name *",
    map: "naming.given",
    type: "text"
  },{
    label: "Last name *",
    map: "naming.family",
    type: "text"
  },{
    label: "Mobile number *",
    map: "contact.phone",
    type: "tel"
  },{
    label: "Email *",
    map: "contact.email",
    type: "email"
  },{
    label: "Postal code *",
    map: "address.postCode",
    type: "text"
  },{
    label: "City *",
    map: "address.city",
    type: "text"
  },
]

function Form({ eid }: { eid?: Record<string, unknown> }) {
  const router = useRouter();

  const onSubmit = async () => {
    router.push("/shop/cart-checkout");
  }

  return (
    <form className="space-y-4 w-full" onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div key={index}>
            <input className="w-full border rounded-r p-2" placeholder={field.label} type={field.type}
              defaultValue={getValueByQuery(eid, field.map)} disabled={getValueByQuery(eid, field.map) !== undefined} />
          </div>
        ))}
        <div className="col-span-2">
          <select required className="w-full border rounded p-2"
            defaultValue={getValueByQuery(eid, 'address.country')}
            disabled={getValueByQuery(eid, 'address.country') !== undefined}>
            <option value="Nigeria">Nigeria</option>
            {/* Add more countries as needed */}
          </select>
        </div>
      </div>
      <div className="py-4"/>
      <div className="w-full flex justify-center">
        <Button type="submit" className="lg:w-[40%] w-[80%]">
          <p className="text-lg font-medium">Continue to checkout</p>
        </Button>
      </div>
    </form>
  );
}
