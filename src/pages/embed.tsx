import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useRedisUser from "../hooks/useRedisUser";

function Embed() {
  const [title, setTitle] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [color, setColor] = useState("#000000");
  const [authorName, setAuthorName] = useState("");
  const [desc, setDesc] = useState("");

  const { user } = useRedisUser();

  useEffect(() => {
    if (user?.user) {
      setTitle(
        user?.user.embed_title != "undefined" ? user?.user.embed_title : ""
      );
      setSiteName(
        user?.user.embed_site_name != "undefined"
          ? user?.user.embed_site_name
          : ""
      );
      setSiteUrl(
        user?.user.embed_site_url != "undefined"
          ? user?.user.embed_site_url
          : ""
      );
      setColor(
        user?.user.embed_colour != "undefined"
          ? `${user?.user.embed_colour}`
          : "000000"
      );
      setAuthorName(
        user?.user.embed_author_name != "undefined"
          ? user?.user.embed_author_name
          : ""
      );
      setDesc(
        user?.user.embed_desc != "undefined" ? user?.user.embed_desc : ""
      );
    }
  }, [user?.user]);

  return (
    <Layout>
      <Head>
        <title>Embed Builder | Disco.pics</title>
      </Head>
      <div>
        <h1 className="text-white text-2xl m-4">Embed Builder</h1>

        <div className="flex flex-col md:flex-row">
          <div className="m-4">
            <div className="mb-4">
              <label className="text-white">Title</label>
              <input
                className="w-full px-3 py-2 focus:outline-none border border-transparent focus:border-rose-500 bg-rose-400/5 text-rose-500 rounded-md"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="flex gap-2 mt-3">
                <div className="flex-1">
                  <label className="text-white">Site Name</label>
                  <input
                    className="w-full px-3 py-2 focus:outline-none border border-transparent focus:border-rose-500 bg-rose-400/5 text-rose-500 rounded-md"
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-white">Site Url</label>
                  <input
                    className="w-full px-3 py-2 focus:outline-none border border-transparent focus:border-rose-500 bg-rose-400/5 text-rose-500 rounded-md"
                    type="text"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Colour selector */}
              <div className="flex gap-2 w-full">
                <div className="w-full">
                  <label className="text-white">Color</label>
                  <input
                    className="w-full bg-dark-light text-white"
                    type="color"
                    value={color.startsWith("#") ? color : "#" + color}
                    onChange={(e) => setColor(e.target.value.replace("#", ""))}
                  />
                </div>

                {/* Randomise button */}
                <div className="ml-4">
                  <button
                    className="w-full mt-3 p-2 focus:outline-none border border-transparent focus:border-rose-500 bg-rose-400/5 text-rose-500 rounded-md"
                    onClick={() => {
                      const randomColor =
                        "#" + Math.random().toString(16).slice(2, 8);
                      setColor(randomColor);
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
                        d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Author name */}
              <div className="flex gap-2 mt-4 w-full">
                <div>
                  <label className="text-white">Author Name</label>
                  <input
                    className="w-full px-3 py-2 focus:outline-none border border-transparent focus:border-rose-500 bg-rose-400/5 text-rose-500 rounded-md"
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </div>
                {/* Description */}
                <div>
                  <label className="text-white">Description</label>
                  <input
                    className="w-full px-3 py-2 focus:outline-none border border-transparent focus:border-rose-500 bg-rose-400/5 text-rose-500 rounded-md"
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              className="w-full p-2 bg-rose-500 hover:bg-rose-500/70 text-white rounded-md"
              onClick={async () => {
                const res = await fetch(
                  `/api/updateEmbedSettings?embed_title=${title}&embed_site_name=${siteName}&embed_site_url=${siteUrl}&embed_colour=${color.replace(
                    "#",
                    ""
                  )}&embed_author_name=${authorName}&embed_desc=${desc}`
                );
                if (res.status == 200) {
                  alert("Embed settings updated");
                } else {
                  alert("Error updating embed settings");
                }
              }}
            >
              Save Changes
            </button>
          </div>

          <div
            className={`w-80 mx-4 md:mx-20 ${
              //   If all fields are empty
              !title && !siteName && !authorName && !desc
                ? null
                : "bg-[#2f3136]"
            } rounded-md p-3 flex flex-col`}
            style={{
              // Border on left side with colour
              borderLeft: `4px solid ${
                !title && !siteName && !authorName && !desc
                  ? null
                  : color.startsWith("#")
                  ? color
                  : "#" + color
              }`,
            }}
          >
            {/* Site name */}
            <span className="text-xs text-slate-400">{siteName}</span>
            <span className="text-white font-semibold mt-2 text-sm">
              {authorName}
            </span>
            <span className="text-blue-500 font-semibold mt-2 text-md cursor-pointer hover:underline">
              {title}
            </span>
            <span className="text-slate-400 mt-2 text-xs max-w-fit">
              {desc}
            </span>

            <div className="mt-5">
              <Image width={300} height={180} src="/og-image.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Embed;
