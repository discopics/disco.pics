import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import { ModalManager, ModalProvider } from "../context/Modal";
import UploadModal from "../components/UploadModal";
import Head from "next/head";

const modals = [
  {
    id: "upload",
    title: "Upload",
    content: (props: {
      input: File;
      ups: string;
      setUps: (ups: string) => void;
    }) => <UploadModal {...props} />,
  },
];

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Disco.Pics</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#9f00a7" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <SessionProvider session={session}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <ModalProvider modals={modals}>
          <ModalManager />
          <Component {...pageProps} />
        </ModalProvider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
