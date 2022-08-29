import React from "react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import { useSession } from "next-auth/react";

function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page?: string;
}) {
  const { data: session } = useSession();

  return (
    <div className="flex dark">
      {session && (
        <div>
          <Navbar />
        </div>
      )}

      <div className="w-full bg-dark min-h-screen">
        {/* main */}
        <Topbar page={page} />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
