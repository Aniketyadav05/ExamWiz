import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { signIn, signOut, user } = useAuth();

  const displayName = user?.user_metadata.full_name || user?.email;
  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Change this with the logo */}
          <Link to="/" className="flex items-center space-x-2">
  <img src="/logo.png" alt="ExamWiz Logo" className="h-8 w-8 object-contain" />
  <span className="font-mono text-2xl font-bold text-white tracking-wide">
    Exam<span className="text-blue-400">Wiz</span>
  </span>
</Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to={"/upload"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pyq Upload
            </Link>
            <Link
              to={"/papers"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Generated Papers
            </Link>
            {/* Create a search bar*/}
          </div>
          {/* DeskTop Auth */}
      <div className="hidden md:flex items-center">
        {user ? (
          <div className="flex items-center space-x-4">
            {user?.user_metadata.avatar_url && (
              <Link to={"/userDashboard"}>
                <img
                src={user.user_metadata.avatar_url}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              </Link>
            )}
            <span className="text-gray-300">{displayName}</span>
            <button onClick={signOut} className="bg-red-500 px-3 py-1 rounded">Sign Out</button>
          </div>
        ) : (
          <button onClick={signIn} className="bg-blue-500 px-3 py-1 rounded">Sign In</button>
        )}
      </div>
          <div className="md:hidden">
            <button
              className="text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path
                      strokeDasharray="20"
                      strokeDashoffset="20"
                      d="M5 5L19 19"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.3s"
                        values="20;0"
                      />
                    </path>

                    <path
                      strokeDasharray="20"
                      strokeDashoffset="20"
                      d="M19 5L5 19"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.3s"
                        dur="0.3s"
                        values="20;0"
                      />
                    </path>
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="ExamWiz Menu"
                >
                  <title>ExamWiz Magic Menu</title>
                  <g
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path
                      stroke="#5e4b8b"
                      strokeDasharray="14"
                      strokeDashoffset="14"
                      d="M5 6L19 8"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="14;0"
                        dur="0.3s"
                        fill="freeze"
                      />
                    </path>

                    <circle cx="12" cy="12" r="1.5" fill="#ffd700" opacity="0">
                      <animate
                        attributeName="opacity"
                        begin="0.3s"
                        dur="0.2s"
                        values="0;1"
                        fill="freeze"
                      />
                    </circle>

                    <path
                      stroke="currentColor"
                      strokeDasharray="10"
                      strokeDashoffset="10"
                      d="M7 12h10"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        begin="0.3s"
                        dur="0.3s"
                        values="10;0"
                        fill="freeze"
                      />
                    </path>

                    <path
                      stroke="currentColor"
                      strokeDasharray="16"
                      strokeDashoffset="16"
                      d="M4 18h16"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        begin="0.6s"
                        dur="0.3s"
                        values="16;0"
                        fill="freeze"
                      />
                    </path>

                    <circle
                      cx="6"
                      cy="4"
                      r="0.8"
                      fill="currentColor"
                      opacity="0"
                    >
                      <animate
                        attributeName="opacity"
                        begin="0.5s"
                        dur="0.3s"
                        values="0;1"
                        fill="freeze"
                      />
                    </circle>
                    <circle
                      cx="18"
                      cy="10"
                      r="0.6"
                      fill="currentColor"
                      opacity="0"
                    >
                      <animate
                        attributeName="opacity"
                        begin="0.7s"
                        dur="0.3s"
                        values="0;1"
                        fill="freeze"
                      />
                    </circle>
                  </g>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(10,10,10,0.9)]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to={"/"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to={"/create"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Pyq Upload
            </Link>
            <Link
              to={"/papers"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Generated Papers
            </Link>
            {/* Create a search bar*/}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
