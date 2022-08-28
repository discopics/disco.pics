import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Navbar() {
  
  const { data: session } = useSession();
  
  return (
    <aside className="w-fit h-scren sticky top-0 hidden md:block">
      <div className="overflow-y-auto flex flex-col items-center justify-between min-h-screen py-4 px-3 bg-light dark:bg-dark-light">
        <div className="w-10 h-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="logo" src="https://yt3.ggpht.com/ytc/AMLnZu80d66aj0mK3KEyMfpdGFyrVWdV5tfezE17IwRkhw=s88-c-k-c0x00ffffff-no-rj" />
        </div>
      </div>
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
