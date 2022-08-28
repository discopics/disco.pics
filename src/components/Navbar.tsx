import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Divider = ({ className, text }: { className?: string; text?: string; [key: string]: any }) => (
  <>
    <h1 className={`${className} h-0 dividers text-transparent text-sm -mb-1`}>
      {text}
    </h1>
    <div className={`w-full rounded-md bg-dark/70 h-[2px]`} />
  </>
)

const NavItem = ({ onClick, icon, text }: {
  onClick: () => void;
  text: string;
  icon: React.ReactNode;
}) => {
  return (
    <button onClick={onClick} className="-mb-1 nav-item w-full justify-center items-center hover:text-rose-500 text-rose-400 transition nav-item rounded-md h-10 pb-1 flex hover:bg-rose-400/10">
      {icon}
      <h1 className="-mb-1 hidden">{text}</h1>
    </button>
  )
}

function Navbar() {

  const { data: session } = useSession();
  const router = useRouter();

  return (
    <aside className="w-fit navbar sticky top-0 hidden md:block">
      <motion.div initial={{ width: "4rem" }} whileHover={{ width: 200 }} transition={{ type: "tween", duration: 0.1 }} className="
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
      ">
        <button onClick={() => router.push("/")} className="w-fit logo flex items-center hover:text-rose-500 text-white gap-2 justify-center h-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="logo" className="h-10 w-10" src="https://yt3.ggpht.com/ytc/AMLnZu80d66aj0mK3KEyMfpdGFyrVWdV5tfezE17IwRkhw=s88-c-k-c0x00ffffff-no-rj" />
          <h1 className="hidden font-bold text-xl">disco.pics</h1>
        </button>
        <Divider text="Customization" className="mt-auto" />
        <NavItem
          onClick={() => null}
          icon={(
            <svg className=" w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 23.7q-.825 0-1.413-.588Q3 22.525 3 21.7v-14q0-.825.587-1.413Q4.175 5.7 5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.587 1.412q-.588.588-1.413.588Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-7.2 7.225H9v-4.25Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6q.837 0 1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8Z"
              ></path>
            </svg>
          )}
          text="Embed Builder"
        />
        <Divider />
        <button className="flex gap-2 w-full rounded-md profile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={session?.user?.image ?? ""} className="rounded-full w-9 h-9" alt="avatar" />
          <div className="hidden details flex-col gap-0">
            {" "}<h1 className="text-rose-300 text-md">{session?.user.name}</h1>
            <h1 className="text-xs -mt-1 text-rose-300">#{session?.user.discriminator}</h1>
          </div>
        </button>
      </motion.div>
    </aside>
  )

  // return (
  //   <aside className="w-fit sticky top-0 hidden md:block" aria-label="Sidebar">
  //     <div className="overflow-y-auto flex flex-col items-center justify-between min-h-screen py-4 px-3 bg-light dark:bg-dark">
  //       <Link passHref href="/">
  //         <a className="flex items-center mb-5 bg-inherit sticky top-0">
  //           {/* <img
  //             src="https://flowbite.com/docs/images/logo.svg"
  //             className="mr-3 h-6 sm:h-7"
  //             alt="Flowbite Logo"
  //           /> */}
  //           <span className=""></span>
  //         </a>
  //       </Link>
  //       <ul className="space-y-2">
  //         <li>
  //           <Link href="/" passHref>
  //             <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
  //               <svg
  //                 aria-hidden="true"
  //                 className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
  //                 fill="currentColor"
  //                 viewBox="0 0 20 20"
  //                 xmlns="http://www.w3.org/2000/svg"
  //               >
  //                 <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  //               </svg>
  //             </a>
  //           </Link>
  //         </li>
  //       </ul>

  //       <div>
  //         <Link href="/" passHref>
  //           <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               strokeWidth={1.5}
  //               stroke="currentColor"
  //               className="w-6 h-6"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
  //               />
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  //               />
  //             </svg>
  //           </a>
  //         </Link>
  //         {session ? (
  //           <div className="group p-1">
  //             <button
  //               id="dropdownInformationButton"
  //               className="  rounded-full text-center inline-flex items-center "
  //               type="button"
  //             >
  //               {/* eslint-disable-next-line @next/next/no-img-element */}
  //               <img
  //                 className="rounded-full"
  //                 src={session.user.image}
  //                 width={30}
  //                 alt=""
  //               />
  //             </button>
  //             <div className="hidden group-hover:block z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
  //               <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
  //                 <div>
  //                   {session.user.name}#{session.user.discriminator}
  //                 </div>
  //                 <div className="font-medium truncate">
  //                   {session.user.email}
  //                 </div>
  //               </div>
  //               <div className="py-1">
  //                 <button
  //                   className="inline-flex gap-1 px-2 py-1 rounded-lg hover:bg-gray-700"
  //                   onClick={() => signOut()}
  //                 >
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                     className="w-6 h-6"
  //                   >
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
  //                       clipRule="evenodd"
  //                     />
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
  //                       clipRule="evenodd"
  //                     />
  //                   </svg>
  //                   Sign Out
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         ) : (
  //           <div></div>
  //         )}
  //       </div>
  //     </div>
  //   </aside>
  // );
}

export default Navbar;
