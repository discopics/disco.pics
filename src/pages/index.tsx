import type { NextPage } from "next";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ImgView from "../components/ImgView";
import Layout from "../components/Layout";
import { UserType } from "../types/Types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useModals } from "../context/Modal";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserType | undefined>();
  const [input, setInput] = useState<File>();
  const [uploadLoading, setUploadLoading] = useState(false);

  const [ups, setUps] = useState<number>(0);
  const { open, openedModals, close } = useModals();

  useEffect(() => {

    (async () => {
      const response = await fetch("/api/user");
      const user = await response.json();
      console.log(user);
      setUser(user.data);
    })();
  }, [ups]);

  useEffect(() => {
    console.log(openedModals);
  }, [openedModals]);

  const uploadImg = async () => {
    const reader = new FileReader();
    if (!input) {
      return;
    }
    reader.readAsDataURL(input);
    reader.onload = async () => {
      const base64 = reader.result as string;
      const [name, ext] = input.name.split(".");
      const res = await fetch(`/api/upload?name=${name}&type=${ext}`, {
        method: "POST",
        body: base64,
      });
      const data = await res.json();
      console.log(data);
      if (data.success === 0) {
        setUps(ups + 1);
      }
      setUploadLoading(false);
    };
  };

  return (
    <Layout>
      {/* Header */}
      <header className="sticky top-0 h-12 z-50 flex items-center justify-between px-5 bg-light dark:bg-dark w-full dark:text-white">
        🔥 BornFire
        <div className="hidden md:block">
          {!session ? (
            <button
              className="inline-flex justify-center items-center gap-1 py-2 px-3 rounded-lg hover:bg-white/10"
              onClick={() => signIn("discord")}
            >
              Sign In
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <div className="flex gap-4">
              <button onClick={() => close("test")}>close</button>
              <button
                onClick={() => {
                  open("test");
                  return
                  setUploadLoading(true);
                  // Take file input
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";

                  fileInput.onchange = (e: Event) => {
                    setInput(
                      (e.target as HTMLInputElement)?.files
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          (e.target as HTMLInputElement)?.files[0]
                        : undefined
                    );
                  };
                  fileInput.click();
                  uploadImg();
                }}
                className="flex items-center p-2 text-base  font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {uploadLoading ? "Uploading..." : "Upload"}
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
                    d="M12 5v14m7-7H5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </header>

      <div>
        {session ? (
          <>
            {user ? (
              <>
                <div className="p-4">
                  <div className="mb-4">
                    <span className="text-slate-400 text-lg">Hello,</span>{" "}
                    <span className="text-xl text-white">
                      {session?.user?.name}
                    </span>
                  </div>
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
                  >
                    <Masonry gutter="10px">
                      {/* Map through images in reverse */}
                      {user.images
                        .slice(0)
                        .reverse()
                        .map((image) => (
                          <ImgView key={image.slug} img={image} />
                        ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div></div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
