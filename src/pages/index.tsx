import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { TrackerApp } from "@/components/tracker/TrackerApp";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  yesImages: string[];
  noImages: string[];
}

export default function Home({ yesImages, noImages }: HomeProps) {
  return (
    <>
      <Head>
        <title>No Eating Out</title>
      </Head>
      <main className={inter.className}>
        <TrackerApp yesImages={yesImages} noImages={noImages} />
      </main>
    </>
  );
}

const listImages = (dir: string) => {
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file));
  } catch {
    return [];
  }
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const imagesRoot = path.join(process.cwd(), "public", "images");
  return {
    props: {
      yesImages: listImages(path.join(imagesRoot, "yes")),
      noImages: listImages(path.join(imagesRoot, "no")),
    },
  };
};
