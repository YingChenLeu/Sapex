import { motion } from "framer-motion";

type SceneCursorProps = {
  x: number;
  y: number;
  visible: boolean;
  clickKey: number;
};

/** Full-viewport decorative cursor. Tip sits on (x, y) as percentages. */
export default function SceneCursor({
  x,
  y,
  visible,
  clickKey,
}: SceneCursorProps) {
  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      style={{ width: 22, height: 28 }}
      initial={false}
      animate={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.85,
      }}
      transition={{
        left: { type: "spring", stiffness: 110, damping: 22, mass: 0.7 },
        top: { type: "spring", stiffness: 110, damping: 22, mass: 0.7 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      }}
    >
      <svg
        width="22"
        height="28"
        viewBox="0 0 14 18"
        className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)]"
        aria-hidden
      >
        <path
          d="M1 1 L1 14 L4.2 11 L6.7 16.5 L9 15.5 L6.5 10 L11 10 Z"
          fill="white"
          stroke="#202124"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
      <motion.span
        key={clickKey}
        className="absolute rounded-full border-2 border-white"
        style={{
          left: -10,
          top: -6,
          width: 32,
          height: 32,
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0, scale: 0.35 }}
        animate={
          clickKey > 0
            ? { opacity: [0, 0.9, 0], scale: [0.35, 1.35, 1.75] }
            : { opacity: 0, scale: 0.35 }
        }
        transition={{ duration: 0.5, times: [0, 0.38, 1], ease: "easeOut" }}
      />
    </motion.div>
  );
}
