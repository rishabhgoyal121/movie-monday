'use client'
import Link from "next/link";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Movie Monday
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/movies" className="px-3 py-2 rounded-md hover:bg-gray-700">
                Movies
              </Link>
              <Link
                href="/tvShows"
                className="px-3 py-2 rounded-md hover:bg-gray-700"
              >
                TV Shows
              </Link>
              <Link
                href="/actors"
                className="px-3 py-2 rounded-md hover:bg-gray-700"
              >
                Actors
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/movies"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
            >
              Movies
            </Link>
            <Link
              href="/tvShows"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
            >
              TV Shows
            </Link>
            <Link
              href="/actors"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
            >
              Actors
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
