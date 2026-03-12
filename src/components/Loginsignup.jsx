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
          className="text-2xl cursor-pointer hover:text-red-600 transition-colors"
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
              page === "login" ? "bg-red-600 text-white" : "hover:bg-gray-300"
            } duration-300 rounded-[6px] w-full capitalize p-1 transition-colors`}
          >
            Login
          </button>

          <button
            onClick={() => setPage("signup")}
            className={`${
              page === "signup" ? "bg-red-600 text-white" : "hover:bg-gray-300"
            } duration-300 rounded-[6px] w-full capitalize p-1 transition-colors`}
          >
            Sign Up
          </button>
        </div>

        {page === "login" && <LoginForm setPage={setPage} />}
        {page === "signup" && <SignUpForm setPage={setPage} />}
      </div>
    </section>
  );
}

/////////////////////////////////////////////////////
// LOGIN FORM
/////////////////////////////////////////////////////

function LoginForm({ setPage }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("No account found. Please sign up first.");
      return;
    }

    if (email === user.email && password === user.password) {
      // Set login state
      localStorage.setItem("loggedIn", "true");

      toast.success("Login successful!");

      // Dispatch multiple events to ensure all listeners catch it
      window.dispatchEvent(new Event("authChanged"));
      window.dispatchEvent(new Event("storage"));

      // Also trigger a manual storage event for cross-tab sync
      const storageEvent = new StorageEvent("storage", {
        key: "loggedIn",
        newValue: "true",
        oldValue: "false",
        storageArea: localStorage,
        url: window.location.href,
      });
      window.dispatchEvent(storageEvent);

      // Navigate back to home page
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="grid gap-6">
        <div className="grid">
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded-[10px] p-2.5 focus:border-red-600 focus:outline-none"
            required
          />
        </div>

        <div className="grid">
          <label className="font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded-[10px] p-2.5 w-full focus:border-red-600 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition-colors mt-4 w-full p-2.5 text-white rounded-[10px]"
          >
            Login
          </button>

          <CiLogin className="text-xl absolute top-1/2 -translate-y-1/2 right-3 text-white" />
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setPage("signup")}
            className="text-red-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}

/////////////////////////////////////////////////////
// SIGNUP FORM
/////////////////////////////////////////////////////

function SignUpForm({ setPage }) {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Check if user already exists
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      toast.error("An account with this email already exists");
      return;
    }

    const user = {
      fullName,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    // Save account
    localStorage.setItem("user", JSON.stringify(user));

    // Auto login
    localStorage.setItem("loggedIn", "true");

    toast.success("Account created successfully!");

    // Dispatch multiple events to ensure all listeners catch it
    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("storage"));

    // Also trigger a manual storage event for cross-tab sync
    const storageEvent = new StorageEvent("storage", {
      key: "loggedIn",
      newValue: "true",
      oldValue: "false",
      storageArea: localStorage,
      url: window.location.href,
    });
    window.dispatchEvent(storageEvent);

    // Navigate back to home page
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <form onSubmit={handleSignup}>
      <div className="grid gap-6">
        <div className="grid">
          <label className="font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-gray-400 rounded-[10px] p-2.5 focus:border-red-600 focus:outline-none"
            required
          />
        </div>

        <div className="grid">
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded-[10px] p-2.5 focus:border-red-600 focus:outline-none"
            required
          />
        </div>

        <div className="grid">
          <label className="font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded-[10px] p-2.5 w-full focus:border-red-600 focus:outline-none"
              required
              minLength={6}
            />
          </div>
        </div>

        <div className="grid">
          <label className="font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-400 rounded-[10px] p-2.5 w-full focus:border-red-600 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition-colors mt-4 w-full p-2.5 text-white rounded-[10px]"
          >
            Sign Up
          </button>

          <MdOutlinePersonAdd className="text-xl absolute top-1/2 -translate-y-1/2 right-3 text-white" />
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setPage("login")}
            className="text-red-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </form>
  );
}
