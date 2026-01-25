
import React, { useState, useEffect, useRef } from 'react';
import { PROFILE, PROCESS_STEPS } from './constants';

const GREETINGS = [
  "Hello",        // English
  "Hola",         // Spanish
  "안녕하세요",     // Korean
  "Hallo",        // German
  "こんにちは",     // Japanese
  "你好",          // Taiwanese
  "Ciao",         // Italian
  "నమస్కారం",      // Telugu
  "Hello"         // English (End)
];

const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [preloaderGone, setPreloaderGone] = useState(false);

  const titles = ["Marketer", "Problem solver", "Artist", "Entrepreneur", "Event planner", "Project manager"];
  const [titleIndex, setTitleIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const [openSteps, setOpenSteps] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [revealCount, setRevealCount] = useState(0);
  const servicesHeaderRef = useRef<HTMLHeadingElement>(null);
  const servicesText = "Services";
  const workText = "Featured Work";
  const [activeWorkId, setActiveWorkId] = useState<string | null>(null);
  const workItems = [
    {
      id: "01",
      title: "A Minerva Convening",
      description: "A concise summary of the challenge, the creative approach, and the measurable impact.",
      tag: "Event Management",
      image:
        "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: "02",
      title: "Inside Voices X",
      description: "Highlight a key outcome, a standout collaboration, and the result that mattered most.",
      tag: "Event Management",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: "03",
      title: "President Cold Outreach Campaign",
      description: "Showcase the problem solved, the audience reached, and the transformation delivered.",
      tag: "Business Development",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
    }
  ];

  // Intro Sequence Effect
  useEffect(() => {
    if (currentGreetingIndex < GREETINGS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentGreetingIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIntroFinished(true);
        setTimeout(() => setShowContent(true), 150);
        // Completely remove preloader from DOM after animation completes (1s transition + buffer)
        setTimeout(() => setPreloaderGone(true), 1200);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentGreetingIndex]);

  // General listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(!!isInteractive);
    };

    const handleScroll = () => {
      if (servicesHeaderRef.current) {
        const rect = servicesHeaderRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const startTrigger = windowHeight * 0.95;
        const endTrigger = windowHeight * 0.6;
        const totalDistance = startTrigger - endTrigger;
        const currentProgress = startTrigger - rect.top;
        const progress = Math.max(0, Math.min(1, currentProgress / totalDistance));
        const count = Math.floor(progress * (servicesText.length + 1));
        setRevealCount(count);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Title typing effect
  useEffect(() => {
    if (!showContent) return;

    const currentFullTitle = titles[titleIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        setTypedTitle(currentFullTitle.substring(0, typedTitle.length + 1));
        setTypingSpeed(150);
        if (typedTitle.length === currentFullTitle.length) {
          setTypedTitle(currentFullTitle);
          setTypingSpeed(1500);
          setIsDeleting(true);
        }
      } else {
        setTypedTitle(currentFullTitle.substring(0, typedTitle.length - 1));
        setTypingSpeed(75);
        if (typedTitle.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(500);
        }
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, titleIndex, typingSpeed, titles, showContent]);

  useEffect(() => {
    if (activeWorkId) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [activeWorkId]);

  const activeWork = workItems.find((item) => item.id === activeWorkId);

  const toggleStep = (number: string) => {
    setOpenSteps(prev => 
      prev.includes(number) 
        ? prev.filter(step => step !== number) 
        : [...prev, number]
    );
  };

  return (
    <div className={`min-h-screen bg-[#FDFDFD] selection:bg-black selection:text-white flex flex-col font-light overflow-x-hidden relative ${!introFinished ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* Intro Preloader Overlay - Completely unmounts after animation */}
      {!preloaderGone && (
        <div 
          className={`fixed inset-0 z-[10000] bg-[#101010] flex items-center justify-center transition-transform duration-[1000ms] ease-[0.83,0,0.17,1] pointer-events-none ${
            introFinished ? '-translate-y-[110%]' : 'translate-y-0'
          }`}
        >
          <div className="relative overflow-hidden flex flex-col items-center">
            <p className="text-white text-4xl md:text-6xl font-serif font-light tracking-tight flex items-center">
              {GREETINGS[currentGreetingIndex]}
            </p>
          </div>
          
        </div>
      )}

      {/* Custom Dot Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out"
        style={{ 
          transform: `translate3d(${mousePos.x - 6}px, ${mousePos.y - 6}px, 0) scale(${isHovering ? 2.5 : 1})`,
          mixBlendMode: isHovering ? 'difference' : 'normal',
          backgroundColor: isHovering ? '#ffffff' : '#000000',
          opacity: showContent ? 1 : 0
        }}
      />

      {/* Main Content */}
      <div className={`px-6 md:px-12 lg:px-24 flex flex-col w-full transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col py-12">
          {/* Top Header */}
          <header className="flex justify-end items-center mb-12 md:mb-20">
            <nav className="flex items-center gap-6 md:gap-10">
              <ul className="hidden md:flex items-center gap-8">
                {['About', 'Services', 'Featured Work'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-black transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <a 
                href="https://www.linkedin.com/in/megan-perpich-5b85b8173/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-zinc-500 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </nav>
          </header>

          {/* Name Header */}
          <div className="flex-1 flex flex-col justify-center py-10">
            <h1 className="text-4xl sm:text-6xl md:text-[6.5rem] lg:text-[8rem] xl:text-[9.5rem] font-serif font-normal leading-[1.1] tracking-tight mb-20 md:mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 whitespace-nowrap">
              {PROFILE.name}
            </h1>

            {/* Animated Title and Bio */}
            <div id="about" className="max-w-full md:max-w-4xl ml-auto text-right">
              <div className="flex justify-end">
                <h2 className="whitespace-nowrap text-2xl sm:text-4xl md:text-6xl lg:text-[6.5rem] xl:text-[7.5rem] font-serif mb-8 tracking-tight leading-[1.1] min-h-[1.1em] text-right pr-6 sm:pr-8 md:pr-12">
                  <span className="relative inline-block">
                    {typedTitle || '\u00A0'}
                    <span 
                      className={`absolute right-0 top-[0.05em] translate-x-[0.12em] w-[2px] md:w-[3px] h-[0.8em] bg-black ${
                        isDeleting && typedTitle.length === titles[titleIndex].length 
                        ? 'animate-pulse' 
                        : (isDeleting || typedTitle.length === 0 ? '' : 'animate-pulse')
                      }`}
                    />
                  </span>
                </h2>
              </div>
              
              <div className="max-w-3xl ml-auto">
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-zinc-800 animate-in fade-in slide-in-from-right-8 duration-1000 delay-700 mb-8">
                  {PROFILE.bio}
                </p>
                
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
                  <a 
                    href={`mailto:${PROFILE.email}`}
                    className="inline-block px-8 py-4 border border-black text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 hover:bg-black hover:text-white hover:px-12"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="flex flex-col md:flex-row gap-16 md:gap-24 items-start py-48">
          <div className="flex-1 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif mb-12 tracking-tight leading-[1.1] font-normal">
              About me
            </h2>
            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl leading-relaxed text-zinc-800">
                {PROFILE.approach}
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-[35%] lg:w-[30%] animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" 
                alt="Megan Perpich Portrait" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
            </div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mt-4 text-right">
              Strategic Visionary — Based in NY
            </p>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section id="services" className={`bg-[#F3F7F3] text-black w-full py-24 md:py-32 transition-all duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="px-6 md:px-12 lg:px-24 flex flex-col">
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-x-12 items-end mb-6">
            <div>
              <h2 
                ref={servicesHeaderRef}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal tracking-tight leading-[1] select-none"
              >
                {servicesText.split('').map((char, index) => (
                  <span 
                    key={index} 
                    className={`inline-block transition-all duration-150 ease-out transform ${
                      index < revealCount 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-4 scale-95'
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </h2>
            </div>
            <div className="pb-4 md:pb-6">
              <span className="text-lg md:text-xl font-light text-zinc-500 tracking-tight">
                Things I can help you with:
              </span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-zinc-400 mb-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-x-12">
            
            <div className="hidden md:block"></div>

            <div className="flex flex-col">
              {PROCESS_STEPS.map((step) => {
                const isOpen = openSteps.includes(step.number);
                return (
                  <React.Fragment key={step.number}>
                    <div 
                      onClick={() => toggleStep(step.number)}
                      className="group relative flex flex-col pt-12 pb-12 border-b border-zinc-400 cursor-pointer overflow-hidden transition-all duration-500"
                    >
                      <div className="flex items-center justify-between w-full relative z-10">
                        <div className="flex items-center gap-6 md:gap-12">
                          
                          {/* Kinetic Infinite-Loop Number Animation */}
                          <div className="text-xs md:text-sm font-medium text-zinc-500 tabular-nums flex overflow-visible">
                            {step.number.split('').map((char, i) => (
                              <div key={i} className="relative overflow-hidden h-[1.2em] flex flex-col leading-none">
                                <span className={`transition-transform duration-[1000ms] ease-[0.83,0,0.17,1] ${i === 0 ? 'group-hover:-translate-y-[150%]' : 'group-hover:translate-y-[150%]'}`}>
                                  {char}
                                </span>
                                <span className={`absolute inset-0 transition-transform duration-[1000ms] ease-[0.83,0,0.17,1] ${i === 0 ? 'translate-y-[150%] group-hover:translate-y-0' : '-translate-y-[150%] group-hover:translate-y-0'}`}>
                                  {char}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Kinetic Infinite-Loop Title Animation */}
                          <h3 className={`text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight flex gap-x-3 overflow-visible`}>
                            {step.title.split(' ').map((word, i) => (
                              <div key={i} className="relative overflow-hidden h-[1.1em] flex flex-col leading-none">
                                <span className={`transition-transform duration-[1000ms] ease-[0.83,0,0.17,1] ${i === 0 ? 'group-hover:-translate-y-[150%]' : 'group-hover:translate-y-[150%]'}`}>
                                  {word}
                                </span>
                                <span className={`absolute inset-0 transition-transform duration-[1000ms] ease-[0.83,0,0.17,1] ${i === 0 ? 'translate-y-[150%] group-hover:translate-y-0' : '-translate-y-[150%] group-hover:translate-y-0'}`}>
                                  {word}
                                </span>
                              </div>
                            ))}
                          </h3>
                        </div>
                        <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                          <div className={`absolute w-full h-[1px] bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                          <div className="absolute h-full w-[1px] bg-black"></div>
                        </div>
                      </div>
                      
                      <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-64 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                        <p className="ml-12 md:ml-24 max-w-xl text-zinc-600 text-lg md:text-xl leading-relaxed pb-6">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* My Work Section */}
      <section id="featured-work" className={`bg-[#BFC7B4] text-black w-full py-24 md:py-32 transition-all duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="px-6 md:px-12 lg:px-24 flex flex-col">
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-x-12 items-end mb-6">
            <div>
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal tracking-tight leading-[1] select-none whitespace-nowrap">
                {workText}
              </h2>
            </div>
            <div className="pb-4 md:pb-6"></div>
          </div>

          <div className="w-full h-[1px] bg-black/30 mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workItems.map((item) => (
              <article
                key={item.id}
                onClick={() => setActiveWorkId(item.id)}
                className="group border border-black/20 bg-white rounded-2xl px-8 py-10 min-h-[320px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif font-normal tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.3em] text-black/60">
                    {item.tag}
                  </p>
                  <div className="mt-6 overflow-hidden rounded-xl border border-black/10">
                    <img
                      src={item.image}
                      alt={`${item.title} preview`}
                      className="h-40 md:h-44 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-10 flex items-center justify-end text-[10px] uppercase tracking-[0.3em] text-black/60">
                  <span className="transition-transform duration-300 group-hover:translate-x-1">View →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeWork && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setActiveWorkId(null)}
        >
          <div
            className="relative w-[96vw] h-[92vh] overflow-y-auto bg-[#FDFDFD] rounded-3xl border border-black/20 shadow-xl p-8 md:p-12"
            onClick={() => setActiveWorkId(null)}
          >
            <button
              className="absolute right-6 top-6 text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-black transition-colors"
              onClick={() => setActiveWorkId(null)}
            >
              Close
            </button>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/60">
              {activeWork.tag}
            </p>
            <h3 className="mt-4 text-3xl md:text-4xl font-serif font-normal tracking-tight">
              {activeWork.title}
            </h3>
            <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
              <img
                src={activeWork.image}
                alt={`${activeWork.title} detail`}
                className="h-56 md:h-72 w-full object-cover"
              />
            </div>
            <p className="mt-6 text-base md:text-lg text-zinc-700 leading-relaxed">
              {activeWork.description}
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-600">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-black/60">Scope</p>
                <p className="mt-2">Strategy, positioning, and experiential execution.</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-black/60">Impact</p>
                <p className="mt-2">Audience growth, stakeholder alignment, and measurable lift.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section - Black background and white text */}
      <div className={`bg-black transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <footer className="px-6 md:px-12 lg:px-24 py-24 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-white">
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="tabular-nums">
              2026 Megan Perpich
            </p>
          </div>
          
          <div className="flex gap-12" id="contact">
            <a href={`mailto:${PROFILE.email}`} className="text-white hover:text-zinc-400 transition-colors tracking-[0.4em]">Email</a>
            <a href="#" className="text-white hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="text-white hover:text-zinc-400 transition-colors">Terms</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
