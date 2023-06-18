import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center my-10">
        <div className="w-96 p-14 border border-slate-200 rounded-xl">
          <form>
            <div className="mb-6">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-slate-600"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-slate-50 border border-slate-300 text-slate-600 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                placeholder="click@submit.btn"
              />
            </div>
            <div className="mb-6">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-slate-600"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-slate-50 border border-slate-300 text-slate-600 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
              />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-slate-300 rounded bg-slate-50 focus:ring-3 focus:ring-sky-300"
                />
              </div>
              <label
                for="remember"
                className="ml-2 text-sm font-medium text-slate-600"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/users"
              type="submit"
              className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
