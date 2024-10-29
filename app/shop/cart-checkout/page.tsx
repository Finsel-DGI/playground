import { Subheading } from "@/components/heading";
import { Link } from "@/components/link";
import { images } from "@/lib/constants";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { CheckoutElement } from "./checkout";
import { getEID } from "@/session/getEID";
import { redirect } from "next/navigation";

export default async function Page() {
  const eid = await getEID();

  // if (!eid) redirect("/");

  return (
    <main className="min-h-screen">
      <div className="flex h-screen">
        <div className="w-[60%] h-screen lg:flex hidden flex-col px-10 space-y-8">
          <Link href={'/shop/t-shirt'} className="text-sm font-light text-black">
            <ArrowLeftIcon/>
            Demobutik, Inc
          </Link>

          <Subheading>Checkout</Subheading>

          <img
            alt="Shirt rendering"
            src={images['black']}
            className="aspect-[4/3] w-full lg:w-[40%] rounded-sm object-cover"
          />
          <div className="text-2xl">18, 200 NGN</div>
        </div>
        <div className="w-[40%] h-screen flex flex-col shadow-md py-4 px-10">
          <CheckoutElement eid={eid}/>
        </div>
      </div>
    </main>
  );
}