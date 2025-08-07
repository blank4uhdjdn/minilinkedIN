import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AllPosts from "./AllPosts";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="bg-blue-600 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-white font-bold text-xl cursor-pointer">
              Mini LinkedIn
            </div>
            <div className="hidden md:flex space-x-6">
              <NavItem to="/" label="Home" />
              <NavItem to="/create-post" label="Create Post" />
              <NavItem to="/profile" label="Profile" />
              <NavItem to="/login" label="Login" />
              <NavItem to="/signup" label="Sign Up" />
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-blue-700 px-2 pt-2 pb-3 space-y-1">
            <MobileNavItem to="/" label="Home" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/create-post" label="Create Post" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/profile" label="Profile" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/login" label="Login" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/signup" label="Sign Up" onClick={() => setIsOpen(false)} />
          </div>
        )}
      </nav>

      
     <AllPosts/>
    </>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-white px-3 py-2 rounded-md font-medium hover:bg-blue-700 transition ${
          isActive ? "bg-blue-800" : ""
        }`
      }
      end
    >
      {label}
    </NavLink>
  );
}

function MobileNavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition ${
          isActive ? "bg-blue-900" : ""
        }`
      }
      end
    >
      {label}
    </NavLink>
  );
}
