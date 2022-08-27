import React, { useState } from "react";
import { ImageType } from "../types/Types";

const dateToText = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month}/${day}/${year}`;
};

function ImgView({ img }: { img: ImageType }) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="rounded-xl bg-dark flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="absolute flex justify-end z-0">
          {/* Copy to clipboard button */}
          <button
            className={`inline-flex gap-1 p-2 rounded-lg hover:bg-blue-400 bg-slate-300/50 m-3 ${
              isCopied && "bg-green-400"
            }`}
            onClick={() => {
              navigator.clipboard.writeText("http://localhost:3000/i/" + img.slug);
              setIsCopied(true);

              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            }}
          >
            {!isCopied ? (
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
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            ) : (
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
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>
            )}
          </button>

          {/* Link button */}
          <button
            className="inline-flex gap-1 p-2 rounded-lg hover:bg-blue-400 bg-slate-300/50 m-3"
            onClick={() => {
              window.open("http://localhost:3000/i/" + img.slug, "_blank");
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
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full rounded-t-xl"
          src={
            img.img_url.replace("cdn.discordapp.com", "media.discordapp.net") +
            "?width=300&height=300"
          }
          alt={img.slug}
        />
        {/* Info about image */}
        <div className="flex flex-col justify-center items-center p-3">
          <div className="text-center text-gray-900 dark:text-white">
            <div className="font-medium">{img.slug}</div>
            <div className="text-gray-400">
              Uploaded at {dateToText(img.uploaded_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImgView;
