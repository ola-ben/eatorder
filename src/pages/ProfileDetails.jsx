import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiArrowSmallLeft, HiUser, HiPencil } from "react-icons/hi2"; // Remove HiPhotograph
import { HiOutlineCamera } from "react-icons/hi"; // Keep this
import toast from "react-hot-toast";

export default function ProfileDetails() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      toast.error("Please login to view profile details");
      navigate("/logiformpage");
    }

    const userData = JSON.parse(localStorage.getItem("user")) || {};

    // Load profile image from localStorage
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }

    setUser(userData);
    setFormData({
      fullName: userData.fullName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      dateOfBirth: userData.dateOfBirth || "",
      gender: userData.gender || "",
    });
  }, [navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setProfileImage(imageData);
        // Save to localStorage
        localStorage.setItem("profileImage", imageData);
        toast.success("Profile image updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
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
            <h1 className="text-xl font-semibold">Profile Details</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Avatar with Upload Option */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-4xl shadow-lg overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <HiUser />
                )}
              </div>

              {/* Camera Icon for Upload */}
              <label
                htmlFor="profile-image-upload"
                className="absolute -bottom-1 -right-1 bg-red-600 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 transition-colors shadow-lg"
              >
                <HiOutlineCamera className="text-sm" />
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 mt-4"
              >
                <HiPencil /> Edit Profile
              </button>
            )}
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                />
              ) : (
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {user.fullName || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                />
              ) : (
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {user.email || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                />
              ) : (
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {user.phone || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                />
              ) : (
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {user.dateOfBirth || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Gender
              </label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {user.gender
                    ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                    : "Not provided"}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
