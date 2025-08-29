import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { MdOutlinePersonAdd } from "react-icons/md";

export default function Loginsignup() {
  const [page, setPage] = useState("login");

  return (
    <section className=" left-full fixe bg-[#f6f4f9]  p-5  font-montserrat h-svh">
      <p className=" text-center text-xl mb-1.5 font-bold  my-24">
        Welcome to Delicious Food
      </p>
      <p className=" capitalize font-montserrat font-medium  text-gray-500 text-center mb-9  ">
        quick setup let's go
      </p>
      <div className=" flex space-x-3 bg-[#f6f4f9] text-[14.5px] rounded-[12px] justify-center mx-12 my-4.5  p-1.5">
        <button
          onClick={() => setPage("login")}
          className={`${
            page === "login" && "bg-pc"
          }  duration-300  rounded-[6px] w-full  capitalize p-1`}
        >
          login
        </button>
        <button
          onClick={() => setPage("signup")}
          className={`${
            page === "signup" && "bg-pc"
          } duration-300  rounded-[6px] w-full capitalize  p-1`}
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
  );
}

export function Login() {
  return (
    <section>
      <div className="">
        {}
        <div className="grid grid-cols-1 font-medium text-gray-700 text-[15px]">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full bg-transparent border border-gray-400 rounded-[10px] p-2 focus:border-ph focus:outline-none mb-7.5"
            required
          />
        </div>
        <div className="grid grid-cols-1 font-medium text-gray-700 text-[15px]">
          <label htmlFor="Password ">Password </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full bg-transparent border rounded-[10px] p-2 border-gray-400 focus:border-ph focus:outline-none"
            required
          />
        </div>
        <div className="flex justify-center relative">
          <button className="bg-ph mt-8 w-full p-2 text-white rounded-[13px]">
            login
          </button>
          <CiLogin className="  text-xl absolute top-2/3 transform -translate-y-1/3  mr-17 text-white" />
        </div>
        <p className=" text-[13px] text-center mt-1.5">
          demo: admin@restaurant.com/password
        </p>
      </div>
    </section>
  );
}

export function SignUp() {
  return (
    <section>
      <div className="">
        <div className="grid grid-cols-1  font-medium text-gray-700 text-[15px]">
          <label htmlFor="Email">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border border-gray-400  rounded-[10px] p-2 focus:border-ph focus:outline-none mb-7.5 "
            required
          />
        </div>
        <div className="grid grid-cols-1  font-medium text-gray-700 text-[15px]">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full bg-transparent border border-gray-400 rounded-[10px] p-2 focus:border-ph focus:outline-none mb-7.5"
            required
          />
        </div>
        <div className="grid grid-cols-1  font-medium text-gray-700 text-[15px]">
          <label htmlFor="Password ">Password </label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full bg-transparent border rounded-[10px] p-2 border-gray-400 focus:border-ph focus:outline-none"
            required
          />
        </div>
        <div className="flex justify-center relative">
          <button className="bg-ph my-8 w-full p-2 text-white rounded-[13px] font-medium">
            SignUp
          </button>
          <MdOutlinePersonAdd className="text-xl absolute top-1/2 transform -translate-y-1/2  mr-23 text-white" />
        </div>
      </div>
    </section>
  );
}
