import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface NotificationListenerProps {
  uid: string;
}

const NotificationListener: React.FC<NotificationListenerProps> = ({ uid }) => {
  const [match, setMatch] = useState<any>(null);

  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, "esupport"),
      where("helper_uid", "==", uid),
      where("status", "==", "matched")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if ((change.type === "added" || change.type === "modified") && !change.doc.data().notified) {
          setMatch({ id: change.doc.id, ...change.doc.data() });
          updateDoc(doc(db, "esupport", change.doc.id), { notified: true });
        }
      });
    });

    return () => unsub();
  }, [uid]);

  return (
    <AnimatePresence>
      {match && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div className="bg-[#181b24] text-white p-6 rounded-lg shadow-lg border border-gray-600 w-96">
            <h2 className="text-lg font-bold mb-2">New Match!</h2>
            <p className="mb-4">
              You’ve been matched to help with a problem in{" "}
              <span className="font-semibold">{match.type}</span>.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  window.location.href = `/chat/${match.id}`;
                  updateDoc(doc(db, "esupport", match.id), { notified: true });
                }}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Join Chat
              </button>
              <button
                onClick={() => {
                  updateDoc(doc(db, "esupport", match.id), { notified: true });
                  setMatch(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationListener;