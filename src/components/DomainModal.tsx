import React, { useState } from "react";
import { toast } from "../lib/toast";

function DomainModal() {
  const [domain, setDomain] = useState("");

  const getCNAMEValue = (domain: string) => {
    // img.dhravya.dev => img
    // dhravya.dev => @

    if (domain.split(".").length == 2) return "@";

    const domainParts = domain.split(".");
    const domainPart = domainParts[0];
    return domainPart;
  };

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="domainInput">Domain name</label>
        <input
          className="rounded-md bg-slate-700 w-56 p-2 mt-2"
          type="text"
          id="domainInput"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />

        {domain && (
          <div className="mt-2">
            {/* Table */}
            <table>
              <tr className="border p-2">
                <th className="border p-2">Type</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Value</th>
              </tr>
              <tr className="border p-2">
                <td className="border p-2">CNAME</td>
                <td className="border p-2">{getCNAMEValue(domain)}</td>
                <td className="border p-2">dns.disco.pics</td>
              </tr>
            </table>

            <button
              onClick={async () => {
                toast("Adding domain", "loading");
                const res = await fetch("/api/addDomain?domain=" + domain);
                if (res.status === 200) {
                  toast("Domain added", "success");
                  return;
                }
                toast("Error adding domain", "error");
              }}
              className="flex mt-auto items-center py-2 px-4 gap-1 text-base text-gray-900 rounded-lg dark:text-rose-500 font-normal hover:bg-gray-100 dark:bg-rose-400/10 dark:hover:bg-rose-400/20"
            >
              Add domain
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DomainModal;
