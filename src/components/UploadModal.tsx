import React, { useState } from "react";
import { useModals } from "../context/Modal";

function UploadModal({ input }: { input: File }) {
  const [name, setName] = useState("Auto");
  const { close } = useModals();

  const uploadImg = async (input: File, slug: string) => {
    if (!input) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = async () => {
      const base64 = reader.result as string;
      const [name, ext] = input.name.split(".");
      const res = await fetch(
        `/api/upload?name=${name}&type=${ext}${
          slug == "Auto" ? "" : "&slug=" + slug
        }`,
        {
          method: "POST",
          body: base64,
        }
      );
      const data = await res.json();
      if (data.success === 0) {
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
        <div className="md:absolute md:top-10 w-44 bg-dark rounded-md flex flex-col items-center p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={URL.createObjectURL(input)}
            alt="Upload preview"
            className="object-cover w-40 h-40"
          />
          <span className="mt-2 font-mono">{input.name}</span>
          <span className="text-xs text-gray-500">
            {getSizeString(input.size)}
          </span>
        </div>

        {/* Inputs */}
        <div className="flex flex-col  md:mx-10 gap-4 mt-10 md:mt-52 ">
          <div>
            <label htmlFor="nameInput" className="block text-sm text-gray-400">
              Slug
            </label>
            <input
              className="text-white bg-dark rounded-md px-2 py-1 mt-2"
              defaultValue="Auto"
              id="nameInput"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Upload button */}
          <div className="flex items-center ">
            <button
              onClick={async () => {
                uploadImg(input, name);
              }}
              className="px-3 py-1 bg-blue-500 rounded-md"
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
