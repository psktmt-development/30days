import { Inter } from "next/font/google";
import Head from "next/head";
import { TrackerApp } from "@/components/tracker/TrackerApp";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>No Eating Out</title>
      </Head>
      <main className={inter.className}>
        <TrackerApp />
      </main>
    </>
  );
}
