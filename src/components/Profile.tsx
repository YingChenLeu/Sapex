import { useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSidebar } from "../components/SideBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Save, User, Brain } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    userId: "",
    email: "",
    bio: "",
    profilePicture: "",
    theme: "system",
    helped: 0,
    posted: 0,
    joined: "",
    reputation: 0,
    bigFivePersonality: {
      Extraversion: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
      Neuroticism: 0,
      Openness: 0,
    },
  });

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile({
            name: userData.username || "",
            userId: user.uid,
            email: user.email || "",
            bio: userData.bio || "",
            profilePicture: userData.profilePicture || "",
            theme: userData.theme || "system",
            helped: userData.helped || 0,
            posted: userData.posted || 0,
            joined: userData.joined || "",
            reputation: userData.reputation || 0,
            bigFivePersonality: userData.bigFivePersonality || {
              Extraversion: 0,
              Agreeableness: 0,
              Conscientiousness: 0,
              Neuroticism: 0,
              Openness: 0,
            },
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          username: profile.name,
          bio: profile.bio,
          profilePicture: profile.profilePicture,
          theme: profile.theme,
        });
        await updateProfile(user, {
          displayName: profile.name,
          photoURL: profile.profilePicture,
        });
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Placeholder for future upload logic
      handleChange("profilePicture", file.name); // Example: store file name only
    }
  };
  const { collapsed } = useSidebar();

  const navigate = useNavigate();

  const handlePersonalityQuiz = () => {
    navigate("/personality-quiz");
  };

  return (
    <div
      className={`bg-[#0A0D17] pt-[30px] min-h-screen ${
        collapsed ? "pl-[100px]" : "pl-[280px]"
      } transition-all duration-300`}
    >
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    {profile.profilePicture &&
                    profile.profilePicture.startsWith("http") ? (
                      <AvatarImage
                        src={profile.profilePicture}
                        alt={profile.name}
                      />
                    ) : (
                      <AvatarFallback className="text-2xl">
                        <User size={32} />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <Button
                        type="button"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0"
                        onClick={() =>
                          document.getElementById("avatar-upload")?.click()
                        }
                      >
                        <Edit className="h-3 w-3" />
                        <span className="sr-only">Change avatar</span>
                      </Button>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                  
                </div>
                <div className="space-y-2 flex-1">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="userId">User ID</Label>
                    <Input id="userId" value={profile.userId} disabled />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} disabled />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter className="justify-end">
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personality</CardTitle>
              <CardDescription>Your Big Five personality traits</CardDescription>
            </CardHeader>
            <CardContent>
              {profile.bigFivePersonality &&
              Object.values(profile.bigFivePersonality).some((score) => score > 0) ? (
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={Object.entries(profile.bigFivePersonality).map(([trait, score]) => ({
                        trait,
                        value: Math.min(score * 120, 100),
                      }))}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="trait" />
                      <Radar
                        name="Personality"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  You haven’t taken the personality quiz yet.
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePersonalityQuiz}
                className="bg-[#142a26] hover:bg-[#1b3b2a]/90 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Brain className="w-5 h-5 mr-2" />
                Take Personality Quiz
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your activity summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span>Problems Helped</span>
                <span className="font-medium">{profile.helped}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span>Problems Posted</span>
                <span className="font-medium">{profile.posted}</span>
              </div>
          
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
