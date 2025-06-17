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
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
        <div className="flex flex-col items-center text-center">
          <FaExclamationCircle className="text-yellow-500 text-4xl mb-3" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Sign In Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to access this feature.
          </p>

          <div className="flex justify-center gap-4 w-full">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                signIn();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
