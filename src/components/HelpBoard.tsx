import { useState, useEffect } from "react";
import { ProblemChatDialog } from "./ProblemChatDialog";
import { HelpBoardCard } from "./HelpBoardCard";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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

const categories = ["All", "Mathematics", "Sciences", "English", "Social Sciences", "Foreign Languages"];

const HelpBoard = () => {
  const profilePhoto = localStorage.getItem("photo");

  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

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
    <div className="bg-[#0A0D17] pl-[280px] pt-[30px] min-h-screen">
      <h1 className="text-3xl font-bold text-white">Help Board</h1>
      <p className="text-muted-foreground mt-1">
        Post your problems and help others solve theirs
      </p>

      <img
        src={profilePhoto || undefined}
        alt="User Profile"
        className="w-10 h-10 rounded-full border border-white absolute top-5 right-[40px] z-50"
      />

      <Button
        className="flex items-center gap-2 bg-discord-primary hover:bg-discord-primary/90 text-white bg-[#8a9994] rounded-lg px-4 py-2 mt-4 "
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
