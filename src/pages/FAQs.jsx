import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HiArrowSmallLeft,
  HiQuestionMarkCircle,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function FAQs() {
  const navigate = useNavigate();
  const { loggedIn, loading: authLoading } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!authLoading && !loggedIn) {
      toast.error("Please login to view FAQs");
      navigate("/logiformpage");
    }
  }, [authLoading, loggedIn, navigate]);

  // Function to handle FAQ clicks with "project in progress" message
  const handleFaqClick = (faq) => {
    toast.success(`🚧 "${faq.q}" - This feature is still in development`, {
      icon: "🏗️",
      duration: 4000,
      style: {
        background: "#FEF3C7",
        color: "#92400E",
        border: "1px solid #F59E0B",
      },
    });
  };

  const faqs = [
    {
      category: "Orders",
      questions: [
        {
          q: "How do I place an order?",
          a: "🚧 This feature is currently in development. Our team is working hard to bring you the best ordering experience!",
        },
        {
          q: "Can I modify my order after placing it?",
          a: "🚧 Order modification is coming soon! We're building a seamless experience for order management.",
        },
        {
          q: "How do I track my order?",
          a: "🚧 Real-time order tracking is under development. Stay tuned for updates!",
        },
        {
          q: "What is the minimum order amount?",
          a: "🚧 This information will be available once our ordering system is live.",
        },
      ],
    },
    {
      category: "Delivery",
      questions: [
        {
          q: "How long does delivery take?",
          a: "🚧 Delivery timeframes are being optimized. Check back soon for accurate delivery estimates.",
        },
        {
          q: "What areas do you deliver to?",
          a: "🚧 Our delivery zones are currently being mapped out. This feature is coming soon!",
        },
        {
          q: "Is there a delivery fee?",
          a: "🚧 Delivery fee structure is being finalized. We'll update this once confirmed.",
        },
        {
          q: "Can I schedule a delivery for later?",
          a: "🚧 Scheduled deliveries are in development. This feature will be available soon!",
        },
      ],
    },
    {
      category: "Payments",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "🚧 Our payment system is being integrated. We'll support multiple payment options soon!",
        },
        {
          q: "How does the wallet work?",
          a: "🚧 The wallet feature is currently in development. It will be available in the next update.",
        },
        {
          q: "Is it safe to pay with card?",
          a: "🚧 Our payment security features are being implemented. We prioritize your safety!",
        },
        {
          q: "How do I get a refund?",
          a: "🚧 The refund system is under development. This feature will be available soon.",
        },
      ],
    },
    {
      category: "Account",
      questions: [
        {
          q: "How do I reset my password?",
          a: "🚧 Password reset functionality is coming soon! For now, please contact support.",
        },
        {
          q: "Can I have multiple addresses?",
          a: "🚧 Multiple address support is in development. This feature will be available in the next update.",
        },
        {
          q: "How do referrals work?",
          a: "🚧 The referral program is currently being designed. Check back soon for exciting rewards!",
        },
        {
          q: "How do I delete my account?",
          a: "🚧 Account deletion is under development. For immediate assistance, please contact support.",
        },
      ],
    },
  ];

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
            <h1 className="text-xl font-semibold">
              Frequently Asked Questions
            </h1>
          </div>
        </div>

        {/* Content with bottom padding */}
        <div className="p-6 pb-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-red-600">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const uniqueIndex = `${categoryIndex}-${qIndex}`;
                  const isOpen = openIndex === uniqueIndex;

                  return (
                    <div
                      key={qIndex}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                    >
                      <button
                        onClick={() => {
                          setOpenIndex(isOpen ? null : uniqueIndex);
                          handleFaqClick(faq);
                        }}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-amber-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800 flex-1 pr-4">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <HiChevronUp className="text-gray-500 flex-shrink-0" />
                        ) : (
                          <HiChevronDown className="text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-amber-50 border-t border-amber-200">
                          <p className="text-amber-800 text-sm flex items-start gap-2">
                            <span className="text-xl">🚧</span>
                            <span>{faq.a}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Project Status Banner */}
          <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200 mb-6">
            <div className="flex items-center gap-2 text-blue-800">
              <span className="text-2xl">🚧</span>
              <p className="text-sm font-medium">
                This project is currently in development. Some features may not
                be fully functional yet.
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-center shadow-lg">
            <HiQuestionMarkCircle className="text-4xl text-white mx-auto mb-3 opacity-90" />
            <h3 className="font-semibold text-lg mb-2 text-white">
              Still have questions?
            </h3>
            <p className="text-white text-sm mb-4 opacity-90">
              Our support team is here to help you 24/7
            </p>
            <button
              onClick={() => (window.location.href = "tel:+2347063026374")}
              className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full font-medium shadow-md"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
