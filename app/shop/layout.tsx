import type { Metadata } from 'next'
import type React from 'react'
import Image from "next/image";
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ButikLogo } from '@/components/Logo';

export const metadata: Metadata = {
  title: "Shop"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full p-8 justify-between items-center">
        <ButikLogo />
        <div className="flex items-center gap-2">
          <Image src={"/flags/ng.svg"} alt="flag" width={20} height={20} />
          <div className="text-[.82rem] font-medium">Nigeria (English)</div>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </div>
      {children}
    </>
  )
}