import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Journey', path: '/journey' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'AI', path: '/ai' },
    { label: 'Philosophy', path: '/philosophy' },
    { label: 'Resume', path: '/resume' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#070812]/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="text-[1.1rem] font-semibold tracking-[-0.02em] text-cosmic-white hover:text-cosmic-violet transition-colors"
          >
            PURNIMA
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[0.76rem] uppercase tracking-[0.18em] transition-colors ${
                  isActive(item.path)
                    ? 'text-cosmic-light font-medium'
                    : 'text-[#A8A8B7] hover:text-cosmic-light'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cosmic-white hover:text-cosmic-violet"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 border-b border-white/5 bg-[#070812]/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-full text-sm transition-colors ${
                    isActive(item.path)
                      ? 'bg-white/5 text-cosmic-light'
                      : 'text-[#A8A8B7] hover:bg-white/5 hover:text-cosmic-light'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
