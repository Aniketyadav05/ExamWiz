import type React from "react";

type serviceData = {
  title: string;
  icon: string;
  description: string;
};

const ServiceCard: React.FC<serviceData> = ({ title, icon, description }) => {
  return (
    <div className="group cursor-pointer relative bg-[#1e293b]/60 border border-[#334155] rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_#7c3aed99] transform hover:-translate-y-1 hover:scale-[1.01] w-full max-w-sm sm:max-w-md">
      
      {/* Subject Title */}
      <h2 className="text-lg sm:text-2xl font-extrabold text-[#a78bfa] mb-3 sm:mb-4 tracking-tight group-hover:text-[#c4b5fd] transition-colors duration-300">
        {title.toUpperCase()}
      </h2>

      {/* Info */}
      <p className="text-sm sm:text-base text-[#cbd5e1]">
        <span className="mr-1">{icon}</span> {description}
      </p>
    </div>
  );
};

export default ServiceCard;
