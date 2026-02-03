import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpenText, Eclipse, Codesandbox } from "lucide-react";
import PrismaticBurst from "./ui/PrismaticBurst.tsx";
import { useSidebar } from "./SideBar";

const ORBIT_RADIUS = 160;
const ORBIT_DURATION = 24;

const orbitalItems = [
  {
    to: "/helpboard",
    label: "Academic Hub",
    shortLabel: "Academics",
    icon: BookOpenText,
    color: "#7CDCBD",
    angle: 0,
  },
  {
    to: "/wellness-support",
    label: "Wellness Support",
    shortLabel: "Wellness",
    icon: Eclipse,
    color: "#A78BFA",
    angle: 120,
  },
  {
    to: "/origins-lab",
    label: "Origins Lab",
    shortLabel: "Origins",
    icon: Codesandbox,
    color: "#5FBFAA",
    angle: 240,
  },
];

const Main = () => {
  const { collapsed } = useSidebar();

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-all duration-300 ${
        collapsed ? "pl-[100px]" : "pl-[280px]"
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#0A0D17]" />

      {/* Logo-based ambient background */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 40% 35%, rgba(120, 220, 190, 0.35), transparent 60%),
            radial-gradient(circle at 60% 60%, rgba(90, 190, 170, 0.25), transparent 65%)
          `,
        }}
      />

      {/* Prismatic burst background */}
      <div className="absolute inset-0 pointer-events-none">
        <PrismaticBurst
          animationType="rotate3d"
          intensity={1.6}
          speed={0.45}
          distort={0}
          paused={false}
          offset={{ x: collapsed ? -120 : -160, y: 0 }}
          hoverDampness={0.25}
          rayCount={0}
          mixBlendMode="lighten"
          colors={["#7CDCBD", "#5FBFAA", "#6600cc", "#0A0D17", "#E6FFFA"]}
        />
      </div>

      {/* Content wrapper: center orbital in the middle of the screen */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div
          className={`pt-[40px] transition-all duration-300 shrink-0 ${
            collapsed ? "px-6" : "px-10"
          }`}
        >
          <h1 className="text-3xl font-semibold text-white font-syncopate">
            Sapex Control Center
          </h1>
          <p className="mt-2 text-gray-400 max-w-xl">
            Your central access point. Choose a destination to orbit into.
          </p>
        </div>

        {/* Circular orbital - centered, shifted slightly up and left */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div
            className="relative w-[380px] h-[380px] flex items-center justify-center"
            style={{ transform: "translate(-12%, -10%)" }}
          >
            {/* Orbital ring */}
            <motion.div
              className="absolute rounded-full border border-white/10"
              style={{
                width: ORBIT_RADIUS * 2,
                height: ORBIT_RADIUS * 2,
                left: "50%",
                top: "50%",
                marginLeft: -ORBIT_RADIUS,
                marginTop: -ORBIT_RADIUS,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: ORBIT_DURATION,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Second ring (counter-rotate, slower) */}
            <motion.div
              className="absolute rounded-full border border-[#7CDCBD]/20"
              style={{
                width: ORBIT_RADIUS * 2 + 24,
                height: ORBIT_RADIUS * 2 + 24,
                left: "50%",
                top: "50%",
                marginLeft: -(ORBIT_RADIUS + 12),
                marginTop: -(ORBIT_RADIUS + 12),
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: ORBIT_DURATION * 1.4,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Orbiting nodes wrapper (ferris wheel) - nodes stay straight via counter-rotate */}
            <motion.div
              className="absolute inset-0"
              style={{ width: "100%", height: "100%" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: ORBIT_DURATION,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {orbitalItems.map((item, i) => {
                const Icon = item.icon;
                const rad = (item.angle * Math.PI) / 180;
                const x = Math.cos(rad) * ORBIT_RADIUS;
                const y = Math.sin(rad) * ORBIT_RADIUS;

                return (
                  <motion.div
                    key={item.to}
                    className="absolute z-20"
                    style={{
                      left: `calc(50% + ${x - 44}px)`,
                      top: `calc(50% + ${y - 44}px)`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: -360,
                    }}
                    transition={{
                      delay: 0.15 * (i + 1),
                      duration: 0.4,
                      ease: "easeOut",
                      rotate: {
                        duration: ORBIT_DURATION,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  >
                    <Link to={item.to}>
                      <motion.div
                        className="w-[88px] h-[88px] rounded-2xl bg-[#12162A] border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer overflow-hidden"
                        style={{
                          borderColor: `${item.color}40`,
                          boxShadow: `0 0 24px ${item.color}15`,
                        }}
                        whileHover={{
                          scale: 1.12,
                          borderColor: item.color,
                          boxShadow: `0 0 32px ${item.color}35`,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon
                          className="w-8 h-8 shrink-0"
                          style={{ color: item.color }}
                        />
                        <span className="text-[10px] font-medium text-white/90 max-w-[72px] truncate px-1">
                          {collapsed ? item.shortLabel : item.label}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
