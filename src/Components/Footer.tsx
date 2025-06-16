const Footer = () => {
    return (
      <footer className="bg-[#0b0f1a] text-[#cbd5e1] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
  
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#a78bfa] mb-2">ExamWhiz</h2>
            <p className="text-sm text-[#94a3b8]">
              AI-powered question paper wizardry. Summon, store, and study with smart tools built for modern learners.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#f8fafc]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/upload" className="hover:text-[#a78bfa] transition">Generate Paper</a></li>
              <li><a href="/papers" className="hover:text-[#a78bfa] transition">Browse Papers</a></li>
              <li><a href="/about" className="hover:text-[#a78bfa] transition">About</a></li>
            </ul>
          </div>
  
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#f8fafc]">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="hover:text-[#a78bfa] transition">FAQ</a></li>
              <li><a href="/privacy" className="hover:text-[#a78bfa] transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#a78bfa] transition">Terms of Use</a></li>
            </ul>
          </div>
  
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#f8fafc]">Get in Touch</h3>
            <p className="text-sm text-[#94a3b8]">Have a feature idea or a bug to report?</p>
            <a href="mailto:hello@examwhiz.ai" className="text-[#a78bfa] hover:underline text-sm">
              hello@examwhiz.ai
            </a>
          </div>
        </div>
  
        <div className="mt-10 border-t border-[#1e293b] pt-6 text-center text-sm text-[#475569]">
          © {new Date().getFullYear()} ExamWhiz. Crafted with ✨ & caffeine.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  