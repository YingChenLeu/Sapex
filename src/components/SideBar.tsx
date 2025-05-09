import {
  CircleUserRound,
  Globe,
  ClockFading,
  Eclipse,
  Cog,
  LogOut,
} from "lucide-react";
import Logo from "@/assets/LeafLogo.png";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";

function SideBar() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear(); // clear any cached user info
      navigate("/"); // redirect to login or landing
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  return (
    <div className="fixed top-0 left-0 h-screen w-60 m-0 flex flex-col bg-[#181b24] text-[#D8DEDE] shadow-lg space-y-[20px] border-r-[0.5px] border-l-black">
      <div className="flex items-center top-20">
        <img
          src={Logo}
          alt="Sapex Logo"
          className="w-20 h-20 mb-5 animate-pulse"
        />
        <p className="mb-[20px] text-lg ">Sapex Dashboard</p>
      </div>

      <Link to="/user-profile" className="sidebar-icon flex items-center gap-2">
        <CircleUserRound className="ml-[20px]" />
        <p className="mr-[20px]">User Profile</p>
      </Link>

      <Link to="/sapex-global" className="sidebar-icon flex items-center gap-2">
        <Globe className="ml-[20px]" />
        <p className="mr-[20px]">Sapex Global</p>
      </Link>

      <Link to="/contributions" className="sidebar-icon flex items-center gap-2">
        <ClockFading className="ml-[20px]" />
        <p className="mr-[20px]">Contributions</p>
      </Link>

      <Link to="/wellness-support" className="sidebar-icon flex items-center gap-2">
        <Eclipse className="ml-[10px]" />
        <p className="mr-[10px]">Wellness Support</p>
      </Link>

      <div className="mt-auto mb-10 flex flex-col gap-4">
        <Link
          to="/privacy"
          className="sidebar-icon flex items-center gap-[20px] bg-[#4B1E1E] hover:bg-[#7A2E2E]"
        >
          <Cog className="ml-[20px]" />
          <p className="mr-[9px] font-semibold">Privacy</p>
        </Link>

        <button
          onClick={handleLogout}
          className="sidebar-icon flex items-center gap-[20px] bg-[#4B1E1E] hover:bg-[#7A2E2E]"
        >
          <LogOut className="ml-[20px]" />
          <p className="mr-[9px] font-semibold">Log Out</p>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
