import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, UserRound } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiDiscord } from "react-icons/si";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { FaApple } from "react-icons/fa";
import { auth, provider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // at the top



const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      if (userEmail) {
        localStorage.setItem("email", userEmail);
        localStorage.setItem("photo", result.user.photoURL || "");
        localStorage.setItem("name", result.user.displayName || "");
        console.log("Signed in as:", userEmail);
        navigate("/helpboard");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#112327] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl relative bg-[#A8D3CC]/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Sliding Panel Background (Optional, for style) */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-700 ease-in-out z-10"
          style={{
            transform: isLogin ? "translateX(0)" : "translateX(100%)",
            background: "linear-gradient(135deg, #2D4F53 0%, #1A1F2C 100%)",
            borderRadius: "0 0 250px 0",
          }}
        />

        {/* Form Container */}
        <div className="relative min-h-[500px]">
          {/* Login Form */}
          <div
            className={`absolute top-0 left-0 w-full px-8 transition-all duration-700 ease-in-out transform ${
              isLogin
                ? "translate-x-0 z-20 opacity-100"
                : "-translate-x-full z-10 opacity-0"
            }`}
          >
            <div className="text-[#D8DEDE] max-w-sm mx-auto pt-16">
              <div className="flex items-center gap-2 mb-8">
                <LogIn className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Login</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                  />
                </div>
                <Button className="w-full bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#A8D3CC]/90">
                  Login
                </Button>

                <div className="flex items-center gap-4">
                  <div>
                    <button
                      onClick={handleClick}
                      type="button"
                      className="w-10 h-10 rounded-full border border-[#A8D3CC] text-[#A8D3CC] hover:bg-[#A8D3CC]/10 flex items-center justify-center transition"
                      aria-label="Sign in with Google"
                    >
                      <FcGoogle size={18} />
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full border border-[#A8D3CC] text-[#A8D3CC] hover:bg-[#A8D3CC]/10 flex items-center justify-center transition"
                      aria-label="Sign in with Google"
                    >
                      <FaApple size={18} />
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full border border-[#A8D3CC] text-[#A8D3CC] hover:bg-[#A8D3CC]/10 flex items-center justify-center transition"
                      aria-label="Sign in with Google"
                    >
                      <SiDiscord size={18} />
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full border border-[#A8D3CC] text-[#A8D3CC] hover:bg-[#A8D3CC]/10 flex items-center justify-center transition"
                      aria-label="Sign in with Google"
                    >
                      <TfiMicrosoftAlt size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Up Form */}
          <div
            className={`absolute top-0 left-0 w-full px-8 transition-all duration-700 ease-in-out transform ${
              isLogin
                ? "translate-x-full z-10 opacity-0"
                : "translate-x-0 z-20 opacity-100"
            }`}
          >
            <div className="text-[#D8DEDE] max-w-sm mx-auto pt-16">
              <div className="flex items-center gap-2 mb-8">
                <UserRound className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Sign Up</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                  />
                </div>
                <Button className="w-full bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#A8D3CC]/90">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Switch Button */}
        <button
          onClick={toggleForm}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#D8DEDE] hover:text-[#A8D3CC] transition-colors z-30"
        >
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
