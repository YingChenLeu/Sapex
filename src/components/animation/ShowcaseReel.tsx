import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MetaBalls from "@/components/ui/MetaBalls";
import FloatingLines from "@/components/ui/FloatingLines";
import SoftAurora from "@/components/ui/SoftAurora";
import MemoriesBento from "@/components/ui/MemoriesBento";
import ActionWordsMarquee from "@/components/ui/ActionWordsMarquee";
import CircularText from "@/components/CircularText";
import {
  AcademicHubDemo,
  WellnessDemo,
  StudyRoomsDemo,
  OriginsLabDemo,
  RateYourChanceDemo,
} from "@/components/ui/FeatureShowcase";
import firebaseLogo from "@/assets/landingPageAssets/devLogos/firebase.png";
import fastAPILogo from "@/assets/landingPageAssets/devLogos/fastAPI.png";
import vercelLogo from "@/assets/landingPageAssets/devLogos/vercel.png";
import deapLearningLogo from "@/assets/landingPageAssets/devLogos/deapLearning.png";
import reactLogo from "@/assets/landingPageAssets/devLogos/react.png";
import { PlaybackSpeedProvider } from "@/components/ui/FeatureShowcase/playbackSpeed";

const SIMPLE_LOGO = "/simple-logo.png";

const BRIDGE = ["B", "R", "I", "D", "G", "E"] as const;

const MADE_USING = [
  { name: "React", src: reactLogo },
  { name: "DEAP", src: deapLearningLogo },
  { name: "FastAPI", src: fastAPILogo },
  { name: "Firebase", src: firebaseLogo },
  { name: "Vercel", src: vercelLogo },
] as const;

const KEYWORDS = [
  { text: "community", x: "8%", y: "14%", size: "text-3xl sm:text-5xl", delay: 0 },
  { text: "peer help", x: "72%", y: "18%", size: "text-2xl sm:text-4xl", delay: 0.12 },
  { text: "study rooms", x: "6%", y: "72%", size: "text-2xl sm:text-4xl", delay: 0.2 },
  { text: "wellness", x: "74%", y: "70%", size: "text-3xl sm:text-5xl", delay: 0.08 },
  { text: "safe", x: "4%", y: "42%", size: "text-xl sm:text-3xl", delay: 0.28 },
  { text: "together", x: "78%", y: "44%", size: "text-xl sm:text-3xl", delay: 0.16 },
  { text: "academic", x: "38%", y: "8%", size: "text-xl sm:text-2xl", delay: 0.24 },
  { text: "matching", x: "58%", y: "10%", size: "text-xl sm:text-2xl", delay: 0.32 },
] as const;

const FEATURES = [
  {
    id: "academic",
    eyebrow: "Academic Center",
    keyword: "LEARN",
    title: "Ask anything. Get help from your school in minutes.",
    copy: undefined as string | undefined,
    Demo: AcademicHubDemo,
  },
  {
    id: "wellness",
    eyebrow: "Wellness Support",
    keyword: "MATCH",
    title: "An experimental matching system.",
    copy: "Still in the lab — pairing you with a peer whose temperament actually fits.",
    Demo: WellnessDemo,
  },
  {
    id: "rooms",
    eyebrow: "Study Rooms",
    keyword: "FOCUS",
    title: "Drop into a room and grind together.",
    copy: undefined as string | undefined,
    Demo: StudyRoomsDemo,
  },
  {
    id: "origins",
    eyebrow: "Origins Lab",
    keyword: "BUILD",
    title: "Showcase projects and brainstorm new ones.",
    copy: undefined as string | undefined,
    Demo: OriginsLabDemo,
  },
  {
    id: "chance",
    eyebrow: "Rate Your Chance",
    keyword: "BELONG",
    title: "An honest read on your dream school.",
    copy: undefined as string | undefined,
    Demo: RateYourChanceDemo,
  },
] as const;

