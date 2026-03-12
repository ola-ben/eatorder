import { useState, useEffect } from "react";

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  useEffect(() => {
    const checkLoginStatus = () => {
      const status = localStorage.getItem("loggedIn") === "true";
      console.log("Auth check - loggedIn:", status);
      setLoggedIn(status);
    };

    // Check on mount
    checkLoginStatus();

    // Listen for custom auth event
    const handleAuthChanged = () => {
      console.log("Auth changed event received");
      checkLoginStatus();
    };

    // Listen for storage events (for cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === "loggedIn") {
        console.log("Storage event - loggedIn changed to:", e.newValue);
        setLoggedIn(e.newValue === "true");
      }
    };

    // Listen for focus events (when user returns to tab)
    const handleFocus = () => {
      console.log("Window focused, checking auth");
      checkLoginStatus();
    };

    window.addEventListener("authChanged", handleAuthChanged);
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("authChanged", handleAuthChanged);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Helper function to login
  const login = () => {
    localStorage.setItem("loggedIn", "true");
    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("storage"));
    setLoggedIn(true);
  };

  // Helper function to logout
  const logout = () => {
    localStorage.setItem("loggedIn", "false");
    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("storage"));
    setLoggedIn(false);
  };

  return { loggedIn, login, logout };
}
