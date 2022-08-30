import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast } from "../lib/toast";
import CodeMirror from '@uiw/react-codemirror';
import { css } from "@codemirror/lang-css";
import { githubDark } from "@uiw/codemirror-theme-github";
import { Status } from "../types/Request";

function CustomCSS() {

  const [customCSS, setCustomCSS] = useState("");
  const [loading, setLoading] = useState(true);

  const minifyCSS = (css: string) => {
    return css
      .replace(/\s+/g, " ")
      .replace(/\s*([{}])\s*/g, "$1")
      .replace(/;}/g, "}");
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/user");
      const user = await response.json();
      if (user.success === Status.Success) {
        const resp = await fetch('/api/formatCss', {
          method: "POST",
          body: user.data.user.custom_css
        })
        const formatted = await resp.json();
        if (formatted.success === Status.Success) {
          setCustomCSS(formatted.data);
          setLoading(false);
        }
      }
      console.log(user);
      setLoading(false);
    })();
  }, [])

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
                // Minify the CSS
                const minifiedCSS = await minifyCSS(customCSS);
                const res = await fetch("/api/updateCss", { method: "POST", body: minifiedCSS });
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
        <div className="flex flex-row flex-wrap lg:flex-nowrap justify-center items-center h-full mt-5 gap-2 mx-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="help" className="flex-shrink w-[500px]" src="https://cdn.discordapp.com/attachments/1010857352645316658/1014055092279853107/disco.jpg" />
          {loading ? (
            <div className="w-full p-2 flex justify-center items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <CodeMirror
              value={customCSS}
              onChange={(value) => setCustomCSS(value)}
              height="20rem"
              extensions={[css()]}
              theme={githubDark}
              className="w-full flex-grow p-2 border-2 border-slate-500 rounded-md"
            />
          )}
        </div>
      </Layout>
    </div>
  );
}

export default CustomCSS;
