import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import { ModalManager, ModalProvider } from "../context/Modal";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ModalProvider modals={[]}>
        <ModalManager />
        <Component {...pageProps} />
      </ModalProvider>
    </SessionProvider>
  );
};

export default MyApp;
