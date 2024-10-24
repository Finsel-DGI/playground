'use client'

import { AuthenticationButton } from "@/components/branding/button";
import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { Logo } from "@/components/Logo";
import { Text, TextLink } from "@/components/text";
import { ChevronDownIcon, EnvelopeOpenIcon, TokensIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import { Fredoka } from "next/font/google";



const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'auto',
  variable: '--font-inter',
});


const methods = [
  {
    text: "pasby®",
    "icon": <Logo variant='original' height={16} width={16}/>
  },
  {
    text: "Email",
    "icon": <EnvelopeOpenIcon className="w-4 h-4" />
  },
  {
    text: "Phone",
    "icon": <TokensIcon className="w-4 h-4" />
  }
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex h-screen">
        <div className="w-[60%] h-screen flex flex-col items-center">
          {/* Header */}
          <div className="flex w-full p-8 justify-end items-center">
            <div className="flex items-center gap-2">
              <Image src={"/flags/ng.svg"} alt="flag" width={20} height={20}/>
              <div className="text-[.82rem] font-medium">Nigeria (English)</div>
              <ChevronDownIcon className="w-4 h-4"/>
            </div>
          </div>

          {/* Body */}
          <div className="mt-8">
            <h1 className={"text-3xl text-center font-light"}>
              Welcome to Incar Private Bank
            </h1>
            <Text className="text-center mt-1" textSize="text-sm">Choose your login method</Text>
          </div>

          <div className="my-12 h-12 bg-gray-200 w-1/2 rounded-l grid grid-cols-3 p-1">
            {methods.map((m, index) => (
              <div key={index} className={clsx("flex justify-center items-center gap-2 p-2", index === 0 ? "bg-white rounded-l": "")}>
                {m.icon}
                <div className="text-sm font-semibold">{m.text}</div>
              </div>
            ))}
          </div>

          <div className="text-lg">
            Login with pasby®
          </div>
          <div className="pt-2 text-slate-500 text-sm mb-8">
            The pasby® app allows you to log in easily and securely.
          </div>

          <div className="w-1/2 flex flex-col justify-center mt-6">
            <AuthenticationButton type='login' style='original' className="mb-4"/>
            <Button className="w-full rounded-lg" color="dark">
              Download pasby®
            </Button>
            <TextLink href={"/"} className="text-sm text-center my-4">How to use pasby®?</TextLink>
            <Divider className="my-2" />
            
          </div>
        </div>
        <div className="w-[40%] flex flex-col bg-gray-900 justify-center items-center px-20">
          <div className={clsx("text-white text-5xl", fredoka.variable)}>Incar</div>
          <Divider className="bg-white m-2" />
          <div className={clsx("text-white text-xl", fredoka.variable)}>PRIVATE BANK</div>
        </div>
      </div>
    </main>
  );
}
