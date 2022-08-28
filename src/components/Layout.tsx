import React from "react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex dark">
      <div>
        <Navbar />
      </div>

      <div className="w-full bg-dark">
        {/* main */}
        <Topbar/>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
