import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step = "intro" | "dropout" | "dropped" | "stayed" | "wise";

const CHASE_DURATION_MS = 20_000;
const FLEE_RADIUS = 160;
const FLEE_STRENGTH = 95;
const NO_BTN_W = 120;
const NO_BTN_H = 56;
const NO_BUTTON_SPRING = { type: "spring", stiffness: 220, damping: 24, mass: 0.7 } as const;

const FLOATERS = ["📚", "✏️", "📝", "🎓", "💀", "🧠", "📖", "☕", "😭", "🔥", "💯", "🤡"];

const NO_TAUNTS = [
  "no",
  "NOPE",
  "catch me",
  "lol",
  "try harder",
  "haha",
  "nuh uh",
  "stay in school",
  "AP Research",
  "MLA citations",
  "20 page paper",
  "you got this",
];

type ConfettiPiece = {
  id: number;
  x: number;
  emoji: string;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
};

const CONFETTI_EMOJIS = ["🎉", "🎊", "✨", "💥", "⭐", "🌟", "🎈", "🪅"];

function makeConfetti(count = 40): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
    delay: Math.random() * 0.4,
    duration: 1.6 + Math.random() * 1.4,
    drift: (Math.random() - 0.5) * 200,
    rotate: (Math.random() - 0.5) * 720,
  }));
}

