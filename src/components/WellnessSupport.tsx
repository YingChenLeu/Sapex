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

const WellnessSupport = () => {
  const { collapsed } = useSidebar();
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
        <Threads amplitude={1} distance={0} enableMouseInteraction={false} />
      </div>
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <div className="w-[400px] mr-[200px]">
          <FloatingDock
            items={[
              {
                title: "Build New Friendships",
                icon: <Handshake />,
                onClick: () => {
                  window.location.href = "/finding-match";
                },
              },
              {
                title: "Dealing with Loneliness",
                icon: <EyeOff />,
                onClick: () => {
                  window.location.href = "/finding-match";
                },
              },
              {
                title: "Healing from Heartbreak",
                icon: <HeartCrack />,
                onClick: () => {
                  window.location.href = "/finding-match";
                },
              },
              {
                title: "Burnout Recovery",
                icon: <Flame />,
                onClick: () => {
                  window.location.href = "/finding-match";
                },
              },
              {
                title: "Anxiety and Stress Support",
                icon: <Siren />,
                onClick: () => {
                  window.location.href = "/finding-match";
                },
              },
              {
                title: "New Student Guidance",
                icon: <UserRoundPlus />,
                onClick: () => {
                  window.location.href = "/finding-match";
                },
              },
              {
                title: "Study Habit Advice",
                icon: <SquareLibrary />,
                onClick: () => {
                  window.location.href = "/finding-match";
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default WellnessSupport;
