import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <div className="w-screen min-h-screen flex ">
      <Navbar />
      <Component {...pageProps} />
    </div>
  </SessionProvider>
);

export default MyApp;
