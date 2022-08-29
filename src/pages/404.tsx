import Link from "next/link";
import React from "react";

function PageNotFound() {
  return (
    <section className="flex items-center h-full p-16 bg-gray-50 text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldnt find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-600">
            If you clicked on an image link, please recheck the URL. <br /> Dont
            worry, you can find plenty of other things on our homepage.
          </p>
          <Link passHref href="/">
            <a className="px-8 py-3 font-semibold rounded bg-blue-600 text-gray-50">
              Back to homepage
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
