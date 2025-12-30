import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollEaseProvider({
  children,
  duration = 1.2,
  ease = "power3.out",
}) {
  const scrollY = useRef(window.scrollY);
  const isAnimating = useRef(false);

  // --- Helper: detect native scroll zone ---
  const hasNativeScrollParent = (el) => {
    let node = el;

    while (node && node !== document.body) {
      if (node.dataset?.scrollZone === "native") return true;

      const style = window.getComputedStyle(node);
      const canScroll =
        /(auto|scroll)/.test(style.overflowY) &&
        node.scrollHeight > node.clientHeight;

      if (canScroll) return true;

      node = node.parentElement;
    }
    return false;
  };

  useEffect(() => {
    const onWheel = (e) => {
      // ✅ Allow native scroll inside popups / scroll zones
      if (hasNativeScrollParent(e.target)) return;

      e.preventDefault();

      if (isAnimating.current) return;

      isAnimating.current = true;

      scrollY.current += e.deltaY;

      scrollY.current = gsap.utils.clamp(
        0,
        document.body.scrollHeight - window.innerHeight,
        scrollY.current
      );

      gsap.to(window, {
        scrollTo: scrollY.current,
        duration,
        ease,
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    };

    const onTouchMove = (e) => {
      if (hasNativeScrollParent(e.target)) return;
      e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [duration, ease]);

  return children;
}
