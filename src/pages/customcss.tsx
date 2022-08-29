import React, { useState } from "react";
import Layout from "../components/Layout";
import { toast } from "../lib/toast";

function CustomCSS() {
  const [customCSS, setCustomCSS] = useState("");
  return (
    <div>
      <Layout page="Custom CSS">
        <div className="flex justify-between  m-4">
          <h1 className="text-white text-2xl">Custom CSS</h1>
          <div>
            {/* Save changes button */}
            <button
              className="px-3 py-2 border-2 rounded-md border-rose-400/20 hover:bg-rose-400/30 text-white cursor-pointer"
              onClick={async () => {
                const res = await fetch("/api/updateCss?css=" + customCSS);
                if (res.status == 200) {
                  toast("CSS settings updated", "success");
                } else {
                  toast("Error updating CSS settings", "error");
                }
              }}
            >
              Save changes
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-full mt-5 gap-2 mx-5">
          <textarea
            className="w-full h-64 p-2 border-2 border-slate-500 rounded-md bg-dark-light text-white"
            placeholder="Enter your custom CSS here"
            value={customCSS}
            onChange={(e) => setCustomCSS(e.target.value)}
          />
        </div>
      </Layout>
    </div>
  );
}

export default CustomCSS;