export function EasterEgg() {
  const [step, setStep] = useState<Step>("intro");
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [isChasing, setIsChasing] = useState(false);
  const [tauntIdx, setTauntIdx] = useState(0);
  const [confetti, setConfetti] = useState<ConfettiPiece[] | null>(null);
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 });

  const arenaRef = useRef<HTMLDivElement>(null);
  const btnPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const lastTauntChangeAtRef = useRef(0);

  const reset = useCallback(() => {
    setStep("intro");
    setIsChasing(false);
    setSecondsLeft(20);
    setConfetti(null);
    setBtnPosition({ x: 0, y: 0 });
  }, []);

  const burstConfetti = useCallback(() => {
    setConfetti(makeConfetti(50));
    window.setTimeout(() => setConfetti(null), 3000);
  }, []);

  const clampPosition = useCallback((x: number, y: number) => {
    const arena = arenaRef.current;
    if (!arena) return { x, y };
    const maxX = Math.max(0, arena.clientWidth - NO_BTN_W);
    const maxY = Math.max(0, arena.clientHeight - NO_BTN_H);
    return {
      x: Math.min(maxX, Math.max(0, x)),
      y: Math.min(maxY, Math.max(0, y)),
    };
  }, []);

  const flee = useCallback(
    (clientX: number, clientY: number) => {
      const arena = arenaRef.current;
      if (!arena) return;
      const rect = arena.getBoundingClientRect();
      const cursorX = clientX - rect.left;
      const cursorY = clientY - rect.top;

      const centerX = btnPos.current.x + NO_BTN_W / 2;
      const centerY = btnPos.current.y + NO_BTN_H / 2;
      const dx = cursorX - centerX;
      const dy = cursorY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < FLEE_RADIUS && dist > 0) {
        const push = (FLEE_STRENGTH * (FLEE_RADIUS - dist)) / FLEE_RADIUS;
        const nx = btnPos.current.x - (dx / dist) * push;
        const ny = btnPos.current.y - (dy / dist) * push;
        const next = clampPosition(nx, ny);
        btnPos.current = next;
        setBtnPosition(next);
        const now = Date.now();
        if (now - lastTauntChangeAtRef.current >= 2000) {
          setTauntIdx((i) => (i + 1) % NO_TAUNTS.length);
          lastTauntChangeAtRef.current = now;
        }
      }
    },
    [clampPosition]
  );

  useEffect(() => {
    if (step !== "dropout") return;
    const arena = arenaRef.current;
    if (arena) {
      const startPos = {
        x: arena.clientWidth / 2 - NO_BTN_W / 2,
        y: arena.clientHeight / 2 - NO_BTN_H / 2,
      };
      btnPos.current = startPos;
      setBtnPosition(startPos);
    }
    setIsChasing(true);
    setSecondsLeft(20);
    setTauntIdx(0);
    lastTauntChangeAtRef.current = Date.now();
  }, [step]);

  useEffect(() => {
    if (!isChasing) return;

    const onMove = (e: MouseEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        flee(e.clientX, e.clientY);
        rafRef.current = null;
      });
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) flee(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const start = Date.now();
    const tick = window.setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((CHASE_DURATION_MS - (Date.now() - start)) / 1000)
      );
      setSecondsLeft(remaining);
      if (remaining === 0) setIsChasing(false);
    }, 150);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.clearInterval(tick);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isChasing, flee]);

  const floaters = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        emoji: FLOATERS[i % FLOATERS.length],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 24 + Math.random() * 48,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * -10,
        drift: (Math.random() - 0.5) * 80,
        lift: 26 + Math.random() * 30,
      })),
    []
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white [font-family:'Comic_Sans_MS','Comic_Sans',cursive,system-ui]">
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "linear-gradient(135deg, #fde047 0%, #fb7185 50%, #38bdf8 100%)",
            "linear-gradient(135deg, #fb7185 0%, #38bdf8 50%, #a78bfa 100%)",
            "linear-gradient(135deg, #38bdf8 0%, #a78bfa 50%, #4ade80 100%)",
            "linear-gradient(135deg, #a78bfa 0%, #4ade80 50%, #fde047 100%)",
            "linear-gradient(135deg, #fde047 0%, #fb7185 50%, #38bdf8 100%)",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floaters.map((f) => (
          <motion.span
            key={f.id}
            className="absolute select-none opacity-70"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              fontSize: f.size,
            }}
            animate={{
              y: [0, -f.lift, 0],
              x: [0, f.drift, 0],
              rotate: [0, 12, 0],
            }}
            transition={{
              duration: f.duration,
              delay: f.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {f.emoji}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          {step === "intro" && <IntroScreen key="intro" onAnswer={(yes) => setStep(yes ? "dropout" : "wise")} />}

          {step === "dropout" && (
            <DropoutScreen
              key="dropout"
              arenaRef={arenaRef}
              btnPos={btnPosition}
              isChasing={isChasing}
              secondsLeft={secondsLeft}
              taunt={NO_TAUNTS[tauntIdx]}
              onDropOut={() => {
                burstConfetti();
                setStep("dropped");
              }}
              onCaughtNo={() => {
                burstConfetti();
                setStep("stayed");
              }}
              onFleeFromHover={flee}
            />
          )}

          {step === "wise" && (
            <EndScreen
              key="wise"
              emoji="🧘"
              headline="Smart human."
              subline="You declined willingly. No paper. No tears. Walk in peace."
              cta="Walk in peace"
              onReset={reset}
            />
          )}

          {step === "dropped" && (
            <EndScreen
              key="dropped"
              emoji="🕊️"
              headline="You did it."
              subline="You dropped AP Research. You feel sunlight again. Birds are singing. Your weekend is yours."
              cta="Touch grass"
              onReset={reset}
            />
          )}

          {step === "stayed" && (
            <EndScreen
              key="stayed"
              emoji="📚"
              headline="You caught the No."
              subline="Respect. Now go cite 47 sources in MLA 9. The paper writes itself. (It does not.)"
              cta="Back to suffering"
              onReset={reset}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {confetti && (
          <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
            {confetti.map((c) => (
              <motion.span
                key={c.id}
                className="absolute text-3xl"
                style={{ left: `${c.x}%`, top: -40 }}
                initial={{ y: -40, opacity: 1, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 60,
                  x: c.drift,
                  rotate: c.rotate,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: c.duration,
                  delay: c.delay,
                  ease: "easeIn",
                }}
              >
                {c.emoji}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IntroScreen({ onAnswer }: { onAnswer: (yes: boolean) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="flex flex-col items-center gap-8 text-center"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl drop-shadow-[0_4px_0_rgba(0,0,0,0.35)] sm:text-8xl"
      >
        🧪📖
      </motion.div>

      <motion.h1
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="max-w-3xl text-4xl font-black leading-tight drop-shadow-[3px_3px_0_rgba(0,0,0,0.25)] sm:text-6xl"
      >
        So you wanna take{" "}
        <span className="inline-block rotate-[-2deg] rounded-2xl bg-black px-3 py-1 text-yellow-300 shadow-[6px_6px_0_rgba(0,0,0,0.6)]">
          AP Research?
        </span>
      </motion.h1>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <ChunkyButton
          color="bg-green-400"
          onClick={() => onAnswer(true)}
          ariaLabel="Yes"
        >
          YES 🎓
        </ChunkyButton>
        <ChunkyButton
          color="bg-rose-400"
          onClick={() => onAnswer(false)}
          ariaLabel="No"
        >
          NO 🏃‍♂️
        </ChunkyButton>
      </div>
    </motion.div>
  );
}

type DropoutScreenProps = {
  arenaRef: RefObject<HTMLDivElement | null>;
  btnPos: { x: number; y: number };
  isChasing: boolean;
  secondsLeft: number;
  taunt: string;
  onDropOut: () => void;
  onCaughtNo: () => void;
  onFleeFromHover: (x: number, y: number) => void;
};

function DropoutScreen({
  arenaRef,
  btnPos,
  isChasing,
  secondsLeft,
  taunt,
  onDropOut,
  onCaughtNo,
  onFleeFromHover,
}: DropoutScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="flex w-full max-w-4xl flex-col items-center gap-6"
    >
      <motion.h1
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-center text-4xl font-black leading-tight drop-shadow-[3px_3px_0_rgba(0,0,0,0.25)] sm:text-6xl"
      >
        Wait... should I{" "}
        <span className="inline-block rotate-[2deg] rounded-2xl bg-black px-3 py-1 text-pink-300 shadow-[6px_6px_0_rgba(0,0,0,0.6)]">
          drop out?
        </span>
      </motion.h1>

      <div className="flex items-center gap-3 rounded-full bg-black/85 px-5 py-2 text-sm font-bold text-white shadow-[4px_4px_0_rgba(0,0,0,0.4)] sm:text-base">
        <span className="inline-block size-2 animate-pulse rounded-full bg-red-500" />
        {isChasing ? (
          <>
            <span>NO is running</span>
            <span className="rounded-md bg-yellow-400/30 px-2 py-0.5 text-white">
              {secondsLeft}s
            </span>
          </>
        ) : (
          <>
            <span>NO got tired</span>
            <span>🥵</span>
          </>
        )}
      </div>

      <div className="grid w-full gap-6 sm:grid-cols-[1fr_2fr] sm:items-center">
        <motion.button
          type="button"
          onClick={onDropOut}
          whileHover={{ scale: 1.06, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "10px 10px 0 rgba(0,0,0,0.6)",
              "14px 14px 0 rgba(0,0,0,0.6)",
              "10px 10px 0 rgba(0,0,0,0.6)",
            ],
          }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="rounded-3xl border-4 border-black bg-emerald-600 px-8 py-10 text-3xl font-black leading-tight text-white sm:text-4xl"
        >
          YES
          <div className="mt-1 text-base font-bold text-white/80 sm:text-lg">
            drop it. set me free.
          </div>
        </motion.button>

        <div
          ref={arenaRef}
          className="relative h-[320px] w-full overflow-hidden rounded-3xl border-4 border-dashed border-black bg-white/30 backdrop-blur-sm sm:h-[360px]"
        >
          <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/80 px-2 py-1 text-xs font-bold text-white">
            try to click "No"
          </div>

          <motion.button
            type="button"
            className="absolute flex items-center justify-center rounded-2xl border-4 border-black bg-rose-700 font-black text-white shadow-[6px_6px_0_rgba(0,0,0,0.55)]"
            style={{
              width: NO_BTN_W,
              height: NO_BTN_H,
              left: btnPos.x,
              top: btnPos.y,
              touchAction: "none",
              cursor: isChasing ? "none" : "pointer",
            }}
            animate={{ scale: 1 }}
            transition={NO_BUTTON_SPRING}
            onMouseEnter={(e) => isChasing && onFleeFromHover(e.clientX, e.clientY)}
            onTouchStart={(e) => {
              if (!isChasing) return;
              const t = e.touches[0];
              if (t) onFleeFromHover(t.clientX, t.clientY);
            }}
            onClick={onCaughtNo}
          >
            {isChasing ? taunt : "ok fine"}
          </motion.button>
        </div>
      </div>

      <p className="text-center text-sm font-bold text-white/80 sm:text-base">
        {isChasing
          ? "the No button is shy. you cannot catch it. (or can you???)"
          : "the No gave up. click it. accept your AP Research fate."}
      </p>

      <div className="w-full max-w-3xl rounded-2xl border-2 border-white/30 bg-black/30 p-4 text-left text-sm font-semibold text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.25)] sm:text-base">
        <p className="mb-2 text-white">AP Research survival advice:</p>
        <ul className="space-y-1 text-white/90">
          <li>• Don&apos;t make Ms CC mad otherwise she&apos;ll grade you down on your POD.</li>
          <li>• Don&apos;t choose a common topic or you fried (you fried anyway).</li>
          <li>• Start your citations early because panic at 2AM is not a methodology.</li>
        </ul>
      </div>
    </motion.div>
  );
}

function EndScreen({
  emoji,
  headline,
  subline,
  cta,
  onReset,
}: {
  emoji: string;
  headline: string;
  subline: string;
  cta: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      className="flex max-w-2xl flex-col items-center gap-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-8xl drop-shadow-[0_6px_0_rgba(0,0,0,0.35)] sm:text-9xl"
      >
        {emoji}
      </motion.div>
      <h1 className="text-4xl font-black leading-tight drop-shadow-[3px_3px_0_rgba(0,0,0,0.25)] sm:text-6xl">
        {headline}
      </h1>
      <p className="max-w-xl text-lg font-bold text-white/90 sm:text-xl">{subline}</p>
      <ChunkyButton color="bg-yellow-300" onClick={onReset}>
        {cta}
      </ChunkyButton>
    </motion.div>
  );
}

function ChunkyButton({
  children,
  color,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  color: string;
  onClick: () => void;
  ariaLabel?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.05, rotate: -1.5 }}
      whileTap={{ scale: 0.94, rotate: 1 }}
      transition={NO_BUTTON_SPRING}
      className={`rounded-2xl border-4 border-black ${color} px-8 py-4 text-2xl font-black text-white shadow-[8px_8px_0_rgba(0,0,0,0.55)] transition-shadow hover:shadow-[10px_10px_0_rgba(0,0,0,0.6)] sm:text-3xl`}
    >
      {children}
    </motion.button>
  );
}

export function EasterEggPage() {
  return <EasterEgg />;
}

export default EasterEgg;
