import React, { useState } from "react";
import { useModals } from "../context/Modal";
import useRedisUser from "../hooks/useRedisUser";
import { toast } from "../lib/toast";

function UploadModal({ input }: { input: File }) {
  const [name, setName] = useState("Auto");
  const [domain, setDomain] = useState("");
  const { close } = useModals();
  const user = useRedisUser();

  const uploadImg = async (input: File, slug: string) => {
    if (!input) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = async () => {
      toast("Uploading...", "loading");
      const base64 = reader.result as string;

      const ext = input.name.split(".").pop();
      const name = input.name.split(".").slice(0, -1);

      const res = await fetch(
        `/api/upload?name=${name}&type=${ext}${
          slug == "Auto" ? "" : "&slug=" + slug
        }&domain=${domain ? domain : "disco.pics"}`,
        {
          method: "POST",
          body: base64,
        }
      );
      const data = await res.json();
      if (data.success === 0) {
        toast("Successfully uploaded the image!", "success");
        close();
        //   Re render the page to update the images
        window.location.reload();
      }
    };
  };

  const getSizeString = (size: number) => {
    if (size < 1024) {
      return `${size}B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)}KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(2)}MB`;
    } else {
      return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
    }
  };

  return (
    <div>
      {/* Image preview in small box */}
      <div className="flex flex-col items-center justify-center overflow-y-auto">
        <div className="md:absolute md:top-12 max-h-[200px]  w-fit bg-dark rounded-md flex flex-col items-center p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={URL.createObjectURL(input)}
            alt="Upload preview"
            className="object-cover w-fit max-h-[200px] overflow-hidden"
          />
          <span className="mt-2 font-mono">{input.name}</span>
          <span className="text-xs text-gray-500">
            {getSizeString(input.size)}
          </span>
        </div>

        {/* Inputs */}
        <div className="flex w-10 justify-center items-center flex-col md:mx-10 gap-4 mt-10 md:mt-52 ">
          <div>
            <label
              htmlFor="nameInput"
              className="block text-sm -mb-1 text-gray-400"
            >
              Slug
            </label>
            <input
              className="text-rose-400 bg-rose-400/10 rounded-md px-4 py-2 mt-2"
              defaultValue="Auto"
              id="nameInput"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Domain selector */}
          <div>
            <label
              htmlFor="domainInput"
              className="block text-sm -mb-1 text-gray-400"
            >
              Domain
            </label>
            {user.user?.user.domains ? (
              <select
                className="text-rose-400 bg-rose-400/10 rounded-md px-4 py-2 mt-2"
                id="domainInput"
                onChange={(e) => setDomain(e.target.value)}
                value={domain}
              >
                <option value="disco.pics">Disco.pics</option>
                {user.user?.user.domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            ) : (
              <span id="domainInput px-4 py-2 mt-2">disco.pics</span>
            )}
          </div>

          {/* Upload button */}
          <div className="w-full flex justify-center items-center">
            <button
              onClick={async () => {
                uploadImg(input, name);
              }}
              className="px-4 flex-grow w-fit font-bold text-sm py-2 text-rose-500 border-2 border-rose-500 hover:bg-rose-500 hover:text-white rounded-md"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
