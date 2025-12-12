import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MiniAppProvider } from "@/components/context/miniapp-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { description, title } from "@/lib/metadata";
import Head from 'next/head';

const inter = localFont({
  src: "./InterVariable.ttf",
});

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"><Head><meta name="base:app_id" content="691fb0637f22d95cdee2ffa9" /></Head>
      <body className={`${inter.className} antialiased dark`}>
        <MiniAppProvider>
          <div className="font-sans min-h-screen flex flex-col place-content-between gap-2">
            <Header />
            {children}
            <Footer />
          </div>
        </MiniAppProvider>
      </body>
    </html>
  );
}
