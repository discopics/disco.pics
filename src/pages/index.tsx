import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import ImgView from "../components/ImgView";
import Layout from "../components/Layout";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useRedisUser from "../hooks/useRedisUser";
import Head from "next/head";

const Home: NextPage = () => {

  const { data: session } = useSession();
  const user = useRedisUser();

  return (
    <Layout>

      <div>
        {session ? (
          <>
            {user ? (
              <>
                <div className="p-4">
                  <div className="mb-4">
                    <span className="text-white text-lg">Hello,</span>{" "}
                    <span className="text-xl text-white font-bold">
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
