import React from 'react';
import { Navigation } from './components/Navigation';
import { Button } from './components/Button';
import { NavItem } from './types';

function App() {
  return (
    <div className="min-h-screen bg-background text-charcoal font-serif selection:bg-accent/20">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <h1 className="text-4xl md:text-6xl font-serif leading-[1.15] text-charcoal">
              Strategic thinking <br className="hidden md:block" />
              for a complex world.
            </h1>
            <div className="w-16 h-[1px] bg-border my-6"></div>
            <p className="font-sans text-lg text-muted max-w-md leading-relaxed">
              I work at the intersection of education, policy, and international collaboration.
            </p>
            <div className="pt-4">
              <Button>Learn More</Button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            {/* Image Placeholder - Professional Headshot */}
            <div className="aspect-[4/5] md:aspect-square bg-neutral-200 w-full overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" 
                alt="Portrait of Alex Carter" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tri-Column Grid Section */}
      <section className="border-t border-b border-border bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            
            {/* Column 1: About */}
            <div className="p-8 md:p-12 space-y-32 flex flex-col justify-between hover:bg-white/50 transition-colors duration-500">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest text-muted border-b border-charcoal pb-1 inline-block mb-6">About Me</span>
                <h3 className="text-2xl font-serif leading-snug text-charcoal mt-4">
                  Bridging ideas across borders and disciplines.
                </h3>
              </div>
              <a href="#about" className="font-sans text-sm text-muted hover:text-accent flex items-center gap-2 group">
                Read More 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Column 2: Recent Work */}
            <div className="p-8 md:p-12 flex flex-col justify-between hover:bg-white/50 transition-colors duration-500">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest text-muted border-b border-charcoal pb-1 inline-block mb-6">Recent Work</span>
                <h3 className="text-2xl font-serif leading-snug text-charcoal mt-4 mb-8">
                  Global Education Strategy Report
                </h3>
                
                {/* Document Thumbnail Representation */}
                <div className="w-24 h-32 border border-border bg-white shadow-sm p-2 flex flex-col gap-2 mx-auto md:mx-0 rotate-3 hover:rotate-0 transition-transform duration-300">
                   <div className="h-2 w-16 bg-neutral-200"></div>
                   <div className="h-1 w-full bg-neutral-100"></div>
                   <div className="h-1 w-full bg-neutral-100"></div>
                   <div className="h-1 w-3/4 bg-neutral-100"></div>
                   <div className="mt-auto h-4 w-4 rounded-full bg-accent/20"></div>
                </div>
              </div>

              <a href="#work" className="font-sans text-sm text-muted hover:text-accent flex items-center gap-2 group mt-8">
                View Project 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Column 3: Latest Essay */}
            <div className="p-8 md:p-12 space-y-32 flex flex-col justify-between hover:bg-white/50 transition-colors duration-500">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest text-muted border-b border-charcoal pb-1 inline-block mb-6">Latest Essay</span>
                <h3 className="text-2xl font-serif leading-snug text-charcoal mt-4">
                  Rethinking International Partnerships
                </h3>
              </div>
              <a href="#essay" className="font-sans text-sm text-muted hover:text-accent flex items-center gap-2 group">
                Read Essay 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-serif italic text-2xl md:text-4xl text-charcoal leading-relaxed">
            “Understanding the world means connecting the dots others overlook.”
          </blockquote>
        </div>
      </section>

      {/* Insights & Articles */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border">
        <h2 className="font-serif text-3xl md:text-4xl mb-12 text-charcoal">Insights & Articles</h2>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Article 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-[16/10] overflow-hidden mb-6 bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop" 
                alt="University Lecture Hall" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-0 group-hover:saturate-50"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-serif group-hover:text-accent transition-colors">
                Adapting Higher Education for Tomorrow
              </h3>
              <p className="font-sans text-muted leading-relaxed">
                How universities can evolve in an uncertain future. A deep dive into curriculum reform and global accessibility.
              </p>
            </div>
          </div>

          {/* Article 2 */}
          <div className="group cursor-pointer">
            <div className="aspect-[16/10] overflow-hidden mb-6 bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1000&auto=format&fit=crop" 
                alt="Meeting in office" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-0 group-hover:saturate-50"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-serif group-hover:text-accent transition-colors">
                Navigating Cross-Cultural Leadership
              </h3>
              <p className="font-sans text-muted leading-relaxed">
                Lessons from working across different regions. Understanding the subtle nuances of international diplomacy in business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-[#F0EFE9] border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="mb-12">
             <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8">Let’s Connect</h2>
             <div className="w-full h-[1px] bg-border"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <p className="font-sans text-muted">
              Feel free to reach out directly regarding speaking or strategy work.
            </p>
            
            <div className="flex items-center gap-8">
              <Button variant="primary">Contact Me</Button>
              
              <div className="flex gap-4 text-charcoal">
                <a href="#" className="hover:text-accent transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;