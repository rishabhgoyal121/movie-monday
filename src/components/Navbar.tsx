'use client'
import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Movie Monday
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                <NavigationMenuItem>
                  <Link href="/movies" legacyBehavior passHref>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-700/50 transition-colors duration-200">
                      Movies
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent className="bg-gray-800/95 backdrop-blur-sm p-4 rounded-lg shadow-xl">
                    <div className="grid grid-cols-2 gap-4 w-[400px]">
                      <Link href="/movies" legacyBehavior passHref>
                        <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors duration-200">
                          Upcoming
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/movies/topRated" legacyBehavior passHref>
                        <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors duration-200">
                          Top Rated
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/movies/mostPopular" legacyBehavior passHref>
                        <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors duration-200">
                          Most Popular
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/movies/nowPlaying" legacyBehavior passHref>
                        <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors duration-200">
                          Now Playing
                        </NavigationMenuLink>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/tvShows" legacyBehavior passHref>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-700/50 transition-colors duration-200">
                      TV Shows
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent className="bg-gray-800/95 backdrop-blur-sm p-4 rounded-lg shadow-xl">
                    <div className="grid grid-cols-2 gap-4 w-[400px]">
                      <Link href="/tvShows" legacyBehavior passHref>
                        <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors duration-200">
                          Popular
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/tvShows/airingToday" legacyBehavior passHref>
                        <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors duration-200">
                          Airing Today
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/tvShows/onTV" legacyBehavior passHref>
                        <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors duration-200">
                          On TV
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/tvShows/topRated" legacyBehavior passHref>
                        <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors duration-200">
                          Top Rated
                        </NavigationMenuLink>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/actors" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-transparent hover:bg-gray-700/50 transition-colors duration-200 px-4 py-2 rounded-md">
                      Actors
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/login" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-transparent hover:bg-gray-700/50 transition-colors duration-200 px-4 py-2 rounded-md">
                      Login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/user" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-transparent hover:bg-gray-700/50 transition-colors duration-200 px-4 py-2 rounded-md">
                      Account
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700/50 focus:outline-none transition-colors duration-200"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800/95 backdrop-blur-sm">
          <Link
            href="/movies"
            className="block px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors duration-200"
          >
            Movies
          </Link>
          <Link
            href="/tvShows"
            className="block px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors duration-200"
          >
            TV Shows
          </Link>
          <Link
            href="/actors"
            className="block px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors duration-200"
          >
            Actors
          </Link>
          <Link
            href="/login"
            className="block px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/user"
            className="block px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors duration-200"
          >
            Account
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
