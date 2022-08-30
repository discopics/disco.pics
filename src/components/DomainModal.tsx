import React, { useEffect, useState } from "react";
import { useModals } from "../context/Modal";
import { toast } from "../lib/toast";

function DomainModal() {
  const [domain, setDomain] = useState("");
  const [err, setErr] = useState("");
  const [verification, setVerification] = useState("");
  const [loading, setLoading] = useState(false);
  const { close } = useModals();

  useEffect(() => {
    const randomString = Math.random().toString(36).substring(2, 12);
    setVerification(randomString);
  }, []);

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
                <td className="border p-2">cname.vercel-dns.com</td>
              </tr>
              <tr className="border p-2">
                <td className="border p-2">TXT</td>
                <td className="border p-2">_disco</td>
                <td className="border p-2">{verification}</td>
              </tr>
            </table>

            <button
              onClick={async () => {
                toast("Adding domain", "loading");
                setLoading(true);
                const res = await fetch(
                  `/api/domain?domain=${domain}&verification=${verification}`
                );
                const data = await res.json();
                setLoading(false);
                if (res.status === 200) {
                  toast("Domain added", "success");
                  close();
                  window.location.reload();
                  return;
                }
                if (data.error == "DOMAIN_ALREADY_EXISTS") {
                  toast("Domain already exists", "error");
                  setErr("Domain already exists");
                  return;
                }
                if (data.error == "DOMAIN_LIMIT_REACHED") {
                  toast("Domain limit reached", "error");
                  setErr("Domain limit reached");
                  return;
                }
                if (data.error == "CNAME_ERROR") {
                  toast("CNAME records are invalid", "error");
                  setErr(
                    "CNAME records are invalid. Please recheck your records and try again."
                  );
                }
              }}
              className="flex mt-5 items-center py-2 px-4 gap-1 text-base text-gray-900 rounded-lg dark:text-rose-500 font-normal hover:bg-gray-100 dark:bg-rose-400/10 dark:hover:bg-rose-400/20"
            >
              Add domain {loading && "Checking..."}
            </button>

            {err && <span className="text-red-500 mt-2">{err}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default DomainModal;
