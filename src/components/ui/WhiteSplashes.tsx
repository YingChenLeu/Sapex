import { useLocation } from "react-router-dom";

const APP_PREFIXES = [
  "/main",
  "/helpboard",
  "/study-rooms",
  "/origins-lab",
  "/wellness-support",
  "/contributions",
  "/user-profile",
  "/personality-quiz",
  "/finding-match",
  "/post-problem",
  "/admin",
];

function isAppRoute(pathname: string) {
  if (pathname.startsWith("/chat/")) return true;
  return APP_PREFIXES.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

const MARKETING_WASH = `
  radial-gradient(ellipse 120% 75% at 50% -18%, rgba(255,255,255,0.48) 0%, rgba(168,211,204,0.34) 34%, transparent 64%),
  radial-gradient(ellipse 80% 60% at -5% 20%, rgba(255,255,255,0.26) 0%, rgba(168,211,204,0.38) 42%, transparent 72%),
  radial-gradient(ellipse 70% 55% at 105% 8%, rgba(255,255,255,0.24) 0%, rgba(124,220,189,0.22) 38%, transparent 68%),
  radial-gradient(ellipse 90% 50% at 60% 110%, rgba(45,79,83,0.42) 0%, rgba(168,211,204,0.20) 45%, transparent 72%),
  linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(168,211,204,0.08) 22%, transparent 48%)
`;

const APP_WASH = `
  radial-gradient(ellipse 34% 32% at 100% 0%, rgba(255,255,255,0.28) 0%, rgba(168,211,204,0.20) 42%, transparent 70%),
  radial-gradient(ellipse 30% 34% at 100% 100%, rgba(255,255,255,0.16) 0%, rgba(168,211,204,0.22) 48%, transparent 72%),
  radial-gradient(ellipse 26% 36% at 0% 100%, rgba(168,211,204,0.18) 0%, transparent 68%)
`;

export default function WhiteSplashes() {
  const { pathname } = useLocation();
  const inApp = isAppRoute(pathname);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background: inApp ? APP_WASH : MARKETING_WASH,
          ...(inApp
            ? {
                maskImage:
                  "radial-gradient(ellipse 72% 78% at 38% 36%, transparent 0%, transparent 58%, black 86%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 72% 78% at 38% 36%, transparent 0%, transparent 58%, black 86%)",
              }
            : {}),
        }}
      />
    </div>
  );
}
