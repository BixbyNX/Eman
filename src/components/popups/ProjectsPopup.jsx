import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const projects = [
  {
    title: 'Orient Holdings',
    image: '/images/Program_Camille.jpg',
    description: 'Orient Holdings is our flagship project focusing on corporate solutions.',
  },
  {
    title: 'Messaging',
    image: '/images/profayl.jpg',
    description: 'A real-time messaging platform for team collaboration.',
  },
  {
    title: 'Inventory',
    image: '/images/propaylz.png',
    description: 'Inventory management system with automated tracking features.',
  },
  {
    title: 'Employee',
    image: '/images/Meee.png',
    description: 'Employee portal to manage HR and internal workflows.',
  },
];

const ProjectsPopup = ({ onClose }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [clickedProject, setClickedProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const closeBtnRef = useRef(null);
  const titleRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(closeBtnRef.current,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 1,
      }
    );

    gsap.fromTo(titleRefs.current,
      {
        x: 100, 
        autoAlpha: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
        onComplete: () => {
          setIsAnimating(false);
          gsap.set(titleRefs.current, { clearProps: "all" });
        },
      }
    );
  }, []);

  const handleClose = () => {
    setIsAnimating(true);

    gsap.killTweensOf(closeBtnRef.current);
    gsap.killTweensOf(titleRefs.current);

    const tl = gsap.timeline({
      onComplete: onClose, 
    });

    tl.to(closeBtnRef.current, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 0);

    tl.to(titleRefs.current, {
      x: 100,        
      autoAlpha: 0,  
      duration: 0.4,
      stagger: 0.1,  
      ease: 'power2.in',
    }, 0); 
  };

  return (
    <div className="relative w-full h-full flex font-robotoCondensed">
      <button ref={closeBtnRef} onClick={handleClose} className="absolute right-4 top-4 z-50 text-xl p-2" >✕</button>

      <div className="w-1/2 flex flex-col items-center justify-center pointer-events-none">
        {activeProject && (
          <img
            key={activeProject.image}
            src={activeProject.image}
            alt={activeProject.title}
            className={`max-w-[80%] max-h-[70%] object-contain transition-transform duration-700 animate-fade-scale
                        ${clickedProject?.title === activeProject.title ? '-translate-y-6 ' : 'translate-y-0'}`}
          />
        )}

        {clickedProject && clickedProject.title === activeProject?.title && (
          <p className="mt-4 text-center text-lg max-w-xs opacity-90 animate-fade-scale">
            {clickedProject.description}
          </p>
        )}
      </div>

      <div className="w-1/2 h-full overflow-y-auto snap-y snap-mandatory">
        <section className={`h-full flex flex-col items-end justify-center px-16 snap-start 
                      ${isAnimating ? 'pointer-events-none' : ''}`}>
          {projects.map((project, index) => (
            <h3 key={project.title} ref={(el) => (titleRefs.current[index] = el)}
              className={`project-title transition-transform duration-300 ease-out
                  ${
                    hoveredIndex === null
                      ? 'scale-100'
                      : hoveredIndex === index
                      ? 'scale-125'
                      : 'scale-90 opacity-30'
                  }
                `}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setActiveProject(project);
                setClickedProject(null);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setActiveProject(null);
              }}
              onClick={() => setClickedProject(project)}
            >
              {project.title}
            </h3>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProjectsPopup;