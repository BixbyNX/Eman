import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import SkillsPopup from './components/popups/SkillsPopup';
import ProjectsPopup from "./components/popups/ProjectsPopup";
import ExperiencesPopup from "./components/popups/ExperiencesPopup";
import EducationPopup from "./components/popups/EducationPopup";
import CertificationsPopup from "./components/popups/CertificationsPopup";
import ContactPopup from "./components/popups/ContactPopup";

import ScrollEaseProvider from './components/ScrollEaseProvider';
import './App.css';
import './styles/tailwind.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SECTIONS_DATA = {
  "SKILLS": {
    component: SkillsPopup,
    animConfig: { 
      from: { autoAlpha: 0 },
      to: { autoAlpha: 1, ease: "power1.out" },
      positionClass: "centered-popup"
    }
  },
  "PROJECTS": {
    component: ProjectsPopup,
    animConfig: { 
      from: { x: "100%", autoAlpha: 0 }, 
      to: { x: "0%", autoAlpha: 1, ease: "power3.out", duration: 1},
      positionClass: 'centered-popup'
    }
  },
  "EXPERIENCES": {
    component: ExperiencesPopup,
    animConfig: { 
      from: { autoAlpha: 0 },
      to: { autoAlpha: 1, ease: "power1.out" },
      positionClass: "centered-popup"
    }
  },
  "EDUCATION": {
    component: EducationPopup,
    animConfig: { 
      from: { autoAlpha: 0 },
      to: { autoAlpha: 1, ease: "power1.out" },
      positionClass: "centered-popup"
    }
  },
  "CERTIFICATIONS": {
    component: CertificationsPopup,
    animConfig: { 
      from: { autoAlpha: 0 },
      to: { autoAlpha: 1, ease: "power1.out" },
      positionClass: "centered-popup"
    }
  },
  "CONTACT ME": {
    component: ContactPopup,
    animConfig: { 
      from: { autoAlpha: 0 },
      to: { autoAlpha: 1, ease: "power1.out" },
      positionClass: "centered-popup"
    }
  },
  "DEFAULT": {
    text: "Content coming soon...",
    animConfig: { 
      from: { scale: 0.8, autoAlpha: 0 }, 
      to: { scale: 1, autoAlpha: 1 },
      positionClass: 'centered-popup'
    }
  }
};

