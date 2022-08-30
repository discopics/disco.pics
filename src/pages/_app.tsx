import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import { ModalManager, ModalProvider } from "../context/Modal";
import UploadModal from "../components/UploadModal";
import Head from "next/head";
import MobileNavbar, { MobilNavProvider } from "../components/MobileNavbar";
import { Toaster } from "react-hot-toast";
import DomainModal from "../components/DomainModal";

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
  {
    id: "domain",
    title: "Add domain",
    content: () => <DomainModal />,
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

        <meta
          name="description"
          content="Disco.Pics is a free and open source image hosting service."
        />
        <meta name="og:title" content="Disco.Pics" />
        <meta
          name="og:description"
          content="Disco.Pics is a free and open source image hosting service."
        />
        <meta name="og:image" content="https://app.disco.pics/og-image.png" />
        <meta name="og:url" content="https://app.disco.pics" />
        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@disco_pics" />
        <meta name="twitter:creator" content="@disco_pics" />
        <meta name="twitter:title" content="Disco.Pics" />
        <meta
          name="twitter:description"
          content="Disco.Pics is a free and open source image hosting service."
        />
        <meta name="twitter:image" content="https://app.disco.pics/og-image.png" />
        
      </Head>
      <Toaster />
      <div className="dark">
        <SessionProvider session={session}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <MobilNavProvider>
            <MobileNavbar />
            <ModalProvider modals={modals}>
              <ModalManager />
              <Component {...pageProps} />
            </ModalProvider>
          </MobilNavProvider>
        </SessionProvider>
      </div>
    </>
  );
};

export default MyApp;
