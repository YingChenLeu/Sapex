import { useState, useEffect } from "react";
import { useSidebar } from "../components/SideBar";
import { ProblemChatDialog } from "./ProblemChatDialog";
import { HelpBoardCard } from "./HelpBoardCard";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import Dropdown from "./Dropdown";

type Problem = {
  id: string;
  title: string;
  description: string;
  category: string;
  course: string;
  urgency: "low" | "medium" | "high";
  image?: string | null;
  createdAt: Date | null;
  user: {
    name: string;
    avatar?: string;
    uid?: string;
  };
  responses: number;
  likes: number;
};

const categories = ["All", "Mathematics", "Science", "English", "Social Sciences", "Foreign Languages"];

const HelpBoard = () => {
  const [, setProfilePhoto] = useState("");
  const [, setUserName] = useState("User");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [, setLoading] = useState(true);

  const { collapsed } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        const uid = localStorage.getItem("uid");
        if (!uid) return;

        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfilePhoto(data.profilePicture || "");
          setUserName(data.username || "User");
        }
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
      }
    };

    fetchUserProfilePicture();
  }, []);
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "problems"));
        const problemsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Problem",
            description: data.description || "No description provided.",
            category: data.category || "General",
            course: data.course || "Unknown Course",
            urgency: data.urgency || "low",
            image: data.image ?? null,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
            user: {
              name: data.user?.name || "Anonymous",
              avatar: data.user?.avatar || "",
              uid: data.user?.uid || "",
            },
            responses: data.responses ?? 0,
            likes: data.likes ?? 0,
          };
        });
        setProblems(problemsData);
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleHelpClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProblem(null);
  };

  return (
    <div className={`bg-[#0A0D17] pt-[30px] min-h-screen ${collapsed ? "pl-[130px]" : "pl-[280px]"} transition-all duration-300`}>
      <h1 className="text-3xl font-bold text-white font-syncopate">Academic Center</h1>
      <p className="text-muted-foreground mt-1">
        Post your problems and help others solve theirs
      </p>

      <div className="absolute top-5 right-[40px] z-50">
        <Dropdown />
      </div>

      <Button
        className="flex items-center gap-2  text-white bg-[#8a9994] hover:bg-[#8a9994]/90 rounded-lg px-4 py-2 mt-4 "
        onClick={() => navigate("/post-problem")}
      >
        <PlusCircle size={18} />
        Post a Problem
      </Button>

      <div className="flex space-x-6 mt-6 text-white text-lg">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2 pb-1 transition-all duration-200 border-b-2  ${
              selectedCategory === cat
                ? "text-white border-white font-semibold"
                : "text-gray-400 border-transparent hover:text-slate-400 hover:border-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 ml-[-30px] mr-[20px] max-w-7xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems
          .filter((problem) =>
            selectedCategory === "All"
              ? true
              : problem.category.toLowerCase() ===
                selectedCategory.toLowerCase()
          )
          .map((problem) => (
            <HelpBoardCard
              key={problem.id}
              problem={problem}
              onHelpClick={handleHelpClick}
            />
          ))}
      </div>

      {selectedProblem && (
        <ProblemChatDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          problem={selectedProblem}
        />
      )}
    </div>
  );
};

export default HelpBoard;
