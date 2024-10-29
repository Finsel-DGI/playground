"use client"

import { useState } from "react";
import { ButtonType } from "./BrandButtons";
import clsx from 'clsx'
import { useRouter } from "next/navigation";
import { capitalizeWords } from "@rebatlabs/ui-funs";
import { Logo } from "../Logo";

export type pasbyStyling = 'original' | 'dark' | 'light' | 'darktext';

const baseStyle = {
  original: {
    logoBgk: '#fff',
    logo: '#dd3e3e',
    text: 'text-[#fff]',
    bgk: 'bg-[#dd3e3e]',
  }, light: {
    logoBgk: '#dd3e3e',
    logo: '#fff',
    text: 'text-[#dd3e3e]',
    bgk: 'bg-[#fff]',
  }, dark: {
    logoBgk: '#dd3e3e',
    logo: '#fff',
    text: 'text-[#fff]',
    bgk: 'bg-[#2D3131]',
  },darktext: {
    logoBgk: '#fff',
    logo: '#000',
    text: 'text-[#000]',
    bgk: 'bg-[#fff] border-zinc-950/10',
  },
}

const variantStyle = {
  original: 'bg-[#dd3e3e]',
  dark: 'bg-[#2D3131]',
  light: 'bg-[#fff]',
}

type ButtonProps = ({
  type: ButtonType;
  style: pasbyStyling;
  className?: string;
  onClick?: () => Promise<void>
})

function Spinner({ className }: {
  className?: string
}) {
  return (
    <svg aria-hidden="true" role="status" className={clsx("inline w-4 h-4 me-3 text-gray-200 animate-spin", className)} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#2D3131" />
    </svg>
  );
}

export function PasbyButton({ type, style, onClick, className }: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (!onClick) {
      setIsLoading(false);
      return;
    }
    await onClick();
    setIsLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx('relative flex justify-center items-center rounded-lg gap-2 px-8 py-2 text-sm',
        `${baseStyle[style].text} ${baseStyle[style].bgk} hover:${baseStyle[style].bgk}/[2.5%] focus:${baseStyle[style].bgk}/[5%]`,
        'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:shadow-md focus:shadow-md',
        isLoading ? 'brightness-75' : '',
        className)}>
      {
        isLoading ?
          <Spinner className="absolute right-2 w-5 h-5" />
          : null
      }
      <Logo className="w-8 h-8" coloring={{
        text: baseStyle[style].logo,
        fill: baseStyle[style].logoBgk
      }} />

      {capitalizeWords(type)} with pasby
    </button>
  );
}

export function AuthenticationButton({ type, style, onClick, returnPage, className}: ButtonProps & {returnPage?: string}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleClick = async () => {
    setIsLoading(true);
    if (onClick) {
      await onClick();
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`/api/eid/login${returnPage ? `?state=${returnPage}`: ''}`);
      const { url } = await response.json();
      router.push(url);
    } catch (e) {
      console.error(`pasby button click error: ${(e as Error).message}`)
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx('relative flex justify-center items-center rounded-lg gap-2 px-8 py-2 text-sm',
        `${baseStyle[style].text} ${baseStyle[style].bgk} hover:${baseStyle[style].bgk}/[2.5%] focus:${baseStyle[style].bgk}/[5%]`,
      'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:shadow-md focus:shadow-md',
      isLoading ? 'brightness-75' : '',
      className)}>
      {
        isLoading ?
          <Spinner className="absolute right-2 w-5 h-5"/>
          : null
      }
      <Logo className="w-8 h-8" coloring={{
        text: baseStyle[style].logo,
        fill: baseStyle[style].logoBgk
      }} />

      {capitalizeWords(type)} with pasby
    </button>
  );
}
