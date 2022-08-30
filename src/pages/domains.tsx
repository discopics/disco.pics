import React from "react";
import Layout from "../components/Layout";
import { useModals } from "../context/Modal";
import useRedisUser from "../hooks/useRedisUser";

function CustomDomain() {
  const user = useRedisUser();
  const { open } = useModals();
  return (
    <Layout page="Custom Domains">
      <div className="m-4 flex justify-between">
        <h1 className="text-white text-2xl">Custom domains</h1>

        {/* Add domain button */}
        <button
          onClick={() => {
            open("domain");
          }}
          className="flex items-center py-2 px-4 gap-1 text-base text-gray-900 rounded-lg dark:text-rose-500 font-normal hover:bg-gray-100 dark:bg-rose-400/10 dark:hover:bg-rose-400/20"
        >
          Add domain
          <span className="ml-1 text-gray-500 dark:text-gray-300">Beta</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {user.user?.user.domains?.map((domain) => (
          <div
            key={domain}
            className="flex flex-col justify-center items-center py-4 rounded-xl text-white mx-4 bg-rose-400/20"
          >
            <div className="flex justify-between items-center w-full px-5">
              <div className="font-bold text-2xl">{domain}</div>
              <button
                onClick={async () => {
                  const res = await fetch("/api/domain?domain=" + domain, {
                    method: "DELETE",
                  });
                  if (res.status === 200) {
                    window.location.reload();
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default CustomDomain;
