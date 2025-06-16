import { useState } from "react";
import { useSidebar } from "./SideBar";
import {
  Handshake,
  EyeOff,
  HeartCrack,
  Flame,
  Siren,
  UserRoundPlus,
  SquareLibrary,
} from "lucide-react";
import { FloatingDock } from "./ui/dock";
import Threads from "./ui/threadAnimation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const WellnessSupport = () => {
  const { collapsed } = useSidebar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Helper to handle click and create esupport doc and subcollection
  const handleSupportClick = async (type: string) => {
    if (isSubmitting) return; // prevent multiple submissions
    setIsSubmitting(true); // lock submission

    const uid = localStorage.getItem("uid");
    if (!uid) {
      window.location.href = "/user-profile";
      return;
    }
    try {
      // Create esupport doc
      const docRef = await addDoc(collection(db, "esupport"), {
        seeker_uid: uid,
        helper_uid: null,
        predicted: null,
        actual: null,
        type: type,
      });
      // Create messages subcollection with a placeholder message
      await addDoc(collection(db, "esupport", docRef.id, "messages"), {
        from: "system",
        text: "Conversation started.",
        timestamp: new Date(),
      });
      window.location.href = "/finding-match";
    } catch (err) {
      console.error("Failed to create support doc:", err);
      setIsSubmitting(false); // unlock on failure
    }
  };

  return (
    <div
      className={`bg-[#0A0D17] pt-[30px] min-h-screen ${
        collapsed ? "pl-[130px]" : "pl-[280px]"
      } transition-all duration-300 flex justify-center items-center`}
    >
      <div className="absolute top-[40px] w-full text-center z-20 mr-[200px]">
        <h1 className="text-4xl font-bold text-white">Sapex Wellness Support</h1>
        <p className="text-lg text-gray-300 mt-2">
          Get wellness support from your peers
        </p>
        <p className="text-sm text-red-400 mt-1">
          Do not proceed if you have not done the{" "}
          <a href="/user-profile" className="underline text-red-300 hover:text-red-200">
            personality test under your profile page
          </a>
          .
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Threads amplitude={2} distance={0} enableMouseInteraction={false} />
      </div>
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <div className="w-[400px] mr-[200px]">
          <FloatingDock
            items={[
              {
                title: "Build New Friendships",
                icon: <Handshake />,
                onClick: () => handleSupportClick("friendship"),
              },
              {
                title: "Dealing with Loneliness",
                icon: <EyeOff />,
                onClick: () => handleSupportClick("loneliness"),
              },
              {
                title: "Healing from Heartbreak",
                icon: <HeartCrack />,
                onClick: () => handleSupportClick("heartbreak"),
              },
              {
                title: "Burnout Recovery",
                icon: <Flame />,
                onClick: () => handleSupportClick("burnout"),
              },
              {
                title: "Anxiety and Stress Support",
                icon: <Siren />,
                onClick: () => handleSupportClick("stress"),
              },
              {
                title: "New Student Guidance",
                icon: <UserRoundPlus />,
                onClick: () => handleSupportClick("guidance"),
              },
              {
                title: "Study Habit Advice",
                icon: <SquareLibrary />,
                onClick: () => handleSupportClick("study"),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default WellnessSupport;
