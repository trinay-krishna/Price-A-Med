import React, { useState, useRef, useEffect } from "react";
import { Pill, ShoppingCart, Upload, User, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "../pages/Home/ProfileDropdown";

export default function Header({ onLoginClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enhanced getLinkClasses function to support multiple paths
  const getLinkClasses = (paths, exact = true) => {
    const match = Array.isArray(paths)
      ? paths.some((path) =>
          exact ? location.pathname === path : location.pathname.startsWith(path)
        )
      : exact
      ? location.pathname === paths
      : location.pathname.startsWith(paths);

    return match
      ? "flex items-center gap-2 text-[#A5D6A7] transition-colors"
      : "flex items-center gap-2 hover:text-[#A5D6A7] transition-colors";
  };

  // Determine if Profile should be highlighted
  const isProfileActive = ["/profile", "/orders", "/membership", "/support"].some((profilePath) =>
    location.pathname.startsWith(profilePath)
  );

  return (
    <header className="bg-[#2A6041] text-white py-4 px-6 flex items-center justify-between text-lg">
      <Link to="/" className="text-2xl font-bold hover:text-[#A5D6A7] transition-colors">
        Price A Med
      </Link>

      <nav className="flex items-center gap-6">
        <Link to="/home" className={getLinkClasses("/home")}>
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link to="/prescription" className={getLinkClasses("/prescription")}>
          <Pill size={20} />
          <span>Prescriptions</span>
        </Link>
        <Link to="/cart" className={getLinkClasses(["/cart", "/validate"])}>
          <ShoppingCart size={20} />
          <span>Cart</span>
        </Link>

        {/* Profile Icon with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={
              isProfileActive
                ? "flex items-center gap-2 text-[#A5D6A7] transition-colors"
                : "flex items-center gap-2 hover:text-[#A5D6A7] transition-colors"
            }
          >
            <User size={20} />
            <span>Profile</span>
          </button>
          {isDropdownOpen && <ProfileDropdown />}
        </div>

        <Link to="/upload" className={getLinkClasses("/upload")}>
          <Upload size={20} />
          <span>Upload</span>
        </Link>
      </nav>
    </header>
  );
}
