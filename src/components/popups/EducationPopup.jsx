import React, { useState } from 'react'; 
import '../../App.css';

const education = [
  {
    title: 'Bachelor of Science in Information Technology',
    school: 'STI College Cubao',
    date: '',
    details: []
  },
  {
    title: 'Science, Technology, Engineering, & Mathematics',
    school: 'STI College Cubao – Senior High School',
    date: '',
    details: ['With honors']
  }
];

const EducationPopup = ({ onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

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
      <button onClick={handleClose} className="fixed right-4 top-4 z-50 text-xl opacity-70 hover:opacity-100 p-2 transition-opacity">✕</button>

      <div className="relative max-w-6xl mx-auto min-h-full pb-20">
        <div className={`absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 origin-bottom 
            ${isExiting ? 'animate-shrink-line' : 'animate-grow-lineE'}`} 
          style={{ transform: 'translateX(-50%)' }} 
        />

        <div className="flex flex-col gap-16">
          {education.map((edu, index) => {
            const isLeft = index % 2 === 0;

            const exitDelay = (education.length - 1 - index) * 0.1;
            const cardDelay = isExiting ? `${exitDelay}s` : `${CARD_DELAY_BASE + (index * 0.2)}s`;
            const dotDelay = isExiting ? `${exitDelay}s` : `${DOT_DELAY_BASE + (index * 0.2)}s`;

            const cardClass = isExiting ? 'animate-fade-out-down' : 'animate-fade-in';
            const dotClass = isExiting ? 'animate-pop-out' : 'animate-pop-in';

            return (
              <div key={index} className="relative flex w-full">
                {isLeft && (
                  <div className={`w-1/2 pr-12 text-right ${cardClass}`} style={{ animationDelay: cardDelay }} >
                    <EducationCard {...edu} />
                  </div>
                )}

                <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full bg-black ${dotClass}`} style={{ animationDelay: dotDelay }} />
                </div>

                {!isLeft && (
                  <div className={`w-1/2 pl-12 ml-auto text-left ${cardClass}`} style={{ animationDelay: cardDelay }}>
                    <EducationCard {...edu} />
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

const EducationCard = ({ title, school, date, details }) => (
  <div className="p-6">
    <h3 className="text-3xl font-bold leading-tight">{title}</h3>
    <p className="text-xl text-gray-600 mt-1">{school}</p>
    {date && <p className="text-lg text-gray-500 mt-1">{date}</p>}

    {details.length > 0 && (
      <ul className="mt-3 space-y-1 text-xl text-gray-700">
        {details.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    )}
  </div>
);

export default EducationPopup;