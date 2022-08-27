import React from "react";
import Navbar from "./Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex dark">
      <div>
        <Navbar />
      </div>

      <div className="w-full bg-slate-800">
        {/* main */}
        {children}
      </div>
    </div>
  );
}

export default Layout;
