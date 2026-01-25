import React, { useState, useEffect } from 'react';

interface NavigationProps {
  currentView: 'home' | 'about' | 'work' | 'project';
  onNavigate: (view: 'home' | 'about' | 'work' | 'project', hash?: string) => void;
}

const navItems: { label: string; view: 'home' | 'about' | 'work' | 'project'; href: string }[] = [
  { label: 'Home', view: 'home', href: '#' },
  { label: 'About', view: 'about', href: '#about' },
  { label: 'Featured Work', view: 'work', href: '#writing' },
  { label: 'Contact', view: 'home', href: '#contact' },
];

const linkedInUrl = 'https://www.linkedin.com/in/megan-perpich-5b85b8173';

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleItemClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      const targetView = item.label === 'Contact' ? (currentView === 'project' ? 'home' : currentView) : item.view;
      onNavigate(targetView, item.href.substring(1));
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-md border-border/50 py-3 shadow-sm' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex justify-between items-center">
          {/* Brand */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('home'); setIsMobileMenuOpen(false); }}
            className="font-serif text-xl sm:text-2xl md:text-3xl text-charcoal tracking-tight hover:opacity-80 transition-opacity z-50"
          >
            Megan Perpich
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10">
            {navItems.map((item) => {
              const isWorkActive = item.view === 'work' && (currentView === 'work' || currentView === 'project');
              const isActive = item.label !== 'Contact' && (currentView === item.view || isWorkActive);
              
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item)}
                  className={`font-sans text-xs uppercase tracking-widest transition-colors relative group ${
                    isActive 
                      ? 'text-charcoal font-bold' 
                      : 'text-muted hover:text-charcoal'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-charcoal transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              );
            })}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors relative group text-muted hover:text-charcoal flex items-center"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-charcoal focus:outline-none z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-[1.5px] bg-charcoal transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-[1.5px] bg-charcoal transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-[1.5px] bg-charcoal transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background z-[40] transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col justify-center px-10 gap-8">
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-serif text-4xl sm:text-5xl transition-all duration-500 delay-[${idx * 50}ms] ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              } ${currentView === item.view ? 'text-accent italic' : 'text-charcoal'}`}
              onClick={(e) => handleItemClick(e, item)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-serif text-4xl sm:text-5xl transition-all duration-500 delay-[${navItems.length * 50}ms] ${
              isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            } text-charcoal flex items-center`}
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          </a>
        </div>
      </div>
    </>
  );
};
