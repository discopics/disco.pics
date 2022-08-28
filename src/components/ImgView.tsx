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
            className={`${ isCopied ? "bg-green-400" : "hover:bg-blue-400" } inline-flex justify-center items-center w-9 h-9 rounded-lg bg-slate-300/50 m-3 mr-1`}
            onClick={() => {
              navigator.clipboard.writeText("http://localhost:3000/i/" + img.slug);
              setIsCopied(true);

              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            }}
          >
            {!isCopied ? (
              <svg className="w-5 h-5 scale-90" viewBox="0 0 16 16">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.25 4.25v-2.5h-9.5v9.5h2.5m.5-6.5v9.5h9.5v-9.5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
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
            className="inline-flex justify-center items-center w-9 h-9 rounded-lg hover:bg-blue-400 bg-slate-300/50 mt-3 ml-1"
            onClick={() => {
              window.open("http://localhost:3000/i/" + img.slug, "_blank");
            }}
          >
            <svg className="w-5 h-5" strokeWidth={0.2} viewBox="0 0 24 24">
              <path fill="currentColor" stroke="currentColor" d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413Q19.825 21 19 21Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4Z" />
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
