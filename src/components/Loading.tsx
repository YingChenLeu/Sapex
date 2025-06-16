import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState("Finding someone to help...");
  const [dots, setDots] = useState("");
  const navigate = useNavigate();

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

    // Start the matching process after component mounts
    const fetchMatch = async () => {
      try {
        const uid = localStorage.getItem("uid"); // Get seeker UID from local storage

        // First, find the user's open esupport request
        const q = query(
          collection(db, "esupport"),
          where("seeker_uid", "==", uid),
          where("helper_uid", "==", null)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const docRef = doc.ref;
          const dataDoc = doc.data();
          const problemType = dataDoc.type;

          // Call FastAPI with both UID and problem type
          const response = await fetch(
            `http://localhost:8000/match?uid=${uid}&problem_type=${problemType}`
          );
          const data = await response.json();

          await updateDoc(docRef, {
            helper_uid: data.helper_uid,
            predicted: data.predicted_score,
          });

          console.log("Matched helper UID:", data.helper_uid);
          navigate(`/chat/${docRef.id}`);
        } else {
          console.error("No pending esupport document found for this user.");
        }
      } catch (error) {
        console.error("Error fetching match:", error); // Log any errors that occur during match fetch
      }
    };

    fetchMatch(); // Trigger the match call on component mount

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
