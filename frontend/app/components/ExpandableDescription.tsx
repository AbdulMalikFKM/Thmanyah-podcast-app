"use client";
// 1. Import useLayoutEffect
import { useState, useRef, useLayoutEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  text: string;
}

export default function ExpandableDescription({ text }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 2. Change useEffect to useLayoutEffect
  useLayoutEffect(() => {
    const checkHeight = () => {
      if (contentRef.current) {
        // We check if the content is taller than 3 lines (approx 80-85px)
        const isTallEnough = contentRef.current.scrollHeight > 85;
        setShowButton(isTallEnough);
      }
    };

    // Run the check
    checkHeight();

    // Pro-Tip: Add a resize listener to handle window stretching
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [text]); // Re-run if the text changes

  return (
    <div className="flex flex-col items-start w-full group">
      <div
        ref={contentRef}
        className={`w-full text-right transition-all duration-300 ease-in-out text-sm leading-relaxed ${
          isExpanded
            ? "text-white/80"
            : "text-white/50 line-clamp-3 overflow-hidden"
        }`}
        style={{
          display: isExpanded ? "block" : "-webkit-box",
          WebkitLineClamp: isExpanded ? "unset" : 3,
          WebkitBoxOrient: "vertical",
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-500/80 hover:text-orange-400 transition-all cursor-pointer bg-orange-500/5 px-3 py-1 rounded-full border border-orange-500/10 hover:border-orange-500/30"
        >
          {isExpanded ? (
            <>
              {" "}
              عرض أقل <ChevronUp size={14} />{" "}
            </>
          ) : (
            <>
              {" "}
              اقرأ المزيد <ChevronDown size={14} />{" "}
            </>
          )}
        </button>
      )}
    </div>
  );
}
