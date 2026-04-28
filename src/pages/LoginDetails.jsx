import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiArrowSmallLeft, HiLockClosed } from "react-icons/hi2";
import { HiEye, HiEyeOff } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function LoginDetails() {
  const navigate = useNavigate();
  const { user: authUser, loggedIn, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!authLoading && !loggedIn) {
      toast.error("Please login to view login details");
      navigate("/logiformpage");
      return;
    }
    if (authUser) {
      setUser({
        email: authUser.email,
        fullName: authUser.user_metadata?.full_name ?? "",
      });
    }
  }, [authLoading, loggedIn, authUser, navigate]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (passwordData.currentPassword !== user.password) {
      toast.error("Current password is incorrect");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const updatedUser = { ...user, password: passwordData.newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    toast.success("Password updated successfully!");
  };

  return (
    <section className="bg-gray-100 min-h-screen font-montserrat">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header with Standout Back Button */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-700 hover:text-red-600 transition-all duration-300 shadow-sm"
            >
              <HiArrowSmallLeft className="text-xl" />
            </button>
            <h1 className="text-xl font-semibold">Login Details</h1>
          </div>
        </div>

        {/* Content with bottom padding */}
        <div className="p-6 pb-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <HiLockClosed className="text-3xl" />
              <h2 className="text-lg font-semibold">Account Security</h2>
            </div>
            <p className="text-sm opacity-90">
              Manage your password and keep your account secure
            </p>
          </div>

          <div className="space-y-6">
            {/* Email Display */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-gray-600 text-sm mb-1">
                Email Address
              </label>
              <p className="text-gray-800 font-medium">
                {user.email || "Not provided"}
              </p>
            </div>

            {/* Password Section */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Password</h3>
                <button
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                  className="text-red-600 text-sm font-medium hover:text-red-700"
                >
                  {isChangingPassword ? "Cancel" : "Change Password"}
                </button>
              </div>

              {!isChangingPassword ? (
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value="••••••••"
                    readOnly
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-600"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <HiEyeOff size={20} />
                    ) : (
                      <HiEye size={20} />
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                  />
                  <button
                    onClick={handleUpdatePassword}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors mt-2"
                  >
                    Update Password
                  </button>
                </div>
              )}
            </div>

            {/* Last Login */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-gray-600 text-sm mb-1">
                Last Login
              </label>
              <p className="text-gray-800 font-medium">
                {new Date().toLocaleString()}
              </p>
            </div>

            {/* Account Created */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-gray-600 text-sm mb-1">
                Account Created
              </label>
              <p className="text-gray-800 font-medium">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Today"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
