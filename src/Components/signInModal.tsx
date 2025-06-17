import { useAuth } from "../contexts/AuthContext"; // adjust the path as needed
import { FaExclamationCircle } from "react-icons/fa";

const SignInModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { signIn } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-[#0b0f1a] text-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
        <div className="flex flex-col items-center text-center">
          <FaExclamationCircle className="text-yellow-500 text-4xl mb-3" />
          <h2 className="text-2xl font-semibold mb-2 ">
            Sign In Required
          </h2>
          <p className="text-gray-300 mb-6">
            You need to be signed in to access this feature.
          </p>

          <div className="flex justify-center gap-4 w-full">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-300 hover:bg-gray-900 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                signIn();
              }}
              className="px-4 py-2 cursor-pointer text-white rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] transition"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
