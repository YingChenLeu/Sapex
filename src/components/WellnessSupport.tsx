import { useState } from "react";
import { useSidebar } from "./SideBar";
import {
  Handshake,
  HeartCrack,
  Flame,
  Siren,
  UserRoundPlus,
  SquareLibrary,
  Users,
  Info,
  Loader2,
} from "lucide-react";
import { FloatingDock } from "./ui/dock";
import Threads from "./ui/threadAnimation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "./ui/card";

const iconClass = "size-5 text-neutral-300";

const SUPPORT_OPTIONS = [
  {
    title: "Build New Friendships",
    icon: <Handshake className={iconClass} />,
    type: "friendship",
  },
  {
    title: "Dealing with Loneliness",
    icon: <Users className={iconClass} />,
    type: "loneliness",
  },
  {
    title: "Healing from Heartbreak",
    icon: <HeartCrack className={iconClass} />,
    type: "heartbreak",
  },
  {
    title: "Burnout Recovery",
    icon: <Flame className={iconClass} />,
    type: "burnout",
  },
  {
    title: "Anxiety and Stress Support",
    icon: <Siren className={iconClass} />,
    type: "stress",
  },
  {
    title: "New Student Guidance",
    icon: <UserRoundPlus className={iconClass} />,
    type: "guidance",
  },
  {
    title: "Study Habit Advice",
    icon: <SquareLibrary className={iconClass} />,
    type: "study",
  },
] as const;

const WellnessSupport = () => {
  const { collapsed } = useSidebar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleSupportClick = async (type: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const uid = localStorage.getItem("uid");
    if (!uid) {
      window.location.href = "/user-profile";
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "esupport"), {
        seeker_uid: uid,
        helper_uid: null,
        predicted: null,
        actual: null,
        type: type,
      });
      await addDoc(collection(db, "esupport", docRef.id, "messages"), {
        from: "system",
        text: "Conversation started.",
        timestamp: new Date(),
      });
      window.location.href = `/finding-match?docId=${docRef.id}`;
    } catch (err) {
      console.error("Failed to create support doc:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0A0D17] pt-8 pb-20 ${
        collapsed ? "pl-[130px]" : "pl-[280px]"
      } transition-all duration-300`}
    >
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Threads amplitude={2} distance={0} enableMouseInteraction={false} />
      </div>

      <div className="relative z-10 mr-auto max-w-3xl pl-8 pr-6 flex flex-col items-start gap-10">
        {/* Hero */}
        <header className="space-y-3 text-left">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-white tracking-tight">
            Wellness Support
          </h1>
          <p className="text-lg text-neutral-400 max-w-md">
            Choose a topic and we’ll match you
            with someone who can listen and support.
          </p>
        </header>

        {/* Notice card */}
        <Card className="w-full border-amber-500/30 bg-amber-950/20 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="size-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-100/90">
              <span className="font-medium text-amber-200">
                Before you start:
              </span>{" "}
              Please complete the{" "}
              <a
                href="/user-profile"
                className="underline text-amber-300 hover:text-amber-200 font-medium"
              >
                personality test on your profile
              </a>{" "}
              so we can match you with the right peer.
            </div>
          </CardContent>
        </Card>

        {/* Dock section */}
        <section className="w-full flex flex-col items-start gap-6">
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
            Choose a topic
          </p>
          <div className="w-full flex justify-start rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md px-6 py-5 shadow-xl">
            <FloatingDock
              items={SUPPORT_OPTIONS.map(({ title, icon, type }) => ({
                title,
                icon,
                onClick: () => handleSupportClick(type),
              }))}
              desktopClassName="max-w-full"
            />
          </div>
          {isSubmitting && (
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <Loader2 className="size-4 animate-spin" />
              <span>Finding your match…</span>
            </div>
          )}
        </section>

        {/* Data disclaimer */}
        <footer className="w-full pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="text-sm text-neutral-500 hover:text-neutral-400 underline underline-offset-2 transition-colors"
          >
            Data & privacy disclaimer
          </button>
          {showDisclaimer && (
            <p className="mt-2 text-sm text-neutral-400">
              All data is stored and can be accessed.
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default WellnessSupport;
