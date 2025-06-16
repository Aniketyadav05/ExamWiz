import type React from "react"

type serviceData ={

    title: string,
    icon: string,
    description: string,
} 

const ServiceCard: React.FC<serviceData> = ({title,icon,description}) => {
  return (
    <div className="group cursor-pointer relative bg-[#1e293b]/60 border border-[#334155] rounded-2xl p-6 shadow-xl backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_#7c3aed99] transform hover:-translate-y-2 hover:scale-[1.015] max-w-md w-full">
      
      {/* Subject Title */}
      <h2 className="text-2xl font-extrabold text-[#f8fafc] mb-4 tracking-tight group-hover:text-[#c4b5fd] transition-colors duration-300">
        {title.toUpperCase()}
      </h2>

      {/* Info */}
      <p className="text-[#cbd5e1] mb-1">🎓 <span className="font-medium text-[#a78bfa]">Degree:</span> {description}</p>
      
      </div>
  )
}

export default ServiceCard