import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../App.css';
import { Icons } from '../Icons';

const SkillsPopup = ({ content, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIconTitle, setHoveredIconTitle] = useState('');
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const scrollContainerRef = useRef(null);

  const sections = [
    { 
      title: 'Frontend', 
      text: 'Specializing in React, Vue, and modern CSS frameworks to build responsive, accessible interfaces.',
      icons: [
        { element: <Icons.Html5Badge className="w-40 h-auto p-2" />, name: 'HTML5' },
        { element: <Icons.Css3Badge className="w-40 h-auto p-2" />, name: 'CSS3' },
        { element: <Icons.JSBadge className="w-40 h-auto p-3" />, name: 'JavaScript' },
        { element: <Icons.ReactJSBadge className="w-40 h-auto p-3" />, name: 'React' },
        { element: <Icons.VueLogo className="w-40 h-auto p-3" />, name: 'Vue' },
        { element: <Icons.TailwindLogo className="w-40 h-auto p-3" />, name: 'Tailwind' },
      ]
    },
    { 
      title: 'Backend', 
      text: 'Experience with Node.js, Python, and scalable database architectures.',
      icons: [
        { element: <Icons.PhpLogo className="w-40 h-auto p-2" />, name: 'PHP' },
        { element: <Icons.NodeLogo className="w-40 h-auto p-2" />, name: 'Node.js' },
        { element: <Icons.CSharpLogo className="w-40 h-auto p-3" />, name: 'C#' },
        { element: <Icons.SqlDatabaseIcon className="w-40 h-auto p-3" />, name: 'SQL' },
        { element: <Icons.MySQLLogo className="w-40 h-auto p-3" />, name: 'MySQL' },
        { element: <Icons.LaravelLogo className="w-40 h-auto p-3" />, name: 'Laravel' },
        { element: <Icons.DotNetLogo className="w-40 h-auto p-3" />, name: '.NET' },
      ]
    },
    { 
      title: 'Others', 
      text: 'DevOps, CI/CD pipelines, and cloud infrastructure management.',
      icons: [
        { element: <Icons.FigmaLogo className="w-40 h-auto p-3" />, name: 'Figma' },
        { element: <Icons.GitLabLogo className="w-40 h-auto p-3" />, name: 'GitLab' },
        { element: <Icons.GitHubLogo className="w-40 h-auto p-3" />, name: 'GitHub' },
        { element: <Icons.MSOfficeLogo className="w-40 h-auto p-3" />, name: 'MS Office' },
        { element: <Icons.GoogleLogo className="w-40 h-auto p-3" />, name: 'Google' },
      ]
    },
  ];

  useEffect(() => {
    setHoveredIconTitle(sections[activeIndex].title);
  }, [activeIndex]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, clientHeight } = scrollContainerRef.current;
      const newIndex = Math.round(scrollTop / clientHeight);
      if (newIndex !== activeIndex) setActiveIndex(newIndex);
    }
  };

  const scrollToSection = (index) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({
      top: index * scrollContainerRef.current.clientHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col font-robotoCondensed overflow-hidden">

      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-4">
        {sections.map((_, index) => (
          <div key={index} onClick={() => scrollToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
              ${activeIndex === index ? 'bg-black scale-150' : 'bg-black/40 scale-100'}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none flex items-center px-16">
        <div className="w-full h-full relative flex flex-col items-center">

          <div key={`icons-${activeIndex}`} className="absolute flex flex-wrap justify-start top-20 left-10 animate-fade-scale pointer-events-auto">
            {sections[activeIndex].icons.map((iconObj, idx) => (
              <div key={idx} style={{ animationDelay: `${idx * 70}ms` }}
                className={`w-40 h-auto p-3 cursor-pointer transition-all duration-500
                  ${isTitleHovered ? 'grayscale-0 scale-110' : 'grayscale scale-95'}
                  hover:grayscale-0 hover:scale-125`}
                onMouseEnter={() => setHoveredIconTitle(iconObj.name)}
                onMouseLeave={() => setHoveredIconTitle(sections[activeIndex].title)}
              >
                {iconObj.element}
              </div>
            ))}
          </div>

          <div key={`title-${activeIndex}`} 
            className="absolute bottom-10 right-10 animate-fade-scale pointer-events-auto"
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.h3
                key={hoveredIconTitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[29vh] font-bold leading-none select-none cursor-default"
              >
                {hoveredIconTitle}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <button onClick={onClose} className="absolute right-4 top-4 z-50 text-xl opacity-70 hover:opacity-100 p-2 transition-opacity">✕</button>

      <div ref={scrollContainerRef} onScroll={handleScroll}
        className="absolute inset-0 z-20 overflow-y-auto overscroll-contain snap-y snap-mandatory scroll-smooth pointer-events-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {sections.map((_, index) => (
          <div key={index} className="w-full h-full snap-start pointer-events-auto" />
        ))}
      </div>
    </div>
  );
};

export default SkillsPopup;
