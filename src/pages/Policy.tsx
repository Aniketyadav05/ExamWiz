import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"


const Policy = () => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-30">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-br from-[#facc15] via-[#a78bfa] to-[#7c3aed] text-transparent bg-clip-text drop-shadow-[0_2px_10px_rgba(124,58,237,0.6)] leading-tight tracking-tight ">Polcies for ExamWiz</h1>
        <ul className="space-y-4">
            <li>1. If you find any bug just report it to me. on any of the links given below 👇🏿</li>
            <div className="flex gap-4 text-xl text-[#94a3b8]  items-center justify-center">
                        <a href="https://github.com/aniketyadav05" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                          <FaGithub />
                        </a>
                        <a href="https://linkedin.com/in/aniketyadav05" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                          <FaLinkedin />
                        </a>
                        <a href="https://x.com/AniketYadav05_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                          <FaXTwitter />
                        </a>
                      </div>
            
        </ul>
    </div>
  )
}

export default Policy