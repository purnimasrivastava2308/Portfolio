import { Code, Briefcase, Mail } from 'lucide-react';

// Using Code for GitHub, Briefcase for LinkedIn, Mail for email

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cosmic-navy border-t border-cosmic-violet/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-cosmic-white mb-2">PURNIMA</h3>
            <p className="text-cosmic-white/60 text-sm">
              Data × Intelligence × Curiosity
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-cosmic-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-cosmic-white/60 hover:text-cosmic-violet transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="/projects" className="text-cosmic-white/60 hover:text-cosmic-violet transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/resume" className="text-cosmic-white/60 hover:text-cosmic-violet transition-colors">
                  Resume
                </a>
              </li>
              <li>
                <a href="/contact" className="text-cosmic-white/60 hover:text-cosmic-violet transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-cosmic-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cosmic-white/60 hover:text-cosmic-violet transition-colors"
                aria-label="GitHub"
              >
                <Code size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cosmic-white/60 hover:text-cosmic-violet transition-colors"
                aria-label="LinkedIn"
              >
                <Briefcase size={20} />
              </a>
              <a
                href="mailto:purnima@example.com"
                className="text-cosmic-white/60 hover:text-cosmic-violet transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cosmic-violet/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-cosmic-white/60">
            <p>&copy; {currentYear} Purnima. All rights reserved.</p>
            <p className="mt-4 md:mt-0">
              Built with curiosity, technology, data and a little cosmic energy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
