import { NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { getUser } from "../lib/redis";

type Image = {
  slug: string;
  img_url: string;
  id: string;
  uploaded_at: string;
  uploaded_by: string;
};

function ImageRoute({
  image,
  embed_title,
  embed_site_name,
  embed_site_url,
  embed_author_name,
  embed_desc,
  embed_colour,
}: {
  image: Image;
  embed_title: string;
  embed_site_name: string;
  embed_site_url: string;
  embed_colour: string;
  embed_author_name: string;
  embed_desc: string;
}) {
  return (
    <>
      <Head>
        {/* Image when sharing */}
        <meta property="og:image" content={image.img_url} key="og:image" />

        {/* Share embeds */}
        <meta
          property="og:description"
          content={embed_desc || ""}
          key="og:description"
        />
        <meta
          property="og:title"
          content={embed_title || "Disco.pics"}
          key="og:title"
        />

        {/* Site name */}
        <meta
          property="og:site_name"
          content={embed_site_name || "Disco.Pics"}
          key="og:site_name"
        />

        <meta
          property="og:url"
          content={embed_site_url || "https://disco.pics"}
          key="og:url"
        />
        {/* Colour */}
        <meta
          property="theme-color"
          content={embed_colour || "#000000"}
          key="theme-color"
        />
        {/* Author name, URL */}
        <meta
          property="article:author"
          content={embed_author_name || ""}
          key="article:author"
        />

        {/* Twitter */}
        <meta
          property="twitter:description"
          content={embed_desc || ""}
          key="twitter:description"
        />
        <meta
          property="twitter:title"
          content={embed_title || "Disco.pics"}
          key="twitter:title"
        />
        <meta
          property="twitter:image"
          content={image.img_url}
          key="twitter:image"
        />
        <meta
          property="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
      </Head>
      <div className="bg-black min-h-screen pt-5">
        {image && (
          <>
            <div className="h-96 relative flex flex-col">
              <Image
                src={image.img_url.replace(
                  "cdn.discordapp.com",
                  "media.discordapp.net"
                )}
                alt={image.slug}
                layout="fill"
                objectFit="contain"
                unoptimized
              />
            </div>
          </>
        )}

        <div className="flex flex-col justify-center items-center h-full mt-5 gap-2">
          <a
            className="px-3 py-2 border-2 border-blue-300 hover:bg-blue-500 text-white cursor-pointer"
            href={image.img_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            Download image {image.slug}
          </a>

          <a className="text-slate-300" href="">
            BornFire - Image hosting
          </a>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { slug } = context.query;

  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL;

  const getImage = async () => {
    const imgUrl = await fetch(`${url}/api/getImage?slug=${slug}`);
    if (imgUrl.status === 200) {
      return imgUrl.json();
    }
    return null;
  };
  const image = await getImage();

  if (!image) {
    // Redirect to 404
    context.res?.writeHead(302, { Location: "/404" });
  }

  const user = await getUser(image.uploaded_by);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userJSON: any = user?.toJSON();
  return {
    props: {
      image,
      embed_title: userJSON["embed_title"],
      embed_site_name: userJSON["embed_site_name"],
      embed_site_url: userJSON["embed_site_url"],
      embed_author_name: userJSON["embed_author_name"],
      embed_desc: userJSON["embed_desc"],
      embed_colour: userJSON["embed_colour"],
    },
  };
}

export default ImageRoute;
