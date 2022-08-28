/* eslint-disable @typescript-eslint/ban-ts-comment */
import { signIn, useSession } from "next-auth/react";
import { useModals } from "../context/Modal";

export default function Topbar() {
  const { data: session } = useSession();
  const { open } = useModals();

  return (
    <header className="sticky top-0 h-14 z-50 flex items-center justify-end px-5 bg-light dark:bg-dark-light w-full dark:text-white">
      <div className="hidden md:block">
        {!session ? (
          <button
            className="inline-flex justify-center items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/10"
            onClick={() => signIn("discord")}
          >
            Sign In
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M10 11V8l5 4l-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12A8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => {
                // Take file input
                const fileInput = document.createElement("input");
                fileInput.type = "file";

                fileInput.onchange = (e: Event) => {
                  // @ts-ignore
                  if (!e.target.files) return;

                  // @ts-ignore
                  const input = e.target.files[0];
                  open("upload", { input});
                };
                fileInput.click();
              }}
              className="flex items-center py-2 px-4 gap-1 text-base text-gray-900 rounded-lg dark:text-rose-500 font-normal hover:bg-gray-100 dark:bg-rose-400/10 dark:hover:bg-rose-400/20"
            >
              Upload
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m7-7H5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
