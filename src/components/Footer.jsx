import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900 mt-20">
      <div className="w-full max-w-6xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0">
            <img
              src="/Proteus.png"
              className="w-8 h-8 mr-3 rounded-full"
              alt="Proteus Logo"
            />
            <span className="self-center text-xl font-bold whitespace-nowrap text-white hover:text-sky-500 mt-1">
              Proteus
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a
            href="https://github.com/luqmanherifa"
            target="_blank"
            className="hover:underline"
          >
            Luqman Herifa{" "}
          </a>
          • All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
