// src/pages/Loginsignup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { MdOutlinePersonAdd } from "react-icons/md";
import toast from "react-hot-toast";

export default function Loginsignup() {
  const navigate = useNavigate();
  const [page, setPage] = useState("login");

  return (
    <section className="bg-[#f6f4f9] p-5 font-montserrat min-h-screen relative">
      <div className="md:mx-[100px] lg:mx-[450px] my-17">
        <HiArrowSmallLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="flex justify-center">
          <p className="text-center text-xl mb-1.5 font-bold md:text-3xl lg:text-xl">
            Welcome to Delicious Food
          </p>
        </div>

        <p className="capitalize font-medium text-gray-500 text-center mb-9 md:text-xl lg:text-[14px]">
          Quick setup, let's go
        </p>

        {/* Tabs */}
        <div className="flex space-x-3 bg-[#d4d4d9] rounded-[12px] justify-center mx-12 my-4.5 p-1.5">
          <button
            onClick={() => setPage("login")}
            className={`${
              page === "login" ? "bg-red-600 text-white" : ""
            } duration-300 rounded-[6px] w-full capitalize p-1`}
          >
            Login
          </button>

          <button
            onClick={() => setPage("signup")}
            className={`${
              page === "signup" ? "bg-red-600 text-white" : ""
            } duration-300 rounded-[6px] w-full capitalize p-1`}
          >
            Sign Up
          </button>
        </div>

        {page === "login" && <LoginForm />}
        {page === "signup" && <SignUpForm />}
      </div>
    </section>
  );
}

/////////////////////////////////////////////////////
// LOGIN FORM
/////////////////////////////////////////////////////

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("No account found. Please sign up first.");
      return;
    }

    if (email === user.email && password === user.password) {
      localStorage.setItem("loggedIn", "true");

      toast.success("Login successful!");

      // notify app login state changed
      window.dispatchEvent(new Event("authChanged"));

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <section>
      <div className="grid gap-6">
        <div className="grid">
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded-[10px] p-2.5 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="grid">
          <label className="font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 rounded-[10px] p-2.5 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="relative flex justify-center">
          <button
            onClick={handleLogin}
            className="bg-red-600 mt-4 w-full p-2.5 text-white rounded-[10px]"
          >
            Login
          </button>

          <CiLogin className="text-xl absolute top-1/2 -translate-y-1/2 right-3 text-white" />
        </div>
      </div>
    </section>
  );
}

/////////////////////////////////////////////////////
// SIGNUP FORM
/////////////////////////////////////////////////////

function SignUpForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!fullName || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const user = {
      fullName,
      email,
      password,
    };

    // save account
    localStorage.setItem("user", JSON.stringify(user));

    // auto login
    localStorage.setItem("loggedIn", "true");

    toast.success("Account created successfully!");

    // notify login state change
    window.dispatchEvent(new Event("authChanged"));

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <section>
      <div className="grid gap-6">
        <div className="grid">
          <label className="font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-gray-400 rounded-[10px] p-2.5 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="grid">
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded-[10px] p-2.5 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="grid">
          <label className="font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 rounded-[10px] p-2.5 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="relative flex justify-center">
          <button
            onClick={handleSignup}
            className="bg-red-600 mt-4 w-full p-2.5 text-white rounded-[10px]"
          >
            Sign Up
          </button>

          <MdOutlinePersonAdd className="text-xl absolute top-1/2 -translate-y-1/2 right-3 text-white" />
        </div>
      </div>
    </section>
  );
}