type Phase =
  | "hero"
  | "keywords"
  | "bridge"
  | "mosaic"
  | "feature"
  | "outro"
  | "fade";

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function HeroOrb({ compact, live }: { compact: boolean; live: boolean }) {
  return (
    <motion.div
      className="relative w-[340px] h-[340px]"
      animate={{ scale: compact ? 0.62 : 1 }}
      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
    >
      {live && (
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <MetaBalls
          color="#2D4F53"
          cursorBallColor="#abd7dc"
          cursorBallSize={2}
          ballCount={19}
          animationSize={30}
          enableMouseInteraction={false}
          enableTransparency
          hoverSmoothness={0.05}
          clumpFactor={1}
          speed={1.35}
        />
      </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="origin-center scale-[0.92]">
          <CircularText
            text="SAPEX BUILDS COMMUNITIES "
            onHover="goBonkers"
            spinDuration={16}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ShowcaseReel({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [phase, setPhase] = useState<Phase>("hero");
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await sleep(4200);
      if (cancelled) return;
      setPhase("keywords");

      await sleep(3800);
      if (cancelled) return;
      setPhase("bridge");

      await sleep(2800);
      if (cancelled) return;
      setPhase("mosaic");

      await sleep(4800);
      if (cancelled) return;
      setPhase("feature");

      for (let i = 0; i < FEATURES.length; i++) {
        if (cancelled) return;
        setFeatureIndex(i);
        await sleep(4800);
      }

      if (cancelled) return;
      setPhase("outro");

      await sleep(5600);
      if (cancelled) return;
      setPhase("fade");

      await sleep(1700);
      if (cancelled) return;
      onCompleteRef.current();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const showLines =
    phase === "hero" || phase === "keywords" || phase === "bridge";
  const showOrb =
    phase === "hero" ||
    phase === "keywords" ||
    phase === "bridge" ||
    phase === "mosaic";
  const compactOrb = phase === "mosaic" || phase === "bridge";
  const showMarquee = phase === "keywords" || phase === "bridge";
  const showMosaic = phase === "mosaic";
  const feature = FEATURES[featureIndex];
  const FeatureDemo = feature.Demo;

  return (
    <PlaybackSpeedProvider speed={2}>
    <motion.div
      className="absolute inset-0 overflow-hidden bg-[#161A24] text-[#F0F2F2] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showLines && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.9),rgba(0,0,0,0.4),transparent)]">
          <FloatingLines
            linesGradient={["#45f56e", "#A8D3CC", "#2D4F53"]}
            animationSpeed={1.35}
            interactive={false}
            bendStrength={-15}
            parallax={false}
            mixBlendMode="screen"
          />
        </div>
      )}

      <AnimatePresence>
        {showOrb && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{
              opacity: 1,
              scale: phase === "mosaic" ? 0.55 : 1,
              y: phase === "mosaic" ? -120 : 0,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.img
                src={SIMPLE_LOGO}
                alt=""
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.h1
                className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-[#F0F2F2] to-[#A8D3CC] bg-clip-text text-transparent font-syncopate"
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: phase === "mosaic" ? 0 : 1,
                  y: 0,
                }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Sapex Connect
              </motion.h1>
            </div>

            <HeroOrb compact={compactOrb} live={phase !== "mosaic"} />

            <motion.h2
              className="mt-6 text-center text-xl sm:text-3xl font-bold max-w-xl px-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{
                opacity: phase === "hero" || phase === "keywords" ? 1 : 0,
                y: 0,
              }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Connect People, Build{" "}
              <span className="text-[#A8D3CC]">Communities</span>
            </motion.h2>

            <AnimatePresence>
              {(phase === "hero" || phase === "keywords") && (
                <motion.div
                  className="mt-8 flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, delay: 0.18 }}
                >
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#A8D3CC]/80 font-syncopate">
                    Made using
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    {MADE_USING.map((tech, i) => (
                      <motion.div
                        key={tech.name}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: 0.22 + i * 0.05 }}
                      >
                        <img
                          src={tech.src}
                          alt=""
                          className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                        />
                        <span className="text-xs sm:text-sm text-[#F0F2F2]/80">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "keywords" && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {KEYWORDS.map((k) => (
              <motion.span
                key={k.text}
                className={`absolute font-syncopate font-semibold text-[#A8D3CC]/90 ${k.size}`}
                style={{ left: k.x, top: k.y }}
                initial={{ opacity: 0, y: 18, scale: 0.86 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, delay: k.delay }}
              >
                {k.text}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "bridge" && (
          <motion.div
            className="absolute inset-0 z-20 flex items-end justify-center pb-[18%]"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={{
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              hidden: {},
            }}
          >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {BRIDGE.map((letter) => (
                <motion.span
                  key={letter}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl border border-[#A8D3CC]/40 bg-[#1E2430]/80 flex items-center justify-center text-xl sm:text-2xl font-bold text-[#A8D3CC] font-syncopate"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMarquee && (
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <ActionWordsMarquee durationSeconds={20} />
        </div>
      )}

      <AnimatePresence>
        {showMosaic && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute bottom-[3%] left-0 right-0 flex items-end justify-center overflow-hidden px-2">
              <div className="flex items-end justify-center gap-2 sm:gap-3 origin-bottom scale-[0.52] sm:scale-[0.72] lg:scale-100">
              {FEATURES.map((f, i) => {
                const Demo = f.Demo;
                return (
                  <motion.div
                    key={f.id}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.82, y: 36 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.12 + i * 0.1 }}
                  >
                    <div className="h-[200px] w-[150px] sm:h-[230px] sm:w-[175px] overflow-hidden">
                      <div className="origin-top-left scale-[0.42] sm:scale-[0.48] w-[360px]">
                        <Demo />
                      </div>
                    </div>
                    <p className="mt-1 text-center text-[9px] sm:text-[11px] uppercase tracking-[0.16em] text-[#A8D3CC] font-syncopate">
                      {f.eyebrow}
                    </p>
                  </motion.div>
                );
              })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === "feature" && feature && (
          <motion.div
            key={feature.id}
            className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-10"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.span
              className="pointer-events-none absolute font-syncopate font-bold uppercase text-[18vw] leading-none text-white/[0.045] select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {feature.keyword}
            </motion.span>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center max-w-6xl w-full">
              <div className="max-w-xl">
                <p className="text-[#A8D3CC] font-medium tracking-wider text-xs uppercase mb-3">
                  {feature.eyebrow}
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {feature.title}
                </h3>
                {feature.copy && (
                  <p className="mt-4 text-base sm:text-lg text-[#F0F2F2]/80 leading-relaxed">
                    {feature.copy}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center">
                <FeatureDemo />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(phase === "outro" || phase === "fade") && (
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <MemoriesBento durationScale={1.8} />
            <div className="pointer-events-none absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black_0%,transparent_85%)]">
              <SoftAurora
                color1="#A8D3CC"
                color2="#2D4F53"
                brightness={0.65}
                speed={0.7}
                scale={1.5}
                enableMouseInteraction={false}
              />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <motion.h2
                className="font-syncopate font-bold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,7vw,5.5rem)] bg-gradient-to-b from-[#F0F2F2] via-[#A8D3CC] to-[#2D4F53] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
              >
                You found us.
              </motion.h2>
              <motion.h2
                className="font-syncopate font-bold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,7vw,5.5rem)] bg-gradient-to-b from-[#A8D3CC] to-[#F0F2F2] bg-clip-text text-transparent mt-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.28 }}
              >
                Now find your people.
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none absolute inset-0 z-50 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "fade" ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.div>
    </PlaybackSpeedProvider>
  );
}
