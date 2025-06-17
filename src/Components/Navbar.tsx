import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signIn, signOut, user } = useAuth();
  const displayName = user?.user_metadata.full_name || user?.email;
  const navigate = useNavigate();
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 md:w-[70%] w-[90%] z-50 backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <img src="/logo.png" alt="ExamWiz Logo" className="h-10 w-9" />
            <span className="font-mono text-2xl font-bold text-white tracking-wide">
              Exam<span className="text-blue-400 ml-1">Wiz</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user && (
              <>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/upload" className="nav-link">
                  Generate Paper
                </Link>
                <Link to="/papers" className="nav-link">
                  All Papers
                </Link>
              </>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                {user?.user_metadata.avatar_url && (
                  <Link to="/userDashboard">
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                    />
                  </Link>
                )}
                <span className="text-white">{displayName}</span>
                <button
                  onClick={ () => {
                    signOut(); 
                    
                      navigate("/"); 
                   
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-xl shadow-sm cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-xl shadow-sm cursor-pointer"
              >
                Join now
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md rounded-b-3xl px-4 pb-4 pt-2">
          {user && (
            <>
              <Link to="/" className="mobile-link">
                Home
              </Link>
              <Link to="/upload" className="mobile-link">
                PYQ Upload
              </Link>
              <Link to="/papers" className="mobile-link">
                Generated Papers
              </Link>
            </>
          )}

          {user ? (
            <div className="mt-4 space-y-2">
              <Link
                to="/userDashboard"
                className="flex items-center gap-2 text-white"
              >
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-white"
                />
                <span>{displayName}</span>
              </Link>
              <button
                onClick={signOut}
                className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={signIn}
              className="w-full mt-2 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600"
            >
              Join
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
