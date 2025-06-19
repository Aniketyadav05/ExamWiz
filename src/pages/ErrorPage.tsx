// src/pages/ErrorPage.tsx
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0f172a] text-[#f8fafc] px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#7c3aed]">404</h1>
        <p className="text-2xl mt-4 mb-6">Oops! Page not found.</p>
        <Link
          to="/"
          className="inline-block bg-[#7c3aed] text-white px-6 py-3 rounded-full text-lg hover:bg-[#6d28d9] transition"
        >
          Go back home!
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
