import type { Metadata } from 'next'
import type React from 'react'
import Image from "next/image";
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ButikLogo } from '@/components/Logo';
import { Fredoka } from "next/font/google";

const lexend = Fredoka({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s - Demobutik',
    default: 'Home',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={lexend.className}>
        <div className="flex w-full p-8 justify-between items-center">
          <ButikLogo/>
          <div className="flex items-center gap-2">
            <Image src={"/flags/ng.svg"} alt="flag" width={20} height={20} />
            <div className="text-[.82rem] font-medium">Nigeria (English)</div>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </div>
        {children}
        {/* footer */}
      </body>
    </html>
  )
}