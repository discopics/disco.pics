import type { NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type ImageType = {
  uploaded_by: string;
  uploaded_at: string;
  img_url: string;
  id: string;
  slug: string;
};

type UserType = {
  user: {
    id: string;
    email: string;
    created_at: string;
    token_number: string;
  };
  images: ImageType[];
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserType | undefined>();
  const [input, setInput] = useState<File>();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user");
      const user = await response.json();
      console.log(user);
      setUser(user.data);
    };
    fetchUserData();
  }, []);

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
      if (data.success === 0) {
        window.location.href = data.data.attachments[0].url;
      }
    };
  };

  return (
    <>
      {session ? (
        <>
          <button onClick={() => signOut()}>Sign Out</button>
          {session.user.name} {session.user.email}{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={session.user.image} alt="" />
          {session.user.id} {session.user.discriminator}
          <input
            type="file"
            onChange={(e) =>
              setInput(e.target.files ? e.target.files[0] : undefined)
            }
          />
          <button onClick={() => uploadImg()}>Upload</button>
          {user ? (
            <>
              {user.images.map((image: ImageType) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={image.id} src={image.img_url} alt="" />
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </>
  );
};

export default Home;
