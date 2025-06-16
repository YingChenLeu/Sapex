import { useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; 
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSidebar } from "./SideBar";

const PersonalityQuiz = () => {
  const navigate = useNavigate();

  const personalityTraits = [
    "I enjoy talking to people.",
    "I often notice flaws in others.",
    "I make sure to do tasks carefully.",
    "I often feel down or blue.",
    "I enjoy coming up with new ideas.",
    "I prefer keeping to myself.",
    "I like helping people when I can.",
    "I can be careless sometimes.",
    "I handle stress well and stay calm.",
    "I’m curious about many things.",
    "I usually have a lot of energy.",
    "I get into arguments with others.",
    "I can be counted on to do a good job.",
    "I feel tense or nervous often.",
    "I enjoy thinking deeply about things.",
    "I’m enthusiastic and excited about things.",
    "I tend to forgive people easily.",
    "I can be a bit disorganized.",
    "I worry a lot about different things.",
    "I often use my imagination.",
    "I tend to be quiet in social settings.",
    "I usually trust people.",
    "I sometimes avoid doing hard work.",
    "I stay emotionally steady, even under pressure.",
    "I like inventing or creating things.",
    "I speak up and take the lead.",
    "I sometimes come off as cold or distant.",
    "I finish tasks even when they’re difficult.",
    "My mood can change quickly.",
    "I value art, music, or beauty in life.",
    "I sometimes feel shy or self-conscious.",
    "I try to be kind and considerate to others.",
    "I get things done efficiently.",
    "I stay calm in tough situations.",
    "I like having a predictable routine.",
    "I enjoy being around other people.",
    "I can be rude without meaning to.",
    "I like to make plans and follow through with them.",
    "I get nervous easily.",
    "I enjoy reflecting on ideas and possibilities.",
    "I’m not very interested in art or music.",
    "I like working together with others.",
    "I get distracted easily.",
    "I enjoy creative things like art, music, or writing.",
  ];

  const [responses, setResponses] = useState<Record<number, string>>({});

  const handleResponseChange = (questionIndex: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  // Helper function to calculate Big Five results from responses
  const calculateBigFive = () => {
    const scoringKey = {
      Extraversion: [1, 6, 11, 16, 21, 26, 31, 36],
      Agreeableness: [2, 7, 12, 17, 22, 27, 32, 37, 42],
      Conscientiousness: [3, 8, 13, 18, 23, 28, 33, 38, 43],
      Neuroticism: [4, 9, 14, 19, 24, 29, 34, 39],
      Openness: [5, 10, 15, 20, 25, 30, 35, 40, 41, 44],
    };

    const reverseScored = new Set([6, 9, 12, 18, 21, 23, 24, 27, 31, 34, 35, 37, 41, 43]);

    const maxScores: Record<string, number> = {
      Extraversion: 40,
      Agreeableness: 45,
      Conscientiousness: 45,
      Neuroticism: 40,
      Openness: 50,
    };

    const scores: Record<string, number> = {
      Extraversion: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
      Neuroticism: 0,
      Openness: 0,
    };

    for (const [trait, items] of Object.entries(scoringKey)) {
      let total = 0;
      for (const item of items) {
        const response = responses[item - 1];
        if (response) {
          const value = parseInt(response);
          total += reverseScored.has(item) ? 6 - value : value;
        }
      }
      const maxScore = maxScores[trait];
      scores[trait] = parseFloat((total / maxScore).toFixed(2));
    }

    return scores;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(responses).length !== 44) {
      alert("Please answer all 44 questions before submitting.");
      return;
    }

    const result = calculateBigFive();
    console.log("Big Five Results:", result);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        bigFivePersonality: result,
      });
      console.log("Big Five personality results updated in user profile.");
    } catch (error) {
      console.error("Failed to update Firestore:", error);
    }
  };

  const scaleOptions = [
    { value: "1", label: "Strongly Disagree" },
    { value: "2", label: "Disagree" },
    { value: "3", label: "Neutral" },
    { value: "4", label: "Agree" },
    { value: "5", label: "Strongly Agree" },
  ];
  const { collapsed } = useSidebar();

  return (
    <div
      className={`min-h-screen bg-[#0A0D17] text-white pt-[30px] transition-all duration-300 ${
        collapsed ? "pl-[0px]" : "pl-[20px]"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 pt-4">
          <button
            onClick={() => navigate("/user-profile")}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Personality Quiz</h1>
        </div>

        {/* Quiz Form */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Brain className="w-6 h-6 mr-3 text-blue-400" />
              Personality Assessment
            </CardTitle>
            <p className="text-gray-300">
              Rate how much you agree with each statement about yourself
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {personalityTraits.map((trait, index) => (
                <div
                  key={index}
                  className="space-y-4 p-6 rounded-lg bg-white/5 border border-white/10"
                >
                  <Label className="text-white text-lg font-medium">
                    {index + 1}. {trait}
                  </Label>

                  <RadioGroup
                    value={responses[index] || ""}
                    onValueChange={(value) =>
                      handleResponseChange(index, value)
                    }
                    className="grid grid-cols-1 md:grid-cols-5 gap-4"
                  >
                    {scaleOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`q${index}-${option.value}`}
                          className="border-white/30 text-blue-400 transition-all duration-200"
                        />
                        <Label
                          htmlFor={`q${index}-${option.value}`}
                          className={`text-white text-sm cursor-pointer flex-1 text-center transition-all duration-200 transform ${
                            responses[index] === option.value
                              ? "scale-105 text-blue-300 font-semibold"
                              : "hover:scale-102"
                          }`}
                        >
                          <div className="font-medium">{option.value}</div>
                          <div className="text-xs text-gray-300 mt-1">
                            {option.label}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <Button
                  type="submit"
                  onClick={() => navigate("/user-profile")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Complete Assessment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalityQuiz;
