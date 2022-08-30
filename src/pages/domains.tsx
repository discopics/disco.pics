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
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {user.user?.user.domains?.map((domain) => (
          <div
            key={domain}
            className="flex flex-col justify-center items-center py-4 rounded-xl text-white mx-4 bg-rose-400/20"
          >
            <div className="flex justify-center items-center">
              <div className="font-bold text-2xl">{domain}</div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default CustomDomain;
