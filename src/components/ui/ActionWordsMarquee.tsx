import { motion } from "framer-motion";

const WORDS = [
  "focus",
  "connect",
  "grow",
  "learn",
  "study",
  "support",
  "chat",
] as const;

// Discord-style action verb marquee. Renders an infinitely scrolling horizontal
// strip of lowercase words, each prefixed with a small brand-colored dot.
export default function ActionWordsMarquee({
  durationSeconds = 38,
  reverse = false,
  className = "",
}: {
  durationSeconds?: number;
  reverse?: boolean;
  className?: string;
}) {
  // Duplicate the list so the loop is seamless when x goes 0 -> -50%.
  const loop = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden border-y border-white/5 bg-[#0A0D17] py-5 sm:py-7 ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.ul
        className="flex w-max items-center gap-10 sm:gap-14 will-change-transform"
        animate={
          reverse
            ? { x: ["-50%", "0%"] }
            : { x: ["0%", "-50%"] }
        }
        transition={{
          duration: durationSeconds,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {loop.map((word, i) => (
          <li
            key={`${word}-${i}`}
            className="flex shrink-0 items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-syncopate font-semibold tracking-wide text-[#D8DEDE]/85 lowercase"
          >
            <span className="inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#A8D3CC] shadow-[0_0_12px_rgba(168,211,204,0.65)]" />
            <span>{word}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
