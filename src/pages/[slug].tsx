import { NextPageContext } from "next";
import Image from "next/image";

type Image = {
  slug: string;
  img_url: string;
  id: string;
  uploaded_at: string;
  uploaded_by: string;
};

function ImageRoute({ image }: { image: Image }) {
  return (
    <div className="bg-black min-h-screen pt-5">
      {image && (
        <>
          <div className="h-96 relative flex flex-col">
            <Image
              src={
                image.img_url.replace(
                  "cdn.discordapp.com",
                  "media.discordapp.net"
                ) + "?width=350&height=350"
              }
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
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { slug } = context.query;

  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://bornfire.pics";

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

  return {
    props: {
      image,
    },
  };
}

export default ImageRoute;
