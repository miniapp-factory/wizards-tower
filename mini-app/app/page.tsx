import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import SlotMachine from "@/components/slot-machine";

export { generateMetadata };

import Head from 'next/head';
export default function Home() {
  // NEVER write anything here, only use this page to import components
  return (
    <>
      <Head>
        <meta name="base:app_id" content="691fb0637f22d95cdee2ffa9" />
      </Head>
      <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
        <span className="text-2xl">{title}</span>
        <span className="text-muted-foreground">{description}</span>
        <SlotMachine />
      </main>
    </>
  );
}
