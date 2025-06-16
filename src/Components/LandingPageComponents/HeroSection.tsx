import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="bg-[#0b0f1a] min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(1000)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[4px] h-[4px] bg-[#a78bfa] rounded-full opacity-30 animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      <div className="max-w-4xl text-center space-y-4 relative z-10">
      <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-br from-[#facc15] via-[#a78bfa] to-[#7c3aed] text-transparent bg-clip-text drop-shadow-[0_2px_10px_rgba(124,58,237,0.6)] leading-tight tracking-tight ">
  Summon Question Papers Like a Wizard 🧙‍♂️
  <span className="animate-pulse text-[#facc15]">|</span>
</h1>

<p className="text-[#cbd5e1] text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
  ✨ Generate, store, and explore past year papers in one enchanted hub. <br />
  Built for students, powered by <span className="text-[#a78bfa] font-medium">AI magic</span>.
</p>


        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={"/upload"} className="relative cursor-pointer bg-[#7c3aed] hover:bg-[#6d28d9] text-[#f8fafc] px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 animate-glow">
            ✨ Generate Paper
          </Link>
          <Link to={"/papers"} className="border cursor-pointer border-[#435164] hover:bg-[#6d28d9] text-[#f8fafc] px-6 py-3 rounded-full text-lg  transition duration-300 ">
            🧾 Browse Papers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
