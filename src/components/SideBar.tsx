import { createContext, useContext, useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
const SidebarContext = createContext<{
  collapsed: boolean;
  toggleCollapsed: () => void;
} | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(true); // default (true is collapsed)
  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};
import {
  CircleUserRound,
  Globe,
  ClockFading,
  Eclipse,
  LogOut,
  Hexagon,
} from "lucide-react";

import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";

function SideBar() {
  const navigate = useNavigate();
  const { collapsed, toggleCollapsed } = useSidebar();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear(); // clear any cached user info
      navigate("/"); // redirect to login or landing
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setIsAdmin(userDoc.exists() && userDoc.data().isAdmin === true);
      }
    };
    fetchAdminStatus();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-100 ${
        collapsed ? "w-20" : "w-60"
      } m-0 flex flex-col bg-[#181b24] text-[#D8DEDE] shadow-lg space-y-[20px] border-r-[0.5px] border-r-black transition-all duration-300`}
    >
      <Link to="/helpboard" className="flex items-center top-20">
        <div className="flex items-center">
          <img
            src="/simple-logo.png"
            alt="Sapex Logo"
            className={`w-15 h-15 mb-5 mt-1  animate-pulse ease-in-out duration-300 ${
              collapsed ? "mx-auto ml-[9px]" : ""
            }`}
          />
          {!collapsed && (
            <p
              className={`transition-opacity ease-in-out duration-900 font-syncopate font- ${
                collapsed ? "opacity-0 delay-0" : "opacity-100 delay-[350ms]"
              } mb-[20px] text-lg `}
            >
              SAPEX Global
            </p>
          )}
        </div>
      </Link>

      <Link to="/user-profile" className="sidebar-icon flex items-center gap-2">
        <div className="flex items-center justify-center w-10 rounded-full">
          <CircleUserRound size={20} />
        </div>
        {!collapsed && (
          <p
            className={`transition-opacity ease-in-out duration-900 ${
              collapsed ? "opacity-0 delay-0" : "opacity-100 delay-[350ms]"
            } mr-[20px]`}
          >
            User Profile
          </p>
        )}
      </Link>

      <Link to="/sapex-global" className="sidebar-icon flex items-center gap-2">
        <div className="flex items-center justify-center w-10 rounded-full">
          <Globe size={20} />
        </div>
        {!collapsed && (
          <p
            className={`transition-opacity ease-in-out duration-900 ${
              collapsed ? "opacity-0 delay-0" : "opacity-100 delay-[350ms]"
            } mr-[20px]`}
          >
            Sapex Global
          </p>
        )}
      </Link>

      <Link
        to="/contributions"
        className="sidebar-icon flex items-center gap-2"
      >
        <div className="flex items-center justify-center w-10 rounded-full">
          <ClockFading size={20} />
        </div>
        {!collapsed && (
          <p
            className={`transition-opacity ease-in-out duration-900 ${
              collapsed ? "opacity-0 delay-0" : "opacity-100 delay-[350ms]"
            } mr-[20px]`}
          >
            Contributions
          </p>
        )}
      </Link>

      <Link
        to="/wellness-support"
        className="sidebar-icon flex items-center gap-2"
      >
        <div className="flex items-center justify-center w-10 rounded-full">
          <Eclipse size={20} />
        </div>
        {!collapsed && (
          <p
            className={`transition-opacity ease-in-out duration-900 ${
              collapsed ? "opacity-0 delay-0" : "opacity-100 delay-[350ms]"
            } mr-[8px]`}
          >
            Wellness Support
          </p>
        )}
      </Link>

      <button
        onClick={toggleCollapsed}
        className={`w-6 h-6 bg-[#181b24] text-white rounded-full border border-gray-700 shadow-md z-50 transition-all duration-300 ${
          collapsed ? "mt-10 ml-15 text-white" : "mt-10 ml-55 text-white}"
        }`}
      >
        {collapsed ? "→" : "←"}
      </button>

      <div className="mt-auto mb-10 flex flex-col gap-4 relative">
        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="sidebar-icon flex items-center gap-[20px] bg-blue-900 hover:bg-blue-700"
          >
            <div className="flex items-center justify-center w-10 rounded-full">
              <Hexagon size={20} />
            </div>
            {!collapsed && (
              <p
                className={`transition-opacity ease-in-out duration-900 ${
                  collapsed ? "opacity-0 delay-0" : "opacity-100 delay-[350ms]"
                } mr-[9px] font-semibold`}
              >
                Admin Panel
              </p>
            )}
          </button>
        )}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="sidebar-icon flex items-center gap-[20px] bg-[#4B1E1E] hover:bg-[#7A2E2E]"
        >
          <div className="flex items-center justify-center w-10 rounded-full">
            <LogOut className={collapsed ? "" : "ml-[20px]"} size={20} />
          </div>
          {!collapsed && (
            <p
              className={`transition-opacity ease-in-out duration-900 ${
                collapsed ? "opacity-0 delay-0" : "opacity-100 delay-[350ms]"
              } mr-[9px] font-semibold`}
            >
              Log Out
            </p>
          )}
        </button>
        <AnimatePresence>
          {showLogoutConfirm && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#181b24] text-white p-6 rounded-lg shadow-lg border border-gray-600 w-80"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="mb-4 text-center">Are you sure you want to log out?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SideBar;
