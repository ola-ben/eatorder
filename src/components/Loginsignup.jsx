import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogin, CiMail, CiLock } from "react-icons/ci";
import { HiArrowSmallLeft, HiOutlineSparkles } from "react-icons/hi2";
import {
  MdOutlinePersonAdd,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function Loginsignup() {
  const navigate = useNavigate();
  const [page, setPage] = useState("login");

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4 relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/")}
          className="mb-6 text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1 group"
        >
          <HiArrowSmallLeft className="text-2xl group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </motion.button>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200 mb-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full mb-4 shadow-lg"
          >
            <HiOutlineSparkles className="text-lg" />
            <span className="text-sm font-medium">Welcome Back</span>
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Delicious Food
          </h1>

          <p className="text-gray-600">
            {page === "login"
              ? "Sign in to continue your food journey"
              : "Create an account to get started"}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/20 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-white/30 mb-8"
        >
          <div className="grid grid-cols-2 gap-1.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPage("login")}
              className={`
                relative py-3 rounded-xl font-medium text-sm transition-all duration-300
                ${page === "login" ? "text-white" : "text-gray-600 hover:text-gray-900"}
              `}
            >
              {page === "login" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <CiLogin className="text-lg" />
                Login
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPage("signup")}
              className={`
                relative py-3 rounded-xl font-medium text-sm transition-all duration-300
                ${page === "signup" ? "text-white" : "text-gray-600 hover:text-gray-900"}
              `}
            >
              {page === "signup" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <MdOutlinePersonAdd className="text-lg" />
                Sign Up
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {page === "login" ? (
              <LoginForm setPage={setPage} />
            ) : (
              <SignUpForm setPage={setPage} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/////////////////////////////////////////////////////
// LOGIN FORM
/////////////////////////////////////////////////////

function LoginForm({ setPage }) {
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const { data, error } = await signIn({ email, password });

    if (error) {
      toast.error(error.message || "Invalid email or password");
      setIsLoading(false);
      return;
    }

    const fullName = data?.user?.user_metadata?.full_name;
    if (fullName) {
      localStorage.setItem("fullName", fullName);
    }

    toast.success(
      <div className="flex items-center gap-2">
        <span className="text-green-500">✅</span>
        <div>
          <p className="font-semibold">
            Welcome back{fullName ? `, ${fullName.split(" ")[0]}` : ""}!
          </p>
          <p className="text-xs">Login successful</p>
        </div>
      </div>,
      { duration: 3000 },
    );

    setIsLoading(false);
    setTimeout(() => navigate("/"), 400);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Enter your email above first");
      return;
    }
    const { error } = await resetPassword(email);
    if (error) {
      toast.error(error.message || "Could not send reset email");
    } else {
      toast.success("Password reset email sent");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200"
    >
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <CiMail className="text-lg" />
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-all duration-300 bg-white/50"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <CiLock className="text-lg" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-all duration-300 bg-white/50"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                <MdVisibilityOff className="text-xl" />
              ) : (
                <MdVisibility className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <button
            type="button"
            className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <CiLogin className="text-xl" />
                Login
              </span>
            )}

            {/* Shine effect */}
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </motion.button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setPage("signup")}
            className="text-red-600 font-medium hover:text-red-700 hover:underline transition-colors"
          >
            Sign up
          </button>
        </p>
      </form>
    </motion.div>
  );
}

/////////////////////////////////////////////////////
// SIGNUP FORM
/////////////////////////////////////////////////////

function SignUpForm({ setPage }) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      // Calculate password strength
      let strength = 0;
      if (value.length >= 6) strength += 1;
      if (value.match(/[A-Z]/)) strength += 1;
      if (value.match(/[0-9]/)) strength += 1;
      if (value.match(/[^A-Za-z0-9]/)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    const { data, error } = await signUp({ email, password, fullName });

    if (error) {
      toast.error(error.message || "Could not create account");
      setIsLoading(false);
      return;
    }

    localStorage.setItem("fullName", fullName);

    const needsConfirmation = !data?.session;
    toast.success(
      <div className="flex items-center gap-2">
        <span className="text-green-500">🎉</span>
        <div>
          <p className="font-semibold">Welcome, {fullName}!</p>
          <p className="text-xs">
            {needsConfirmation
              ? "Check your email to confirm your account"
              : "Account created successfully"}
          </p>
        </div>
      </div>,
      { duration: 4000 },
    );

    setIsLoading(false);
    setTimeout(() => navigate(needsConfirmation ? "/logiformpage" : "/"), 600);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200"
    >
      <form onSubmit={handleSignup} className="space-y-4">
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <FaUser className="text-sm" />
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full pl-4 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-all duration-300 bg-white/50"
            required
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <CiMail className="text-lg" />
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-4 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-all duration-300 bg-white/50"
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <CiLock className="text-lg" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-all duration-300 bg-white/50"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                <MdVisibilityOff className="text-xl" />
              ) : (
                <MdVisibility className="text-xl" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4].map((level) => (
                  <motion.div
                    key={level}
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    className={`h-full rounded-full transition-colors duration-300 ${
                      level <= passwordStrength
                        ? getPasswordStrengthColor()
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {passwordStrength === 0 && "Very weak"}
                {passwordStrength === 1 && "Weak"}
                {passwordStrength === 2 && "Fair"}
                {passwordStrength === 3 && "Good"}
                {passwordStrength === 4 && "Strong"}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-all duration-300 bg-white/50"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showConfirmPassword ? (
                <MdVisibilityOff className="text-xl" />
              ) : (
                <MdVisibility className="text-xl" />
              )}
            </button>
          </div>

          {/* Password Match Indicator */}
          {formData.confirmPassword && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-xs mt-1 ${
                formData.password === formData.confirmPassword
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {formData.password === formData.confirmPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <div className="relative pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <MdOutlinePersonAdd className="text-xl" />
                Create Account
              </span>
            )}

            {/* Shine effect */}
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </motion.button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setPage("login")}
            className="text-red-600 font-medium hover:text-red-700 hover:underline transition-colors"
          >
            Login
          </button>
        </p>
      </form>
    </motion.div>
  );
}
