import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import NextTopLoader from "nextjs-toploader";


const lexend = Fredoka({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Demobutik',
    default: "Demobutik showcasing pasby use-cases",
  },
  description: "Here you an intended service provider can freely test our services with your pasby eID. Have fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx('h-full bg-white antialiased', lexend.className)} suppressHydrationWarning
    >
      <body className="flex h-full flex-col">
        <NextTopLoader color={"#000"} />
        <div className="flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
