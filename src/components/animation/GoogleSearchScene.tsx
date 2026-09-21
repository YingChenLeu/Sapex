import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  ChevronRight,
  Grid3X3,
  Mic,
  MoreVertical,
  Search,
} from "lucide-react";
import SceneCursor from "./SceneCursor";
import { GoogleG, GoogleWordmark } from "./googleMark";

const SIMPLE_LOGO = "/simple-logo.png";
const QUERY = "sapexconnect.com";
const SNIPPET =
  "Sapex Connect is a student collaboration platform with study rooms, peer academic help, and an experimental matching system. Join your school community to ask questions, learn together, ...";
const SHORT_SNIPPET =
  "Sapex Connect is a student collaboration platform with study ...";

const SUGGESTIONS = [
  "sapexconnect.com",
  "sapex connect",
  "sapex connect login",
  "sapex connect study rooms",
] as const;

function centerPct(el: HTMLElement | null) {
  if (!el) return { x: 50, y: 50 };
  const r = el.getBoundingClientRect();
  return {
    x: ((r.left + r.width * 0.45) / window.innerWidth) * 100,
    y: ((r.top + r.height * 0.45) / window.innerHeight) * 100,
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function Favicon() {
  return (
    <div className="w-7 h-7 rounded-full bg-[#3c4043] flex items-center justify-center overflow-hidden shrink-0">
      <img src={SIMPLE_LOGO} alt="" className="w-5 h-5 object-contain" />
    </div>
  );
}

const EXTRA_RESULTS = [
  {
    url: "https://www.sapexconnect.com/login",
    title: "Sign in to Sapex Connect",
    snippet:
      "Log in with your school Google account to join study rooms, the Academic Center, and Wellness Support.",
  },
  {
    url: "https://www.sapexconnect.com/community",
    title: "Communities – Bring Sapex to your school",
    snippet:
      "Browse school communities already on Sapex, or request access for your campus.",
  },
] as const;

export default function GoogleSearchScene({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const searchRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [view, setView] = useState<"home" | "results">("home");
  const [typed, setTyped] = useState("");
  const [focused, setFocused] = useState(false);
  const [hoveredTitle, setHoveredTitle] = useState(false);
  const [cursor, setCursor] = useState({
    x: 78,
    y: 72,
    visible: false,
  });
  const [clickKey, setClickKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const click = () => {
      if (cancelled) return;
      setClickKey((k) => k + 1);
    };

    const moveTo = (el: HTMLElement | null, fallback: { x: number; y: number }) => {
      if (cancelled) return;
      setCursor((c) => ({ ...c, ...(el ? centerPct(el) : fallback) }));
    };

    (async () => {
      await sleep(450);
      if (cancelled) return;
      setCursor({ x: 76, y: 68, visible: true });

      await sleep(550);
      if (cancelled) return;
      moveTo(searchRef.current, { x: 50, y: 46 });

      await sleep(750);
      if (cancelled) return;
      click();
      setFocused(true);

      await sleep(280);
      for (let i = 1; i <= QUERY.length; i++) {
        if (cancelled) return;
        setTyped(QUERY.slice(0, i));
        await sleep(68);
      }

      await sleep(380);
      if (cancelled) return;
      moveTo(submitRef.current, { x: 44, y: 58 });

      await sleep(620);
      if (cancelled) return;
      click();

      await sleep(220);
      if (cancelled) return;
      setView("results");
      setFocused(true);

      await sleep(900);
      if (cancelled) return;
      moveTo(titleRef.current, { x: 32, y: 38 });

      await sleep(850);
      if (cancelled) return;
      setHoveredTitle(true);

      await sleep(380);
      if (cancelled) return;
      click();

      await sleep(420);
      if (cancelled) return;
      onCompleteRef.current();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const showSuggestions = view === "home" && focused && typed.length >= 3;
  const caret = focused && (view === "home" ? typed.length < QUERY.length : false);

  const searchBar = (
    <div
      ref={view === "home" ? searchRef : undefined}
      className={`flex items-center gap-3 w-full h-12 px-4 bg-[#303134] ${
        showSuggestions
          ? "rounded-t-3xl border border-[#5f6368] border-b-0"
          : "rounded-full border border-[#5f6368]"
      }`}
      style={{
        boxShadow: focused && !showSuggestions ? "0 1px 6px 0 rgba(32,33,36,0.28)" : undefined,
      }}
    >
      {view === "results" && (
        <Search className="w-4 h-4 text-[#9aa0a6] shrink-0" strokeWidth={2} />
      )}
      <div className="flex-1 min-w-0 text-[16px] text-[#e8eaed] truncate">
        {typed ? (
          <span>
            {typed}
            {caret && (
              <span className="inline-block w-[1px] h-[1.05em] ml-px align-middle bg-[#e8eaed] animate-pulse" />
            )}
          </span>
        ) : focused ? (
          <span className="inline-block w-[1px] h-[1.05em] align-middle bg-[#e8eaed] animate-pulse" />
        ) : null}
      </div>
      <Mic className="w-[18px] h-[18px] text-[#8ab4f8] shrink-0" />
      <Camera className="w-[18px] h-[18px] text-[#8ab4f8] shrink-0" />
    </div>
  );

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        background: "#202124",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#e8eaed",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.45 }}
      aria-hidden
    >
      {view === "home" ? (
        <div className="flex flex-col min-h-full">
          <div className="flex items-center justify-end gap-4 px-5 pt-4 text-[13px]">
            <span className="text-[#e8eaed]/90">Gmail</span>
            <span className="text-[#e8eaed]/90">Images</span>
            <Grid3X3 className="w-5 h-5 text-[#e8eaed]/80" />
            <span className="h-9 px-4 rounded-md bg-[#8ab4f8] text-[#202124] text-[14px] font-medium flex items-center">
              Sign in
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 -mt-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <GoogleWordmark size={92} />
            </motion.div>
            <div className="mt-8 w-full max-w-[584px] relative">
              {searchBar}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    className="absolute left-0 right-0 top-12 rounded-b-3xl border border-[#5f6368] border-t-0 bg-[#303134] pb-2 overflow-hidden z-10"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="h-px bg-[#5f6368]/80 mx-4 mb-1" />
                    {SUGGESTIONS.map((s) => (
                        <div
                          key={s}
                          className="flex items-center gap-3 px-4 py-2 text-[15px]"
                        >
                          <Search className="w-4 h-4 text-[#9aa0a6] shrink-0" />
                          <span>
                            <span className="font-medium text-[#e8eaed]">
                              {s.slice(0, typed.length)}
                            </span>
                            <span className="text-[#9aa0a6]">
                              {s.slice(typed.length)}
                            </span>
                          </span>
                        </div>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <button
                ref={submitRef}
                type="button"
                className="h-9 px-4 rounded-md bg-[#303134] text-[14px] text-[#e8eaed] border border-[#3c4043]"
              >
                Google Search
              </button>
              <button
                type="button"
                className="h-9 px-4 rounded-md bg-[#303134] text-[14px] text-[#e8eaed] border border-[#3c4043]"
              >
                I&apos;m Feeling Lucky
              </button>
            </div>
            <p className="mt-7 text-[13px] text-[#9aa0a6]">
              Google offered in:{" "}
              <span className="text-[#8ab4f8]">English</span>
            </p>
          </div>

          <div className="bg-[#171717] text-[14px] text-[#9aa0a6]">
            <div className="flex flex-wrap items-center justify-between gap-3 px-8 py-3 border-t border-[#3c4043]">
              <div className="flex gap-6">
                <span>About</span>
                <span>Advertising</span>
                <span>Business</span>
                <span className="hidden sm:inline">How Search works</span>
              </div>
              <div className="flex gap-6">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Settings</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-full flex flex-col">
          <div className="flex items-center gap-6 px-4 sm:px-8 lg:px-16 pt-5 pb-3 border-b border-[#3c4043]">
            <div className="hidden sm:block shrink-0">
              <GoogleWordmark size={32} />
            </div>
            <div className="sm:hidden shrink-0">
              <GoogleG className="w-7 h-7" />
            </div>
            <div className="w-full max-w-[692px]">{searchBar}</div>
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <Grid3X3 className="w-5 h-5 text-[#e8eaed]/80" />
              <span className="h-8 px-3 rounded-md bg-[#8ab4f8] text-[#202124] text-[13px] font-medium flex items-center">
                Sign in
              </span>
            </div>
          </div>
          <div className="flex gap-6 px-4 sm:px-8 lg:px-[180px] py-3 text-[14px] text-[#9aa0a6]">
            <span className="text-[#8ab4f8] border-b-2 border-[#8ab4f8] pb-2 -mb-3 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              All
            </span>
            <span className="pb-2">Images</span>
            <span className="pb-2 hidden sm:inline">News</span>
            <span className="pb-2 hidden sm:inline">Videos</span>
            <span className="pb-2 hidden sm:inline">Maps</span>
          </div>

          <div className="px-4 sm:px-8 lg:px-[180px] pt-4 pb-16 max-w-[980px] flex-1">
            <p className="text-[13px] text-[#9aa0a6] mb-4">
              About 1,840 results (0.28 seconds)
            </p>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-1">
                <Favicon />
                <div className="min-w-0">
                  <div className="text-[14px] text-[#e8eaed] leading-tight">
                    sapexconnect.com
                  </div>
                  <div className="flex items-center gap-1 text-[12px] text-[#9aa0a6]">
                    <span>https://www.sapexconnect.com</span>
                    <MoreVertical className="w-3.5 h-3.5 ml-1 text-[#9aa0a6]" />
                  </div>
                </div>
              </div>

              <div
                ref={titleRef}
                className="text-[20px] sm:text-[22px] leading-snug mt-1 cursor-pointer"
                style={{
                  color: hoveredTitle ? "#aecbfa" : "#8ab4f8",
                  textDecoration: hoveredTitle ? "underline" : "none",
                }}
              >
                Sapex Connect – Student Collaboration Platform
              </div>
              <p className="text-[14px] text-[#bdc1c6] mt-1 leading-relaxed max-w-[652px]">
                {SNIPPET}
              </p>

              <div className="mt-3 max-w-[652px] border-t border-[#3c4043]">
                {[
                  { label: "For Schools", body: SHORT_SNIPPET },
                  { label: "FAQ", body: SHORT_SNIPPET },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 py-3 border-b border-[#3c4043]"
                  >
                    <div className="min-w-0">
                      <div className="text-[16px] text-[#e8eaed]">{row.label}</div>
                      <div className="text-[14px] text-[#bdc1c6] truncate">
                        {row.body}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#e8eaed] shrink-0" />
                  </div>
                ))}
              </div>

              <div className="mt-3 text-[14px] text-[#e8eaed]">
                More results from sapexconnect.com »
              </div>
            </motion.div>

            {EXTRA_RESULTS.map((item, i) => (
              <motion.div
                key={item.url}
                className="mt-8"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.08 + i * 0.06 }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <Favicon />
                  <div>
                    <div className="text-[14px] text-[#e8eaed]">sapexconnect.com</div>
                    <div className="text-[12px] text-[#9aa0a6]">{item.url}</div>
                  </div>
                </div>
                <div className="text-[20px] text-[#8ab4f8] leading-snug">
                  {item.title}
                </div>
                <p className="text-[14px] text-[#bdc1c6] mt-1 max-w-[652px]">
                  {item.snippet}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <SceneCursor
        x={cursor.x}
        y={cursor.y}
        visible={cursor.visible}
        clickKey={clickKey}
      />
    </motion.div>
  );
}
