import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function Loginsignup() {
  const navigate = useNavigate();
  const [page, setPage] = useState("login");

  return (
    <main className="min-h-screen bg-canvas">
      <div className="max-w-md mx-auto bg-white min-h-screen lg:min-h-0 lg:max-w-lg lg:mt-12 lg:rounded-3xl lg:shadow-card lg:overflow-hidden">
        {/* Header */}
        <div className="relative bg-linear-to-br from-brand to-accent text-white px-6 pt-6 pb-10">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Back to home"
          >
            <FiArrowLeft />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="text-3xl mb-3">🍽️</div>
            <h1 className="text-2xl font-bold leading-tight">
              {page === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-white/85 mt-1">
              {page === "login"
                ? "Sign in to keep ordering your favourites."
                : "Sign up in seconds and start ordering."}
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="px-6 -mt-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-card p-1.5 grid grid-cols-2 gap-1.5 border border-gray-100">
            {["login", "signup"].map((tab) => {
              const active = page === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setPage(tab)}
                  className={`relative h-10 rounded-xl text-sm font-semibold transition-colors ${
                    active ? "text-white" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="auth-tab"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className="absolute inset-0 rounded-xl bg-brand"
                    />
                  )}
                  <span className="relative z-10 capitalize">
                    {tab === "login" ? "Sign in" : "Sign up"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: page === "login" ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: page === "login" ? 16 : -16 }}
              transition={{ duration: 0.22 }}
            >
              {page === "login" ? (
                <LoginForm setPage={setPage} />
              ) : (
                <SignUpForm setPage={setPage} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function Field({ label, icon, error, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-soft mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        {children}
      </div>
      {error && <p className="text-xs text-brand mt-1">{error}</p>}
    </div>
  );
}

function LoginForm({ setPage }) {
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    const { data, error } = await signIn({ email, password });

    if (error) {
      toast.error(error.message || "Invalid email or password");
      setIsLoading(false);
      return;
    }

    const fullName = data?.user?.user_metadata?.full_name;
    if (fullName) localStorage.setItem("fullName", fullName);

    toast.success(
      `Welcome back${fullName ? `, ${fullName.split(" ")[0]}` : ""}! 👋`,
    );
    setIsLoading(false);
    setTimeout(() => navigate("/"), 350);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Enter your email above first");
      return;
    }
    const { error } = await resetPassword(email);
    if (error) toast.error(error.message || "Could not send reset email");
    else toast.success("Password reset email sent");
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Field label="Email" icon={<FiMail />}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-12 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
        />
      </Field>

      <Field label="Password" icon={<FiLock />}>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          required
          className="w-full bg-gray-100 rounded-xl pl-10 pr-10 h-12 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </Field>

      <div className="text-right">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-xs font-semibold text-brand hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-brand hover:bg-brand-deep disabled:opacity-70 text-white h-12 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          "Sign in"
        )}
      </motion.button>

      <p className="text-center text-sm text-ink-soft pt-2">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => setPage("signup")}
          className="text-brand font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

function SignUpForm({ setPage }) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const passwordStrength = (() => {
    let s = 0;
    if (form.password.length >= 6) s++;
    if (form.password.match(/[A-Z]/)) s++;
    if (form.password.match(/[0-9]/)) s++;
    if (form.password.match(/[^A-Za-z0-9]/)) s++;
    return s;
  })();

  const strengthLabel = ["Very weak", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = [
    "bg-gray-300",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ][passwordStrength];

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirm } = form;
    if (!fullName || !email || !password || !confirm) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    const { data, error } = await signUp({ email, password, fullName });

    if (error) {
      toast.error(error.message || "Could not create account");
      setIsLoading(false);
      return;
    }

    localStorage.setItem("fullName", fullName);
    const needsConfirmation = !data?.session;
    toast.success(
      needsConfirmation
        ? `Welcome, ${fullName.split(" ")[0]}! Check your email to confirm.`
        : `Welcome, ${fullName.split(" ")[0]}! 🎉`,
    );
    setIsLoading(false);
    setTimeout(() => navigate(needsConfirmation ? "/logiformpage" : "/"), 500);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <Field label="Full name" icon={<FiUser />}>
        <input
          type="text"
          value={form.fullName}
          onChange={update("fullName")}
          placeholder="Jane Doe"
          required
          className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-12 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
        />
      </Field>

      <Field label="Email" icon={<FiMail />}>
        <input
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder="you@example.com"
          required
          className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-12 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
        />
      </Field>

      <Field label="Password" icon={<FiLock />}>
        <input
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={update("password")}
          placeholder="At least 6 characters"
          required
          minLength={6}
          className="w-full bg-gray-100 rounded-xl pl-10 pr-10 h-12 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </Field>

      {form.password && (
        <div>
          <div className="flex gap-1 h-1">
            {[1, 2, 3, 4].map((level) => (
              <motion.div
                key={level}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: level * 0.04 }}
                className={`flex-1 rounded-full origin-left ${
                  level <= passwordStrength ? strengthColor : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] text-ink-soft mt-1">
            Password strength: {strengthLabel}
          </p>
        </div>
      )}

      <Field label="Confirm password" icon={<FiLock />}>
        <input
          type={showPassword ? "text" : "password"}
          value={form.confirm}
          onChange={update("confirm")}
          placeholder="Repeat your password"
          required
          className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-12 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
        />
      </Field>

      {form.confirm && form.password !== form.confirm && (
        <p className="text-xs text-brand">Passwords do not match</p>
      )}

      <motion.button
        type="submit"
        disabled={isLoading}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-brand hover:bg-brand-deep disabled:opacity-70 text-white h-12 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          "Create account"
        )}
      </motion.button>

      <p className="text-center text-sm text-ink-soft pt-2">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setPage("login")}
          className="text-brand font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>

      <p className="text-center text-[11px] text-ink-soft pt-2">
        By signing up you agree to our terms and privacy policy.
      </p>
    </form>
  );
}
