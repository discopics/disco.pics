import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Divider = ({
  className,
  text,
}: {
  className?: string;
  text?: string;
  [key: string]: unknown;
}) => (
  <>
    <h1 className={`${className} h-0 dividers text-transparent text-sm -mb-1`}>
      {text}
    </h1>
    <div className={`w-full rounded-md bg-dark/70 h-[2px]`} />
  </>
);

const NavItem = ({
  onClick,
  icon,
  text,
}: {
  onClick: () => void;
  text: string;
  icon: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="-mb-1 nav-item w-full justify-center items-center hover:text-rose-500 text-rose-400 transition nav-item rounded-md h-10 pb-1 flex hover:bg-rose-400/10"
    >
      {icon}
      <h1 className="-mb-1 hidden">{text}</h1>
    </button>
  );
};

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <aside className="w-fit navbar sticky top-0 hidden md:block">
      <motion.div
        initial={{ width: "4rem" }}
        whileHover={{ width: 200 }}
        transition={{ type: "tween", duration: 0 }}
        className="
        [&:hover>.dividers]:text-light-dark/50
        [&:hover>.dividers]:h-max
        [&:hover>.nav-item>h1]:inline
        [&:hover>.nav-item]:gap-2 
        [&:hover>.nav-item]:px-3
        [&:hover>.nav-item]:justify-start
        [&:hover>.logo>h1]:inline
        [&:hover>.profile>.details]:flex
        [&:hover>.profile]:p-2
        [&:hover>.profile]:bg-rose-400/10
        overflow-y-auto gap-2 overflow-hidden flex flex-col items-start justify-start min-h-screen py-4 px-3 bg-light dark:bg-dark-light
      "
      >
        <button
          onClick={() => router.push("/")}
          className="w-fit logo flex items-center hover:text-rose-500 text-white gap-2 justify-center h-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="logo"
            className="h-10 w-10"
            src="/logo.png"
          />
          <h1 className="hidden font-bold text-xl">disco.pics</h1>
        </button>
        <Divider text="Customization" className="mt-auto" />
        <NavItem
          onClick={() => router.push("/embed")}
          icon={
            <svg className=" w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-7.2 7.225H9v-4.25Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"
              ></path>
            </svg>
          }
          text="Embed Builder"
        />
        <Divider />
        <button className="flex gap-2 w-full rounded-md profile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session?.user?.image ?? ""}
            className="rounded-full w-9 h-9"
            alt="avatar"
          />
          <div className="hidden details flex-col gap-0">
            {" "}
            <h1 className="text-rose-300 text-md">{session?.user.name}</h1>
            <h1 className="text-xs -mt-1 text-rose-300">
              #{session?.user.discriminator}
            </h1>
          </div>
        </button>
      </motion.div>
    </aside>
  );
}

export default Navbar;
