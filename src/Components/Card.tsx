import { Link } from "react-router";

type CardProps = {
  id: string;
  subject: string;
  Year: string;
  Degree: string;
  University: string;
};

const Card: React.FC<CardProps> = ({ id, subject, Year, Degree, University }) => {
  return (
    <div className="group relative bg-[#1e293b]/60 border border-[#334155] rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_#7c3aed99] transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] max-w-full sm:max-w-md w-full text-left">
      
      {/* Subject Title */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-[#f8fafc] mb-3 tracking-tight group-hover:text-[#c4b5fd] transition-colors duration-300">
        {subject.toUpperCase()}
        <span className="block text-sm text-[#a78bfa] font-medium mt-1">({Year} Year)</span>
      </h2>

      {/* Info */}
      <p className="text-sm sm:text-base text-[#cbd5e1] mb-1">
        🎓 <span className="font-medium text-[#a78bfa]">Degree:</span> {Degree}
      </p>
      <p className="text-sm sm:text-base text-[#cbd5e1] mb-4 sm:mb-6">
        🏛️ <span className="font-medium text-[#a78bfa]">University:</span> {University}
      </p>

      {/* View Details Button */}
      <Link
        to={`/papers/${id}`}
        className="inline-block w-full sm:w-auto text-center bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#6d28d9] hover:to-[#4f46e5] text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-indigo-400/30 transition-all duration-300"
      >
        ✨ View Details →
      </Link>

      {/* Optional Glow Accent */}
      <div className="absolute -inset-[2px] z-[-1] rounded-2xl bg-gradient-to-r from-[#7c3aed33] via-transparent to-[#7c3aed33] opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
    </div>
  );
};

export default Card;
