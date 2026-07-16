import React, { useState, useEffect } from 'react';

interface SlideData {
  title: string;
  subtitle: string;
  tagline: string;
  motto: string;
  statement: string;
  bgClass: string;
  buttons: Array<{ text: string; href: string; primary: boolean; highlight?: boolean }>;
}

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: SlideData[] = [
    {
      title: "Welcome to AlgroFlix HR Academy",
      subtitle: "India's Practical HR Learning Institute",
      tagline: "From Campus to Corporate",
      motto: "Learn. Practice. Perform. Lead.",
      statement: "We Don't Just Teach HR. We Build HR Professionals.",
      bgClass: "bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950",
      buttons: [
        { text: "Join Academy", href: "/hr-academy", primary: true },
        { text: "Talk to Counselor", href: "/hr-academy", primary: false }
      ]
    },
    {
      title: "Building Intelligent IT Solutions",
      subtitle: "Scalable Teams for a Digital-First World",
      tagline: "IT Services & Staff Augmentation",
      motto: "Scale. Innovate. Deliver. Succeed.",
      statement: "We help startups, SMEs, and enterprises accelerate digital transformation through scalable technology, skilled talent, and innovation-driven execution.",
      bgClass: "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900",
      buttons: [
        { text: "Hire Developers", href: "/it-staff-augmentation", primary: true, highlight: true },
        { text: "Explore Services", href: "/it-services", primary: false },
        { text: "Get in Touch", href: "/contact", primary: false }
      ]
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <section 
      id="home" 
      className="relative w-full overflow-hidden min-h-[600px] sm:min-h-[550px] md:min-h-[500px] flex items-center bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full flex items-center transition-all duration-1000 ease-in-out ${slide.bgClass} ${
                isActive 
                  ? 'opacity-100 scale-100 pointer-events-auto z-10' 
                  : 'opacity-0 scale-95 pointer-events-none z-0'
              }`}
            >
              {/* Subtle background overlay elements */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_45%)]" />
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />

              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Sliding Tagline */}
                  <span className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-wider text-teal-400 uppercase bg-teal-400/10 rounded-full border border-teal-500/20 backdrop-blur-sm transform transition-all duration-700 delay-200">
                    {slide.tagline}
                  </span>

                  {/* Main Title */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-sm">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xl sm:text-2xl font-semibold text-blue-300 mb-6 tracking-wide">
                    {slide.subtitle}
                  </p>

                  {/* Motto (HR specific learning values) */}
                  <p className="text-lg sm:text-xl font-medium text-teal-300 italic mb-4">
                    {slide.motto}
                  </p>

                  {/* Description / Statement */}
                  <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                    {slide.statement}
                  </p>

                  {/* Navigation Buttons */}
                  <div className="flex flex-wrap justify-center items-center gap-4">
                    {slide.buttons.map((btn, btnIdx) => {
                      if (btn.primary) {
                        return (
                          <a
                            key={btnIdx}
                            href={btn.href}
                            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                          >
                            {btn.text}
                          </a>
                        );
                      }
                      
                      if (btn.highlight) {
                        return (
                          <a
                            key={btnIdx}
                            href={btn.href}
                            className="bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
                          >
                            {btn.text}
                          </a>
                        );
                      }

                      return (
                        <a
                          key={btnIdx}
                          href={btn.href}
                          className="bg-slate-900/60 hover:bg-slate-900 border-2 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm"
                        >
                          {btn.text}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Slide Controls - Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all duration-300 focus:outline-none z-20 opacity-0 md:opacity-100 group-hover:translate-x-1"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Manual Slide Controls - Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all duration-300 focus:outline-none z-20 opacity-0 md:opacity-100 group-hover:-translate-x-1"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-teal-400 scale-110 shadow-lg shadow-teal-400/50' 
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;