const PopupContainer = ({ activeKey, onClose }) => {
  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  const config = SECTIONS_DATA[activeKey] || SECTIONS_DATA["DEFAULT"];
  const defaults = SECTIONS_DATA["DEFAULT"];
  
  const SpecificComponent = config.component || defaults.component || (({content}) => <div className="bg-white p-10 rounded">{content}</div>);
  const anim = config.animConfig || defaults.animConfig;
  const posClass = anim.positionClass || "centered-popup";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { autoAlpha: 1, duration: 0.3 })
        .fromTo(contentRef.current, anim.from, anim.to, "<0.1");
    }, containerRef);
    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [activeKey, anim]);

  const handleClose = () => {
    ScrollTrigger.getAll().forEach(st => st.disable(false));
    gsap.killTweensOf(window);

    const tl = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.getAll().forEach(st => st.enable());
        onClose();
      }
    });

    tl.to(contentRef.current, {
        ...anim.from,
        duration: 0.3,
        ease: "power2.in"
      })
      .to(backdropRef.current, {
        autoAlpha: 0,
        duration: 0.2
      }, "<0.1");
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 p-0 flex" onClick={handleClose}>
      <div ref={backdropRef} className="popup-backdrop backdrop-blur-xl absolute inset-0 opacity-0"></div>
      <div ref={contentRef}
        className={`popup-content-box absolute z-10 opacity-0 ${posClass} w-[95vw] h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <SpecificComponent title={activeKey} content={config.text} onClose={handleClose} />
      </div>
    </div>
  );
};

const playEntranceAnimation = (timeline, container, words) => {
  // Reset the white background container
  timeline.set(container, { xPercent: 100, backgroundColor: "#f8fafc", autoAlpha: 1 });
  
  timeline.set(words, { 
    x: 100, 
    autoAlpha: 0,
    scale: 1,           // Reset size
    filter: "blur(0px)", // Remove blur
    opacity: 1,         // Reset opacity (before the autoAlpha transition)
    fontWeight: 300,    // Reset to base weight
    zIndex: 0           // Ensure no word stays on top
  });

  // Slide container and words in
  timeline.to(container, { xPercent: 0, duration: 2, ease: "power3.out" })
          .to(words, { x: 0, autoAlpha: 1, stagger: 0.13, duration: 1.5, ease: "power2.out" }, "<0.2");
};

function App() {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightImageRef = useRef(null);
  const closeBtnRef = useRef(null);
  const aboutRef = useRef(null);

  const [selectedWord, setSelectedWord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- INTRO ANIMATION ---
  useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const words = gsap.utils.toArray(".hover-word");
    
    gsap.set(textRef.current, { xPercent: 100, autoAlpha: 1 });
    gsap.set(words, { x: 100, autoAlpha: 0 });

    const tl = gsap.timeline({ delay: 1.5, onComplete: () => setIsLoading(false) });
    
    playEntranceAnimation(tl, textRef.current, words);
  }, textRef);
  return () => ctx.revert();
}, []);

  // --- SCROLL TRIGGERS ---
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=150 top",
          end: "top+=400 top",
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        ease: "power2.out",
        scrollTrigger: { trigger: document.body, start: "top+=150 top", end: "top+=400 top", scrub: true }
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf(window);
    };
  }, []);

  useEffect(() => {
    if (selectedWord === "EMAN JUNIO") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedWord]);


  useLayoutEffect(() => {
    if (selectedWord === "EMAN JUNIO" && leftTextRef.current && aboutRef.current && rightImageRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        tl.fromTo(leftTextRef.current, 
          { x: 150, autoAlpha: 0 }, 
          { x: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
        )
        .fromTo(rightImageRef.current, 
          { x: 200, autoAlpha: 0 }, 
          { x: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }, 
          "<0.15"
        )
        .fromTo(aboutRef.current, 
          { y: 200, autoAlpha: 0 }, 
          { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }, 
          "<0.15"
        );
        tl.fromTo(closeBtnRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
      });
      return () => ctx.revert();
    }
  }, [selectedWord]); // Runs whenever selectedWord changes

  // --- HOVER EFFECTS ---
  const handleMouseEnter = (e) => {
    if (isLoading || selectedWord) return;
    const target = e.currentTarget;
    const words = textRef.current.querySelectorAll(".hover-word");

    gsap.context(() => {
      gsap.to(target, {
        opacity: 1,
        fontWeight: 400,
        scale: 1.1,
        transformOrigin: "right center",
        filter: "blur(0px)",
        zIndex: 10,
        duration: 0.3,
        overwrite: true,
      });
      target.classList.remove("hover-word-bold");
      
      words.forEach((word) => {
        if (word !== target) {
          gsap.to(word, {
            opacity: 0.1,
            fontWeight: 300,
            scale: 1,
            transformOrigin: "right center",
            filter: "blur(5px)",
            zIndex: 1,
            duration: 0.3,
            overwrite: true,
          });
        }
      });
    }, textRef);
  };

  const handleMouseLeave = () => {
    if (isLoading || selectedWord) return;
    const words = textRef.current.querySelectorAll(".hover-word");
    gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        fontWeight: 300,
        scale: 1,
        transformOrigin: "right center",
        filter: "blur(0px)",
        zIndex: 0,
        duration: 0.3,
        overwrite: true,
      });
    });
    words.forEach(w => w.classList.remove("hover-word-bold"));
  };

  // --- CLICK: EXIT MENU, ENTER PROFILE ---
  const handleWordClick = (word) => {
    if (isLoading || selectedWord) return;
    setIsLoading(true);

    if (word === "EMAN JUNIO") {
      const words = gsap.utils.toArray(".hover-word");
      
      const tl = gsap.timeline({
        onComplete: () => {
          // This state change triggers the useLayoutEffect below
          setSelectedWord(word);
          setIsLoading(false);
        }
      });

      // Exit Menu Animation
      tl.to(words, {
        x: "-120%", 
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power2.inOut"
      })
      .to(textRef.current, {
        backgroundColor: "#000000",
        duration: 1,
        ease: "power2.inOut"
      }, "<");
    } else {
      setSelectedWord(word);
      setIsLoading(false);
    }
  };

  // --- CLOSE: FADE DOWN PROFILE, BLUR, ENTER MENU ---
  const handlePopupClose = () => {
    const lastActive = selectedWord;
    setIsLoading(true);

    if (lastActive === "EMAN JUNIO") {
      const words = textRef.current.querySelectorAll(".hover-word");
      const tl = gsap.timeline({
        onComplete: () => {
          setSelectedWord(null);
          setIsLoading(false);
          // Clean up any remaining inline styles just in case
          gsap.set(words, { clearProps: "all" });
        }
      });

      // 1. Fade Down Profile
      tl.to(closeBtnRef.current, {
        autoAlpha: 0,
        duration: 0.2, // Very fast fade for the button
        ease: "power2.out"
      }, 0) // Starts at time 0
      .to(aboutRef.current, {
        y: 290,
        autoAlpha: 0,
        duration: 1.2, // Very fast fade for the button
        ease: "power3.out"
      }, 0)
      .to([leftTextRef.current, rightImageRef.current,], {
        x: -90,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.in"
      }, 0);

      // 2. Transition (Optional Blur)
      tl.to(".App", { duration: 0.4, ease: "power1.inOut" })
        .set(".App", { filter: "blur(0px)" }); 

      // 3. Trigger Entrance (which now contains the reset)
      playEntranceAnimation(tl, textRef.current, words);

    } else {
      // Standard Popup Close (Skills, etc.)
      const words = textRef.current.querySelectorAll(".hover-word");
      setSelectedWord(null);
      gsap.to(words, {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        fontWeight: 300,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          setIsLoading(false);
          gsap.set(words, { clearProps: "all" });
        }
      });
    }
  };

  const WORD_LIST = ["EMAN JUNIO", "SKILLS", "PROJECTS", "EXPERIENCES", "EDUCATION", "CERTIFICATIONS", "CONTACT ME"];

  return (
    <>
      {selectedWord === "EMAN JUNIO" && (
        <>
          <button ref={closeBtnRef} onClick={handlePopupClose}
            className="fixed top-14 right-14 z-[9999] pointer-events-auto text-xl px-2 hover:opacity-50 transition-opacity">✕</button>

          <h2 ref={aboutRef} className="fixed bottom-0 left-0 text-[50vh] font-robotoCondensed font-light tracking-wide text-white leading-none mb-[-0.13em] pointer-events-none z-10">ABOUT</h2>
        </>
      )}

      <div className="App h-screen w-screen overflow-hidden relative bg-black">

        <div ref={textRef} className="flex flex-col fixed inset-0 z-0 w-full h-full items-end justify-center pointer-events-auto bg-slate-50">
          {WORD_LIST.map((text, index) => (
            <div key={index} className={`hover-word text-center font-robotoCondensed font-light tracking-widest text-[10vw] leading-none m-[-0.13em] cursor-pointer transition-colors ${
                index === 0
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-[#bd7d62] via-[#f7ebdb] via-[#f4d6b4] via-[#d8b186] via-[#d49270] to-[#bd7d62] animate-shine bg-[length:200%_200%]"
                  : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleWordClick(text)}
            >
              {text}
            </div>
          ))}
        </div>

        {/*PROFILE LAYER*/}
        {selectedWord === "EMAN JUNIO" && (
          <div className="fixed inset-0 z-10 pointer-events-none">

            <div className="absolute inset-0 overflow-y-auto pointer-events-auto">
              <div className="min-h-full w-full flex items-center justify-between p-5">

                <div ref={leftTextRef} className="max-w-2xl opacity-0 ml-10 text-left">
                  <p className="text-xl font-robotoCondensed opacity-80 mb-8 text-white">
                    I build secure, responsive, and data-driven applications by combining
                    technical precision with a disciplined workflow. My expertise ranges
                    from architecting desktop messaging systems with end-to-end encryption
                    to developing modern web platforms, utilizing a core stack of C#,
                    JavaScript, Laravel, .NET, and SQL.
                  </p>
                </div>

                <div ref={rightImageRef} className="fixed top-5 right-5 z-40 w-[420px] h-[630px] opacity-0 overflow-hidden rounded-bl-[64px] flex-shrink-0">
                  <img src="/images/propaylz.png" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
                </div>

              </div>
            </div>
          </div>
        )}

        {selectedWord && selectedWord !== "EMAN JUNIO" && (
          <PopupContainer activeKey={selectedWord} onClose={handlePopupClose} />
        )}

      </div>
    </>
  );

}

export default App;