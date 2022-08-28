import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import ImgView from "../components/ImgView";
import Layout from "../components/Layout";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useRedisUser from "../hooks/useRedisUser";
import { useEffect, useState } from "react";
// import Head from "next/head";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { user, refetchUser } = useRedisUser();
  const [ups, setUps] = useState(0);

  // Refetch user when ups changes
  useEffect(() => {
    refetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ups]);

  return (
    <Layout>
      <div>
        {session ? (
          <>
            {user ? (
              <>
                <div className="p-4 min-h-screen">
                  <div className="mb-4">
                    <span className="text-white text-lg">Hello,</span>{" "}
                    <span className="text-xl text-white font-bold">
                      {session?.user?.name}
                    </span>
                  </div>

                  {user.images.length == 0 && (
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-white text-lg">
                        You haven&apos;t uploaded any images yet.
                      </div>
                      <div className="text-white text-lg">
                        Upload some images to get started. <br /> Click on the
                        upload icon in the top right
                      </div>
                    </div>
                  )}

                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
                  >
                    <Masonry gutter="10px">
                      {/* Map through images in reverse */}
                      {user.images
                        .slice(0)
                        .reverse()
                        .map((image) => (
                          <ImgView
                            key={image.slug}
                            ups={ups}
                            setUps={setUps}
                            img={image}
                          />
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
