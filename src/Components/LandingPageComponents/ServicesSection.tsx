import ServiceCard from "../ServiceCard"

const serviceData = [
    {
        id:1,
      "title": "AI Summoner",
      "icon": "🧠✨",
      "description": "Harness the power of AI to conjure question papers instantly. Just input your subject and stream — the rest is wizardry."
    },
    {
        id:2,
      "title": "Paper Vault",
      "icon": "📂🔐",
      "description": "A secure and organized archive of past year papers from diverse universities, neatly stored and always accessible."
    },
    {
        id:3,
      "title": "Smart Insights",
      "icon": "📊🔮",
      "description": "Get summarized overviews and topic-wise insights generated with AI. Study with purpose and clarity like never before."
    },
    
  ]
  

const ServicesSection = () => {
  return (
    <section className="bg-[#0b0f1a] flex flex-col items-center py-16 -mt-20 justify-center px-6 relative overflow-hidden">
      
      <section className="relative w-full bg-[#0b0f1a] py-20 px-6 flex flex-col items-center overflow-hidden">
  

  {/* Section Heading */}
  <div className="max-w-4xl text-center space-y-6 relative">
  <h2 className="text-3xl md:text-5xl lg:h-16 h-24 font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] via-[#a78bfa] to-[#7c3aed] drop-shadow">
  Not Just Papers — It's Alchemy.
</h2>


<p className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
  Turn chaos into clarity. Whether you're prepping for finals or exploring past trends, ExamWhiz transforms static documents into dynamic knowledge — intelligently organized and ready to serve.
</p>

  </div>
</section>

<div className="grid grid-cols-2 md:grid-cols-3  gap-6 mt-4 w-full max-w-5xl z-10">
{serviceData.map((data) => (
  <ServiceCard
    key={data.id}
    title={data.title}
    icon={data.icon}
    description={data.description}
  />
))}

</div>
</section>
  )
}

export default ServicesSection