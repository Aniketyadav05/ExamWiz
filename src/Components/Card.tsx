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
    <div className="group cursor-pointer relative bg-[#1e293b]/60 border border-[#334155] rounded-2xl p-6 shadow-xl backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_#7c3aed99] transform hover:-translate-y-2 hover:scale-[1.015] max-w-md w-full">
      
      {/* Subject Title */}
      <h2 className="text-2xl font-extrabold text-[#f8fafc] mb-4 tracking-tight group-hover:text-[#c4b5fd] transition-colors duration-300">
        {subject.toUpperCase()}
        <span className="block text-sm text-[#a78bfa] font-medium mt-1">({Year} Year)</span>
      </h2>

      {/* Info */}
      <p className="text-[#cbd5e1] mb-1">🎓 <span className="font-medium text-[#a78bfa]">Degree:</span> {Degree}</p>
      <p className="text-[#cbd5e1] mb-6">🏛️ <span className="font-medium text-[#a78bfa]">University:</span> {University}</p>

      {/* Gradient Button */}
      <Link
        to={`/papers/${id}`}
        className="inline-block bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#6d28d9] hover:to-[#4f46e5] text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-indigo-400/30 transition-all duration-300"
      >
        ✨ View Details →
      </Link>

      {/* Glow Border Accent (optional) */}
      <div className="absolute -inset-[2px] z-[-1] rounded-2xl bg-gradient-to-r from-[#7c3aed33] via-transparent to-[#7c3aed33] opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
    </div>
  );
};

export default Card;
