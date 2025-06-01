import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState("Finding someone to help...");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const textInterval = setInterval(() => {
      const texts = [
        "Finding someone to help...",
        "Connecting you with a caring person...",
        "Almost ready to chat...",
      ];
      setLoadingText((prev) => {
        const currentIndex = texts.indexOf(prev);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 1500);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #0A0D17 0%, #A9D7D1 30%, #1E3D3A 60%, #12131A 85%, #18312E 100%)",
      }}
    >
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            {loadingText}
            {dots}
          </h2>
          <p className="text-slate-300">
            This may take a moment. We're finding the perfect person to support
            you.
          </p>
        </div>

        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
