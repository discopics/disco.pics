import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function Api() {
  const [currentToken, setCurrentToken] = useState("Fetching...");

  useEffect(() => {
    const fetchToken = async () => {
      const f = await fetch("/api/loggedInAPI");
      const res = await f.json();
      setCurrentToken(res.data.token);
    };
    fetchToken();
  }, []);

  return (
    <div>
      <Layout page="API">
        {/* Current token (blurred, visible on hover) */}
        <div className="text-white m-4">
          Here&apos;s your current API key. Keep it safe!
          <div
            onClick={() => {
              navigator.clipboard.writeText(currentToken);
            }}
            className="blur-sm mt-2 bg-slate-700 w-fit text-white hover:blur-0 flex group"
          >
            {currentToken}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hidden group-hover:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
          </div>
          <button
            onClick={async () => {
              const f = await fetch(
                `/api/loggedInAPI?currentToken=${currentToken}`,
                {
                  method: "DELETE",
                }
              );
              const res = await f.json();
              setCurrentToken(res.data.token);
            }}
            className="px-4 py-2 mt-2 bg-red-500/20 border-2 border-red-600 text-white hover:bg-red-600 rounded-md"
          >
            RESET TOKEN
          </button>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">How to use the API</h2>
            <div className="mt-2">
              <h3 className="text-lg font-semibold">Authentication</h3>
              All API requests must include an
              <span className="bg-gray-800 rounded-md p-1">auth</span> header
              set to your API key.
              <hr className="bg-gray-800 my-4 w-12" />
              <div>
                <span className="bg-gray-800 rounded-md p-1">
                  POST /api/upload
                </span>

                <div className="mt-2">
                  <h4 className="text-lg font-semibold">Body</h4>
                  <div className="mt-2">
                    Body should be a base64 encoded image.
                  </div>
                  <h4 className="text-lg font-semibold">Parameters</h4>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-gray-800 rounded-md p-1">
                      name (filename)
                    </span>
                    <span className="bg-gray-800 rounded-md p-1">
                      type (png/jpg/...)
                    </span>
                    <span className="bg-gray-800 rounded-md p-1">domain</span>
                    <span className="bg-gray-800 rounded-md p-1">
                      (optional) slug
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Api;
