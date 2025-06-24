import { useState, useEffect } from "react";
import { getAuth, } from "firebase/auth";
import { User, LifeBuoy, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

const typeLabels: Record<string, string> = {
  friendship: "Be a New Friend",
  loneliness: "Help Someone Feeling Lonely",
  heartbreak: "Help Someone with Heartbreak",
  burnout: "Support Someone Facing Burnout",
  stress: "Ease Someone's Anxiety",
  guidance: "Guide a New Student",
  study: "Offer Study Advice",
};

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState<"menu" | "seeker" | "supporter">("menu");
  const [seekerItems, setSeekerItems] = useState<{ docId: string, label: string }[]>([]);
  const [supporterItems, setSupporterItems] = useState<{ docId: string, label: string }[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  // Listen for supporter-specific matches to show pending support requests count
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "esupport"),
      where("helper_uid", "==", currentUser.uid),
      where("actual", "==", null)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPendingCount(snapshot.docs.length);
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || activeView === "menu") return;

    const roleKey = activeView === "seeker" ? "seeker_uid" : "helper_uid";
    const q = query(
      collection(db, "esupport"),
      where(roleKey, "==", currentUser.uid),
      where("actual", "==", null)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const raw = doc.data().type;
        const label = typeLabels[raw] || raw;
        return {
          docId: doc.id,
          label
        };
      });
      if (activeView === "seeker") setSeekerItems(data);
      else setSupporterItems(data);
    });

    return () => unsubscribe();
  }, [activeView, currentUser]);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <div className="relative">
          <img
            src={currentUser?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-11 h-11 mr-3 rounded-full border border-slate-600"
          />
          {pendingCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-black">
              {pendingCount}
            </div>
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-[#1e212d] border border-slate-700 rounded-lg shadow-md z-50 p-2"
          >
            {activeView === "menu" && (
              <>
                <button
                  onClick={() => setActiveView("seeker")}
                  className="flex items-center px-4 py-2 text-white hover:bg-slate-700 hover:rounded-md w-full"
                >
                  <User className="w-4 h-4 mr-2" /> My Requests
                </button>
                <button
                  onClick={() => setActiveView("supporter")}
                  className="flex items-center px-4 py-2 text-white hover:bg-slate-700 hover:rounded-md w-full"
                >
                  <LifeBuoy className="w-4 h-4 mr-2" /> Supporter Dashboard
                </button>
              </>
            )}
            {activeView !== "menu" && (
              <div>
                <button
                  onClick={() => setActiveView("menu")}
                  className="flex items-center text-white hover:text-gray-400 mb-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <div className="ml-2">
                  <ul className="space-y-2 max-h-[200px] overflow-y-auto pr-2 text-white text-sm scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent ">
                    {(activeView === "seeker" ? seekerItems : supporterItems).map((item, index) => (
                      <li
                        key={index}
                        className="bg-slate-800 hover:bg-slate-700 hover:rounded-md hover:scale-[1.02] transition-all duration-200 p-2 rounded cursor-pointer"
                        onClick={() => navigate(`/chat/${item.docId}`)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
