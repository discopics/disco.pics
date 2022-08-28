import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import ImgView from "../components/ImgView";
import Layout from "../components/Layout";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useRedisUser from "../hooks/useRedisUser";
import { useEffect, useState } from "react";

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

                  {
                    user.images.length == 0 ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-white text-lg">
                          You haven&apos;t uploaded any images yet.
                        </div>
                        <div className="text-white text-lg">
                          Upload some images to get started. <br /> Click on the
                          upload icon in the top right
                        </div>
                      </div>
                    ) : null
                    // SearchBar
                    // <div className="my-3">
                    //   <input
                    //     placeholder="Search for your images"
                    //     type="text"
                    //     className="bg-dark-light text-gray-300 appearance-none border-1 border-gray-700 rounded w-44 py-2 px-4 leading-tight focus:outline-none"
                    //     value={searchQuery}
                    //     onChange={(e) => {
                    //       setSearchQuery(e.target.value);
                    //     }}
                    //   />
                    // </div>
                  }

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
          <div>
            {/* Onboarding page */}
            <div className="flex flex-col items-center justify-center mt-5">
              <div className="text-white text-xl">Welcome to Disco.pics</div>

              <div className="text-white text-lg mx-2">
                A free and open source project to host your images.
              </div>

              <span className="text-white">
                Please sign in with discord to get started.
              </span>
              <button
                className="inline-flex mt-10 justify-center items-center gap-2 py-2 px-3 rounded-lg bg-blue-500 hover:bg-blue-500/90 text-xl"
                onClick={() => signIn("discord")}
              >
                Sign in with Discord
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M10 11V8l5 4l-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12A8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
