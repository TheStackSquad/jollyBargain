// frontend/src/components/common/DropdownNavbar.js
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  navbarAnimationVariants,
  menuItemVariants,
  MotionDiv,
  MotionUl,
  MotionLi,
  MotionButton,
} from "../../animation/navbarAnimate";

// Changed to a function declaration
function DropdownNavbar({ getLinkPath }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    "Home",
    "Deals",
    "Categories",
    "About Us",
    "Contact Us",
    "FAQ",
    "Shipping Info",
    "Login",
  ];

  return (
    <div className="relative flex items-center md:hidden">
      <MotionButton
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        whileTap={{ scale: 0.9 }}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
      </MotionButton>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            key="dropdown"
            ref={menuRef}
            className="fixed top-[calc(100%+0.5rem)] right-0 w-64 bg-blue-700 rounded-l-lg shadow-xl overflow-hidden z-50 p-4"
            style={{
              top: buttonRef.current
                ? buttonRef.current.getBoundingClientRect().bottom +
                  window.scrollY +
                  8
                : "auto",
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={navbarAnimationVariants}
          >
            <MotionUl className="space-y-3">
              {navLinks.map((linkName) => (
                <MotionLi
                  key={linkName}
                  variants={menuItemVariants}
                  className="w-full"
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    to={getLinkPath(linkName)}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left text-white hover:bg-blue-600 px-4 py-2 rounded-md transition-colors duration-200 font-roboto text-lg"
                  >
                    {linkName}
                  </Link>
                </MotionLi>
              ))}
            </MotionUl>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropdownNavbar;
