import { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../data/data";
import { FaTimes, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderNavItems = (isMobile = false) => (
    <ul className={isMobile ? "space-y-4" : "hidden lg:flex space-x-8"}>
      {navItems.map((item) => (
        <li key={item.id}>
          <Link
            to={item.url}
            aria-label={item.label}
            title={item.label}
            className="block font-medium tracking-wide text-gray-800 transition-colors duration-200 hover:text-teal-accent-400"
            onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            aria-label="News"
            title="News"
            className="inline-flex items-center"
          >
            <svg
              className="w-8 text-teal-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-extrabold tracking-wide text-gray-800 uppercase">
              News
            </span>
          </Link>
          {renderNavItems()}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6 text-gray-800" />
              ) : (
                <FaBars className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="p-3 mt-4 bg-gray-100 lg:hidden">
            {renderNavItems(true)}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
