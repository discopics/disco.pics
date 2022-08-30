import React, { useState } from "react";
import { ImageType } from "../types/Types";

const dateToText = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month}/${day}/${year}`;
};

function ImgView({
  img,
  ups,
  setUps,
}: {
  img: ImageType;
  ups: number;
  setUps: (ups: number) => void;
}) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="rounded-lg bg-dark-light border-2 border-dark-light flex flex-col items-center justify-center">
      <div className="w-full relative">
        <div className="absolute flex right-2 justify-end z-0">
          {/* Copy to clipboard button */}
          <button
            className={`${
              isCopied ? "bg-rose-400/40" : "dark:hover:bg-rose-400/30"
            } inline-flex justify-center items-center w-9 h-9 rounded-lg dark:text-rose-500 dark:bg-rose-400/20 m-3 mr-1`}
            onClick={() => {
              navigator.clipboard.writeText(
                encodeURI(
                  (process.env.NODE_ENV === "development"
                    ? "http://localhost:3000/"
                    : "https://disco.pics/") + img.slug
                )
              );
              setIsCopied(true);

              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            }}
          >
            {!isCopied ? (
              <svg className="w-5 h-5 scale-90" viewBox="0 0 16 16">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M11.25 4.25v-2.5h-9.5v9.5h2.5m.5-6.5v9.5h9.5v-9.5z"
                />
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
            className="inline-flex justify-center items-center w-9 h-9 rounded-lg dark:text-rose-500 dark:hover:bg-rose-400/30 dark:bg-rose-400/20 mt-3 ml-1"
            onClick={() => {
              window.open(
                (process.env.NODE_ENV === "development"
                  ? "http://localhost:3000/"
                  : "https://disco.pics/") + img.slug,
                "_blank"
              );
            }}
          >
            <svg className="w-5 h-5" strokeWidth={0.2} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                stroke="currentColor"
                d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413Q19.825 21 19 21Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4Z"
              />
            </svg>
          </button>

          {/* Delete button */}
          <button
            className="inline-flex justify-center items-center w-9 h-9 rounded-lg dark:text-rose-500 dark:hover:bg-rose-400/30 dark:bg-rose-400/20 mt-3 ml-1"
            onClick={async () => {
              const res = await fetch(`/api/deleteImage?slug=${img.slug}`);
              if (res.status === 200) {
                setUps(ups + 1);
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

        {
          // If image is png, jpeg, jpg, webp, show it
          img.img_url.endsWith(".png") ||
          img.img_url.endsWith(".jpeg") ||
          img.img_url.endsWith(".jpg") ||
          img.img_url.endsWith(".webp") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="w-full rounded-t-md"
              src={
                img.img_url.replace(
                  "cdn.discordapp.com",
                  "media.discordapp.net"
                ) + "?width=200&height=200"
              }
              alt={img.slug}
            />
          ) : (
            <div className="h-32 flex justify-center items-center text-slate-500">
              {img.img_url.endsWith(".mp4") || img.img_url.endsWith(".mov") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-full"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
              )}
            </div>
          )
        }

        {/* Info about image */}
        <div className="flex flex-col justify-center items-center p-3">
          <div className="text-center text-gray-900 dark:text-white">
            <div className="font-medium">{img.slug}</div>
            <div className="text-gray-400">
              Uploaded at{" "}
              <span className="font-medium">{dateToText(img.uploaded_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImgView;
