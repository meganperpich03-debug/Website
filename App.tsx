import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { Button } from './components/Button';

type View = 'home' | 'about' | 'work' | 'project';

interface WorkItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  platform: string;
  rolesResponsibilities: string;
  team: string;
  timeline: string;
  context: string;
  gap: string;
  obstaclesConstraints: string;
  solution: string;
  resultsImpact: string;
}

const workItems: WorkItem[] = [
  {
    id: '1',
    title: 'Adapting Higher Education for Tomorrow',
    category: 'Strategy / Education',
    description: 'How universities can evolve in an uncertain future. A deep dive into curriculum reform and global accessibility.',
    imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop',
    platform: 'Multi-institutional Digital Learning Ecosystem',
    rolesResponsibilities: 'Lead Strategic Advisor, Ethnographic Researcher, Stakeholder Management',
    team: '4 Data Analysts, 2 Learning Experience Designers, 1 Institutional Policy Expert',
    timeline: '10 Months (Q1 2024 - Q4 2024)',
    context: 'Following global shifts in student demographics and the rise of remote learning, traditional higher education institutions were struggling to maintain engagement and fiscal sustainability. The project focused on three major research universities in North America and Europe.',
    gap: 'A significant disconnect existed between rigid, 4-year degree structures and the needs of "non-traditional" learners (working professionals, international students) who required modular, stackable credentials.',
    obstaclesConstraints: 'Institutional inertia was high. Tenured faculty were wary of "digitization," and legacy IT infrastructure made real-time cross-departmental collaboration technically difficult.',
    solution: 'We developed a "Modular Curriculum Framework" that allowed for interdisciplinary credit sharing and a unified digital portal. This was supported by a phased policy transition plan to ease faculty concerns through evidence-based workshops.',
    resultsImpact: 'Adopted by all three partner institutions, resulting in a 18% increase in non-traditional student enrollment and a 25% reduction in administrative overhead for course management.'
  },
  {
    id: '2',
    title: 'Navigating Cross-Cultural Leadership',
    category: 'Cultural Research / Business',
    description: 'Lessons from working across different regions. Understanding the subtle nuances of international diplomacy in business.',
    imageUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1000&auto=format&fit=crop',
    platform: 'Global Internal Communications & Training System',
    rolesResponsibilities: 'Cultural Anthropologist, Executive Coach, Strategic Communications Lead',
    team: '2 Regional Directors, 1 Organizational Psychologist, 1 Visual Storyteller',
    timeline: '6 Months (2023)',
    context: 'A Fortune 500 company was experiencing high friction and project slippage in collaborations between its EMEA and APAC headquarters, leading to a breakdown in global innovation cycles.',
    gap: 'Leadership models were based on a "one-size-fits-all" Western corporate culture that failed to account for high-context vs. low-context communication styles and differing hierarchical expectations.',
    obstaclesConstraints: 'Deeply ingrained cognitive biases within executive leadership and a lack of transparency in cross-regional performance metrics.',
    solution: 'Initiated a "Cultural Resonance Mapping" study. We translated findings into a tailored leadership training program and redesigned the internal project management tool to allow for regional communication preferences.',
    resultsImpact: 'Documented a 40% reduction in project delays attributed to "miscommunication" and a 15-point increase in Net Promoter Scores for international team morale.'
  },
  {
    id: '3',
    title: 'Reimagining Urban Social Spaces',
    category: 'Urban Sociology / Architecture',
    description: 'Designing cities for connection rather than just transit. A study on the sociological impact of public architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop',
    platform: 'Civic Architecture / Urban Planning Commission',
    rolesResponsibilities: 'Sociological Advisor, Community Engagement Lead, Design Consultant',
    team: '3 Urban Architects, 2 Landscape Designers, 1 City Planner, 1 Public Arts Liaison',
    timeline: '14 Months (2022-2023)',
    context: 'In rapidly densifying urban centers, traditional public spaces were becoming transactional—places people passed through rather than gathered in, leading to a decline in civic participation.',
    gap: 'Existing city planners prioritized transit efficiency and safety-through-visibility (surveillance) over the psychological need for intimate "third places" and spontaneous social collision.',
    obstaclesConstraints: 'Stringent local safety codes and limited municipal budgets required solutions that were both low-cost and high-durability.',
    solution: 'We proposed "Social Anchor Design"—integrating flexible seating, warm lighting schemes, and community-curated art into existing transit hubs. We led 12 community co-design workshops to ensure local ownership.',
    resultsImpact: 'The redesign of two pilot plazas saw a 30% increase in average "linger time" and a measurable rise in local community event attendance, revitalizing nearby small businesses.'
  },
  {
    id: '4',
    title: 'The Future of Digital Identity',
    category: 'Digital Ethics / Technology',
    description: 'Balancing privacy and personalization in the next era of the web. Why transparency is the new currency of trust.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    platform: 'Decentralized Identity Prototype (Web3)',
    rolesResponsibilities: 'Ethical Design Lead, Creative Director, UX Strategist',
    team: '3 Blockchain Engineers, 1 Cryptography Expert, 2 UI Designers',
    timeline: '9 Months (2023-2024)',
    context: 'User trust in digital platforms was at an all-time low due to data breaches and opaque tracking. The industry was at a crossroads between total surveillance and total user disconnection.',
    gap: 'Most privacy tools were designed by engineers for engineers, resulting in interfaces that were too complex for average users to actually exercise their right to privacy.',
    obstaclesConstraints: 'The technical complexity of Zero-Knowledge Proofs (ZKP) made it difficult to create an interface that was both secure and fast enough for modern consumer expectations.',
    solution: 'Designed a "Transparent Consent Ecosystem." We simplified complex cryptographic actions into intuitive "Trust Badges" and a centralized data dashboard where users could revoke permissions with one click.',
    resultsImpact: 'The prototype achieved a 94% user comprehension rate in testing—a massive leap from the 12% industry average. It is currently being integrated into two major financial platforms.'
  }
];

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const workScrollRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal, .img-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [currentView, selectedProjectId]);

  const handleNavigate = (view: View, hash?: string) => {
    setCurrentView(view);
    setSelectedProjectId(null);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setCurrentView('project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderWorkSection = (title: string = "Featured Work", isCarousel: boolean = true) => (
    <section id="writing" className={`py-12 md:py-24 max-w-7xl mx-auto border-t border-border ${isCarousel ? 'overflow-hidden' : ''}`}>
      <div className="px-8 sm:px-12 flex justify-between items-end mb-8 md:mb-12 reveal">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal">{title}</h2>
        {isCarousel && (
          <div className="hidden md:flex gap-4">
            <button onClick={() => scrollContainer(workScrollRef, 'left')} className="p-3 border border-border hover:bg-charcoal hover:text-white transition-all duration-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg></button>
            <button onClick={() => scrollContainer(workScrollRef, 'right')} className="p-3 border border-border hover:bg-charcoal hover:text-white transition-all duration-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg></button>
          </div>
        )}
      </div>
      
      {isCarousel ? (
        <div 
          ref={workScrollRef}
          className="flex gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory px-8 sm:px-12 no-scrollbar pb-4 scroll-pl-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {workItems.map((item, idx) => (
            <div key={item.id} onClick={() => handleProjectClick(item.id)} className="min-w-[80%] md:min-w-[45%] snap-start group cursor-pointer mb-8 reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="aspect-[16/10] overflow-hidden mb-4 bg-neutral-100">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-2 transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-xl sm:text-2xl font-serif group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="font-sans text-sm text-muted leading-relaxed line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
          {/* Spacer for horizontal scroll end */}
          <div className="min-w-[1px] h-full"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-20 px-8 sm:px-12">
          {workItems.map((item, idx) => (
            <div key={item.id} onClick={() => handleProjectClick(item.id)} className="group cursor-pointer reveal" style={{ transitionDelay: `${(idx % 2) * 200}ms` }}>
              <div className="aspect-[16/10] overflow-hidden mb-6 bg-neutral-100">
                 <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-3 transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-2xl font-serif group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="font-sans text-muted leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const renderProjectDetail = (id: string) => {
    const project = workItems.find(p => p.id === id);
    if (!project) return null;

    return (
      <div className="pt-24 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="max-w-4xl mx-auto px-8 sm:px-12">
          <button onClick={() => handleNavigate('work')} className="group flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-muted hover:text-charcoal transition-colors mb-12">
            <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span> Back to Work
          </button>

          <header className="mb-16 space-y-6">
            <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-accent font-bold animate-fade-up block">Case Study / {project.category}</span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif leading-tight animate-fade-up [animation-delay:100ms] text-charcoal">{project.title}</h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-muted opacity-80 animate-fade-up [animation-delay:200ms] max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-12 py-10 border-y border-border/40 mb-20 animate-fade-up [animation-delay:300ms]">
            <div className="space-y-1">
              <h5 className="font-sans text-[9px] uppercase tracking-widest text-muted font-bold">Platform</h5>
              <p className="font-serif text-sm">{project.platform}</p>
            </div>
            <div className="space-y-1">
              <h5 className="font-sans text-[9px] uppercase tracking-widest text-muted font-bold">Roles & Resp.</h5>
              <p className="font-serif text-sm">{project.rolesResponsibilities}</p>
            </div>
            <div className="space-y-1">
              <h5 className="font-sans text-[9px] uppercase tracking-widest text-muted font-bold">Team</h5>
              <p className="font-serif text-sm">{project.team}</p>
            </div>
            <div className="space-y-1">
              <h5 className="font-sans text-[9px] uppercase tracking-widest text-muted font-bold">Timeline</h5>
              <p className="font-serif text-sm">{project.timeline}</p>
            </div>
          </div>

          <div className="space-y-20 md:space-y-24">
            {[
              { id: '01', title: 'Context', content: project.context },
              { id: '02', title: 'The Gap', content: project.gap },
              { id: '03', title: 'Constraints', content: project.obstaclesConstraints },
              { id: '04', title: 'Solution', content: project.solution },
              { id: '05', title: 'Impact', content: project.resultsImpact },
            ].map((section) => (
              <div key={section.id} className="grid md:grid-cols-12 gap-4 md:gap-8 reveal">
                <div className="md:col-span-4">
                  <h3 className="font-sans text-[9px] uppercase tracking-[0.3em] text-accent font-bold md:sticky md:top-32">{section.id} / {section.title}</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="font-serif text-base md:text-xl leading-relaxed text-charcoal/90">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'project':
        return selectedProjectId ? renderProjectDetail(selectedProjectId) : null;
      case 'home':
        return (
          <>
            <section id="home" className="pt-28 pb-12 md:pt-48 md:pb-24 px-8 sm:px-12 max-w-7xl mx-auto">
              <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-16 items-center">
                <div className="flex-1 space-y-6 md:space-y-8 animate-fade-up w-full text-center md:text-left">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif leading-tight text-charcoal">Hi, I'm Megan</h1>
                  <div className="hidden md:block w-16 h-[1px] bg-border my-6 origin-left animate-draw-line"></div>
                  <p className="font-sans text-base sm:text-lg text-muted max-w-md mx-auto md:mx-0 leading-relaxed animate-fade-up [animation-delay:200ms]">
                    I create human-centered, authentic, and culturally informed campaigns that turn real stories into meaningful impact.
                  </p>
                  <div className="pt-4 animate-fade-up [animation-delay:400ms]">
                    <Button onClick={() => handleNavigate('about')} className="w-full sm:w-auto">More About Me</Button>
                  </div>
                </div>
                <div className="flex-1 w-full max-w-sm md:max-w-none">
                  <div className="aspect-[4/5] md:aspect-square bg-neutral-200 w-full overflow-hidden relative img-reveal visible shadow-2xl">
                    <img src="/profile.jpg" alt="Megan" className="w-full h-full object-cover transition-all duration-1000 ease-out hover:scale-[1.02]" />
                  </div>
                </div>
              </div>
            </section>
            {renderWorkSection("Featured Work", true)}
            
          </>
        );
      case 'work':
        return (
          <div className="pt-24 min-h-[60vh] relative">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 mb-12 animate-fade-up">
               <h2 className="text-3xl sm:text-4xl font-serif mt-12">Featured Work</h2>
            </div>
            {renderWorkSection("", false)}
          </div>
          
        );
      case 'about':
        return (
          <section id="about" className="pt-24 pb-16 md:pt-48 md:pb-32 px-8 sm:px-12 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              {/* Image Section - First on Mobile, Sticky on Desktop */}
              <div className="md:col-span-5 md:sticky md:top-32 order-1 md:order-2">
                <div className="aspect-[4/5] bg-neutral-100 overflow-hidden shadow-xl border border-border/20 img-reveal visible">
                  <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop" alt="Megan" className="w-full h-full object-cover grayscale transition-all duration-1000" />
                </div>
              </div>
              
              {/* Text Section - Second on Mobile */}
              <div className="md:col-span-7 space-y-10 animate-fade-up order-2 md:order-1">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-charcoal">About Me</h2>
                <div className="font-sans text-muted leading-relaxed text-base sm:text-lg space-y-6">
                  <p className="reveal">I am a brand strategist and cultural researcher dedicated to helping organizations navigate the complexities of the modern human experience.</p>
                  <p className="reveal delay-100">My journey began in sociology, where I learned to look beneath the surface to find underlying social currents. I prioritize deep listening and slow strategy over rapid tactics.</p>
                  <p className="reveal delay-200">In an era of algorithms, I advocate for human intuition. I help partners build resonance not by being loudest, but by being the most meaningful.</p>
                  <div className="pt-8 md:pt-12 border-t border-border/40 reveal">
                    <h4 className="font-sans font-bold text-charcoal text-base uppercase tracking-widest mb-8">Expertise</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-10">
                      {[
                        { num: '01', title: 'Brand Strategy', desc: 'Defining authentic voices.' },
                        { num: '02', title: 'Cultural Anthropology', desc: 'Uncovering social trends.' },
                        { num: '03', title: 'Ethical AI', desc: 'Guiding the human side of tech.' },
                        { num: '04', title: 'Urban Sociology', desc: 'Impact of physical space.' },
                        { num: '05', title: 'Social Impact', desc: 'Aligning business with community.' },
                        { num: '06', title: 'Global Leadership', desc: 'Bridging communication gaps.' }
                      ].map((item, idx) => (
                        <div key={item.num} className="flex items-start gap-3 reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                          <span className="text-accent italic font-serif text-lg">{item.num}</span>
                          <div className="space-y-1">
                            <h5 className="font-bold text-sm text-charcoal">{item.title}</h5>
                            <p className="text-xs text-muted">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-charcoal font-serif selection:bg-accent/20">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      {renderContent()}
      <footer id="contact" className="mt-16 pb-12 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">
            <div className="space-y-8 w-full md:w-auto reveal">
              <h2 className="text-3xl sm:text-5xl font-serif text-charcoal">Let’s chat</h2>
              <div className="space-y-6">
                <p className="font-sans text-[10px] uppercase tracking-widest text-muted font-bold">Connect</p>
                <div className="flex flex-col gap-8">
                  <a href="mailto:megan.perpich03@gmail.com" className="text-lg sm:text-2xl font-serif text-charcoal hover:text-accent transition-all duration-300 underline underline-offset-8 decoration-border/40 decoration-1">megan.perpich03@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="text-[9px] font-sans text-muted uppercase tracking-[0.3em] pl-0 md:border-l md:border-border/30 md:pl-8 pb-1 reveal delay-300">© 2026 Megan Perpich</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
