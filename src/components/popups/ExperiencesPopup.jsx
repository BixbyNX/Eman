import React, { useState } from 'react'; // Added { useState } here
import '../../App.css';

const experiences = [
  {
    role: 'Freelance Developer',
    company: '',
    date: 'June 2024 - Present',
    bullets: [
      'Developed and deployed responsive, cross-browser compatible websites using HTML, CSS, and JavaScript.',
      'Conducted performance, SEO, and security assessments to ensure compliance with industry standards.'
    ]
  },
  {
    role: 'Software Developer',
    company: 'Armed Forces of the Philippines',
    date: 'May 2024 - Nov 2025',
    bullets: [
      'Designed, developed, and maintained desktop and web applications with database and server-side integration.',
      'Planned and built UI/UX with seamless front-end and back-end integration, optimizing data flow.'
    ]
  },
  {
    role: 'Software Developer Intern',
    company: 'Armed Forces of the Philippines',
    date: 'Feb 2024 - May 2024',
    bullets: [
      'Participated in code reviews and implemented feedback to improve maintainability.',
      'Collaborated on designing and implementing RESTful APIs.',
      'Implemented cybersecurity measures to enhance application protection.'
    ]
  }
];

const ExperiencesPopup = ({ onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Trigger exit animations before calling the actual onClose prop
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 1000); 
  };

  const LINE_DURATION = 1.5; 
  const CARD_DELAY_BASE = LINE_DURATION; 
  const DOT_DELAY_BASE = LINE_DURATION + 0.3;

  return (
    <div className={`relative w-full h-full p-10 overflow-y-auto font-robotoCondensed ${isExiting ? 'pointer-events-none' : ''}`}>
      {/* Close button - now calls handleClose */}
      <button onClick={handleClose} className="fixed right-4 top-4 z-50 text-xl opacity-70 hover:opacity-100 p-2 transition-opacity">✕</button>

      <div className="relative max-w-6xl mx-auto">
        {/* Center line with dynamic exit animation */}
        <div className={`absolute left-1/2 bottom-0 w-[2px] bg-gray-200 -translate-x-1/2 origin-bottom 
          ${isExiting ? 'animate-shrink-line' : 'animate-grow-line'}`} 
        />

        <div className="flex flex-col gap-16">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            
            // Reverse delay logic for exit: bottom items leave first
            const exitDelay = (experiences.length - 1 - index) * 0.1;
            const cardDelay = isExiting ? `${exitDelay}s` : `${CARD_DELAY_BASE + (index * 0.2)}s`;
            const dotDelay = isExiting ? `${exitDelay}s` : `${DOT_DELAY_BASE + (index * 0.2)}s`;

            const cardClass = isExiting ? 'animate-fade-out-down' : 'animate-fade-in';
            const dotClass = isExiting ? 'animate-pop-out' : 'animate-pop-in';

            return (
              <div key={index} className="relative flex w-full">
                {isLeft && (
                  <div 
                    className={`w-1/2 pr-12 text-right ${cardClass}`}
                    style={{ animationDelay: cardDelay }}
                  >
                    <ExperienceCard {...exp} />
                  </div>
                )}

                <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div 
                    className={`w-4 h-4 rounded-full bg-black ${dotClass}`}
                    style={{ animationDelay: dotDelay }}
                  />
                </div>

                {!isLeft && (
                  <div 
                    className={`w-1/2 pl-12 ml-auto text-left ${cardClass}`}
                    style={{ animationDelay: cardDelay }}
                  >
                    <ExperienceCard {...exp} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ExperienceCard = ({ role, company, date, bullets }) => (
  <div className="p-6">
    <h3 className="text-3xl font-bold">{role}</h3>
    {company && <p className="text-xl text-gray-600">{company}</p>}
    <p className="text-lg text-gray-500 mt-1">{date}</p>

    <ul className="mt-4 space-y-2 text-xl text-gray-700">
      {bullets.map((item, i) => (
        <li key={i} className="leading-relaxed">
          • {item}
        </li>
      ))}
    </ul>
  </div>
);

export default ExperiencesPopup;