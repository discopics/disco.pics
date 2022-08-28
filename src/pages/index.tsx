import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import ImgView from "../components/ImgView";
import Layout from "../components/Layout";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useRedisUser from "../hooks/useRedisUser";
import { useEffect, useState } from "react";
import { ImageType } from "../types/Types";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { user, refetchUser } = useRedisUser();
  const [ups, setUps] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedImages, setDisplayedImages] = useState<ImageType[]>(
    user?.images || []
  );

  // Refetch user when ups changes
  useEffect(() => {
    refetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ups]);

  useEffect(
    () => {
      if (user && !searchQuery) {
        setDisplayedImages(user.images);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  useEffect(() => {
    const getSearchedImages = async () => {
      const res = await fetch(`/api/searchImage?slug=${searchQuery}`);

      if (res.status === 200) {
        const images = await res.json();
        setDisplayedImages(images);
      }
    };

    if (searchQuery.length > 0) {
      getSearchedImages();
    }
  }, [searchQuery]);

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

                  {user.images.length == 0 ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-white text-lg">
                        You haven&apos;t uploaded any images yet.
                      </div>
                      <div className="text-white text-lg">
                        Upload some images to get started. <br /> Click on the
                        upload icon in the top right
                      </div>
                    </div>
                  ) : (
                    // SearchBar
                    <div className="my-3">
                      <input
                        placeholder="Search for your images"
                        type="text"
                        className="bg-dark-light text-gray-300 appearance-none border-1 border-gray-700 rounded w-44 py-2 px-4 leading-tight focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                      />
                    </div>
                  )}

                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
                  >
                    <Masonry gutter="10px">
                      {/* Map through images in reverse */}
                      {displayedImages
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
