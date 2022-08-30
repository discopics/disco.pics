import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast } from "../lib/toast";
import CodeMirror from '@uiw/react-codemirror';
import { css } from "@codemirror/lang-css";
import { githubDark } from "@uiw/codemirror-theme-github";
import prettier from 'prettier';
import { Status } from "../types/Request";
import { m } from "framer-motion";

function CustomCSS() {
  
  const [customCSS, setCustomCSS] = useState("");

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
        }
      }
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
        <div className="flex flex-col justify-center items-center h-full mt-5 gap-2 mx-5">
          <CodeMirror
            value={customCSS}
            onChange={(value) => setCustomCSS(value)}
            height="16rem"
            extensions={[css()]}
            theme={githubDark}
            className="w-full p-2 border-2 border-slate-500 rounded-md"
          />
        </div>
      </Layout>
    </div>
  );
}

export default CustomCSS;
