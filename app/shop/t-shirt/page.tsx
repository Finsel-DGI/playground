// import Image from "next/image";

import { Heading, Subheading } from "@/components/heading";
import { capitalizeWords } from "@rebatlabs/ui-funs";
import { MyInformation } from "./information";
import { getEID } from "@/session/getEID";
import { images } from "@/lib/constants";

const colorVariants = ["black", "white"];
const sizeVariants = ["xs", "s", "md", "l", "xl"];

export default async function Page({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const color = searchParams.color as string | undefined;
  const size = searchParams.size as string | undefined;

  const eid = await getEID();

  return (
    <main className="min-h-screen py-10">
      <div className="mt-16 pb-14 px-4 lg:px-8 flex flex-col lg:flex-row gap-6 justify-center items-start">
        <img
          alt="Shirt rendering"
          src={images['black']}
          className="aspect-[4/3] w-full lg:w-[40%] rounded-sm object-cover"
        />
        <div className='flex-col flex space-y-4 lg:w-[50%]'>
          <div className='flex flex-wrap items-center gap-2 text-sm font-light text-gray-800/60'>
            <div className='text-orange-700 font-medium'>
              {capitalizeWords("top seller")}
            </div>
          </div>
          <Heading level={2} className="text-2xl sm:text-3xl lg:text-4xl">Return of the seamless</Heading>
          <div className="text-2xl">18, 200 NGN</div>
          <div />
          <Subheading>Checkout direct</Subheading>
          <p>Try out purchase confirmation with your own data and carry out test payments with a smooth 3D secure interface using the power of pasby eIDs. In this demonstration no money changes hands and we do not store or use your personal information for anything outside this demonstration.</p>
          <Subheading>My information</Subheading>
          <p>You can end up filling this whole thing one by one or just simply use a pasby eID - it up to you ;)</p>
          <MyInformation eid={eid}/>
        </div>
      </div>
    </main>
  );
}
