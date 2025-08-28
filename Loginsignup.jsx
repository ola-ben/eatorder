import { useState } from "react";
import { CiLogin } from "react-icons/ci";

export default function Loginsignup() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <section className=" left-full fixe my-70 bg-amber-100 mx-1.5 p-3">
        <p className=" text-center text-xl mb-2.5">Welcome to Delicious Food</p>
        <div className=" flex space-x-10 bg-[#f6f4f9]  rounded-[12px] justify-center mx-12 my-4.5  py-1.5">
          <button
            onClick={() => setPage("login")}
            className={`${
              page === "login" && "bg-pc"
            }  duration-300  rounded-[12px] py-1 px-2 capitalize`}
          >
            login
          </button>
          <button
            onClick={() => setPage("signup")}
            className={`${
              page === "signup" && "bg-pc"
            } duration-300  rounded-[12px] py-1 px-2 capitalize`}
          >
            sign up
          </button>
        </div>
        <form action="" className="">
          {page === "login" && <Login />}
        </form>
        <form action="" className="">
          {page === "signup" && <SignUp />}
        </form>
      </section>
    </div>
  );
}

function Login() {
  return (
    <section>
      <form action="" className="">
        {}
        <div className="grid grid-cols-1">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full bg-transparent border border-gray-400 rounded-[10px] p-2.5 focus:border-ph focus:outline-none mb-7.5"
            required
          />
        </div>
        <div className="grid grid-cols-1">
          <label htmlFor="Password ">Password </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full bg-transparent border rounded-[10px] p-2.5 border-gray-400 focus:border-ph focus:outline-none"
            required
          />
        </div>
        <div className="flex justify-center relative">
          <button className="bg-ph my-8 w-full p-2 text-white rounded-[13px] read-only:">
            login
          </button>
          <CiLogin className="  text-xl absolute top-1/2 transform -translate-y-1/2  mr-20 text-white" />
        </div>
        <p className="">demo: admin@restaurant.com/password</p>
      </form>
    </section>
  );
}

function SignUp() {
  return (
    <section>
      <form action="" className="">
        <div className="grid grid-cols-1">
          <label htmlFor="Email">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full bg-transparent border border-gray-400 rounded-[10px] p-2.5 focus:border-ph focus:outline-none mb-7.5"
            required
          />
        </div>
        <div className="grid grid-cols-1">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full bg-transparent border border-gray-400 rounded-[10px] p-2.5 focus:border-ph focus:outline-none mb-7.5"
            required
          />
        </div>
        <div className="grid grid-cols-1">
          <label htmlFor="Password ">Password </label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full bg-transparent border rounded-[10px] p-2.5 border-gray-400 focus:border-ph focus:outline-none"
            required
          />
        </div>
        <div className="flex justify-center relative">
          <button className="bg-ph my-8 w-full p-2 text-white rounded-[13px] read-only:">
            SignUp
          </button>
          <CiLogin className="  text-xl absolute top-1/2 transform -translate-y-1/2  mr-20 text-white" />
        </div>
      </form>
    </section>
  );
}
