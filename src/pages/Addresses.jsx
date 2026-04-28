import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HiArrowSmallLeft,
  HiMapPin,
  HiPlus,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function Addresses() {
  const navigate = useNavigate();
  const { loggedIn, loading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    recipientName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    isDefault: false,
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!authLoading && !loggedIn) {
      toast.error("Please login to view addresses");
      navigate("/logiformpage");
      return;
    }
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(savedAddresses);
  }, [authLoading, loggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveAddress = () => {
    if (
      !formData.label ||
      !formData.recipientName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state
    ) {
      toast.error("Please fill all fields");
      return;
    }

    let updatedAddresses;
    if (editingIndex !== null) {
      // Edit existing
      updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = formData;
      toast.success("Address updated successfully!");
    } else {
      // Add new
      updatedAddresses = [...addresses, formData];
      toast.success("Address added successfully!");
    }

    // Handle default address
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }));
      if (editingIndex !== null) {
        updatedAddresses[editingIndex] = { ...formData, isDefault: true };
      } else {
        updatedAddresses[updatedAddresses.length - 1] = {
          ...formData,
          isDefault: true,
        };
      }
    }

    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setShowAddForm(false);
    setEditingIndex(null);
    setFormData({
      label: "",
      recipientName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      isDefault: false,
    });
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditingIndex(index);
    setShowAddForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(updatedAddresses);
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
      toast.success("Address deleted successfully!");
    }
  };

  const setAsDefault = (index) => {
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    toast.success("Default address updated!");
  };

  return (
    <section className="bg-gray-100 min-h-screen font-montserrat">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header with Standout Back Button */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/profile")}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-700 hover:text-red-600 transition-all duration-300 shadow-sm"
              >
                <HiArrowSmallLeft className="text-xl" />
              </button>
              <h1 className="text-xl font-semibold">Addresses</h1>
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingIndex(null);
                setFormData({
                  label: "",
                  recipientName: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  isDefault: false,
                });
              }}
              className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              <HiPlus size={20} />
            </button>
          </div>
        </div>

        {/* Content with bottom padding */}
        <div className="p-6 pb-8">
          {addresses.length === 0 && !showAddForm && (
            <div className="text-center py-12">
              <HiMapPin className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No saved addresses yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                Add New Address
              </button>
            </div>
          )}

          {/* Address List */}
          <div className="space-y-4 mb-6">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 relative bg-white shadow-sm"
              >
                {address.isDefault && (
                  <span className="absolute top-4 right-4 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full border border-green-200">
                    Default
                  </span>
                )}
                <div className="flex items-start gap-3 mb-3">
                  <HiOutlineLocationMarker className="text-red-600 text-xl mt-1" />
                  <div>
                    <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mb-2 border border-red-200">
                      {address.label}
                    </span>
                    <p className="font-medium">{address.recipientName}</p>
                    <p className="text-sm text-gray-600">{address.phone}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {address.address}, {address.city}, {address.state}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="flex-1 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 bg-white"
                  >
                    <HiPencil /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex-1 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-1 bg-white"
                  >
                    <HiTrash /> Delete
                  </button>
                  {!address.isDefault && (
                    <button
                      onClick={() => setAsDefault(index)}
                      className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors shadow-sm"
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Form Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
              <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-6 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">
                  {editingIndex !== null ? "Edit Address" : "Add New Address"}
                </h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="label"
                    placeholder="Label (e.g., Home, Office)"
                    value={formData.label}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none bg-gray-50"
                  />
                  <input
                    type="text"
                    name="recipientName"
                    placeholder="Recipient Name"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none bg-gray-50"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none bg-gray-50"
                  />
                  <textarea
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none bg-gray-50"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none bg-gray-50"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none bg-gray-50"
                    />
                  </div>
                  <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-red-600"
                    />
                    <span className="text-sm text-gray-700">
                      Set as default address
                    </span>
                  </label>
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={handleSaveAddress}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingIndex(null);
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors bg-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
