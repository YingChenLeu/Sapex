import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, UserRound } from "lucide-react";
import { useState } from "react";
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
import { FcGoogle } from "react-icons/fc";
import { SiDiscord } from "react-icons/si";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { FaApple } from "react-icons/fa";
import { auth, db, provider } from "../lib/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setName("");
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setError("");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: uid,
            username: user.displayName?.trim() || "Anonymous",
            email: user.email,
            birthday: "",
            bio: "",
            isAdmin: false,
            profilePicture: user.photoURL || "/default-avatar.png",
            contributions: {
              English: 0,
              "Social Sciences": 0,
              "Foreign Languages": 0,
              Mathematics: 0,
              Science: 0,
              Arts: 0,
            },
            bigFivePersonality: {
              Openness: 0,
              Conscientiousness: 0,
              Extraversion: 0,
              Agreeableness: 0,
              Neuroticism: 0,
            },
          });
        } else {
          const currentData = userSnap.data();
          const updates: any = {};
          if (!currentData.username || currentData.username.trim() === "") {
            updates.username = user.displayName?.trim() || "Anonymous";
          }
          if (!currentData.profilePicture || currentData.profilePicture.trim() === "") {
            updates.profilePicture = user.photoURL || "/default-avatar.png";
          }
          if (Object.keys(updates).length > 0) {
            await updateDoc(userRef, updates);
          }
        }

        localStorage.setItem("uid", uid);
        localStorage.setItem("name", user.displayName || "Anonymous");
        localStorage.setItem("photo", user.photoURL || "/default-avatar.png");
        navigate("/helpboard");
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      setError("Authentication failed. Please try again.");
    }
  };

  const handleEmailLogin = async () => {
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      setError("Invalid email format.");
      return;
    }

    setLoading(true);
    try {
      setError("");
      const result = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);

      localStorage.setItem("uid", result.user.uid);
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        localStorage.setItem("name", data.username || "Anonymous");
        localStorage.setItem("photo", data.profilePicture || "/default-avatar.png");
      }
      navigate("/helpboard");
    } catch (error: any) {
      console.error("Email login error:", error);
      if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill out all fields.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );
      await updateProfile(result.user, {
        displayName: name.trim()
      });
      const uid = result.user.uid;
      localStorage.setItem("uid", uid);
      localStorage.setItem("name", name.trim() || "Anonymous");
      localStorage.setItem("photo", "/default-avatar.png");

      await setDoc(doc(db, "users", uid), {
        uid: uid,
        username: name.trim() || "Anonymous",
        email: email.trim().toLowerCase(),
        birthday: "",
        bio: "",
        isAdmin: false,
        profilePicture: result.user.photoURL || "/default-avatar.png",
        contributions: {
          English: 0,
          "Social Sciences": 0,
          "Foreign Languages": 0,
          Mathematics: 0,
          Science: 0,
          Arts: 0,
        },
        bigFivePersonality: {
          Openness: 0,
          Conscientiousness: 0,
          Extraversion: 0,
          Agreeableness: 0,
          Neuroticism: 0,
        },
      });

      navigate("/helpboard");
    } catch (error: any) {
      console.error("Email sign-up error:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#112327] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl relative bg-[#A8D3CC]/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
        <div
          className="absolute top-0 left-0 w-1/2 h-full z-10 transition-[transform,border-radius] duration-700 ease-in-out"
          style={{
            transform: isLogin ? "translateX(0)" : "translateX(100%)",
            background: "linear-gradient(135deg, #2D4F53 0%, #1A1F2C 100%)",
            borderRadius: isLogin ? "0px 0px 250px 0px" : "200px 0px 0px 0px",
          }}
        />

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
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
                <Button
                  className="w-full bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#A8D3CC]/90"
                  onClick={handleEmailLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleClick}
                    type="button"
                    className="w-10 h-10 rounded-full border border-[#A8D3CC] text-[#A8D3CC] hover:bg-[#A8D3CC]/10 flex items-center justify-center transition"
                    aria-label="Sign in with Google"
                  >
                    <FcGoogle size={18} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-[#A8D3CC] text-[#A8D3CC] hover:bg-[#A8D3CC]/10 flex items-center justify-center transition"
                  >
                    <FaApple size={18} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-[#A8D3CC] text-[#A8D3CC] hover:bg-[#A8D3CC]/10 flex items-center justify-center transition"
                  >
                    <SiDiscord size={18} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-[#A8D3CC] text-[#A8D3CC] hover:bg-[#A8D3CC]/10 flex items-center justify-center transition"
                  >
                    <TfiMicrosoftAlt size={18} />
                  </button>
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
            <div className="text-[#D8D3D3] max-w-sm mx-auto pt-16">
              <div className="flex items-center gap-2 mb-8">
                <UserRound className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Sign Up</h2>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#A8D3CC]/10 border-[#A8D3CC]/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
                <Button
                  className="w-full bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#A8D3CC]/90"
                  onClick={handleEmailSignup}
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
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
