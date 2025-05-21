import { useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSidebar } from "../components/SideBar";
import { useState } from "react";
import { Edit, Save, User } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

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
          });
        }
      }
    };
    fetchUserProfile();
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
      // In a real app, this would upload to a server
      const imageUrl = URL.createObjectURL(file);
      handleChange("profilePicture", imageUrl);
    }
  };
  const { collapsed } = useSidebar();
  return (
    <div
      className={`bg-[#0A0D17] pt-[30px] min-h-screen ${
        collapsed ? "pl-[100px]" : "pl-[280px]"
      } transition-all duration-300`}
    >
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
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
            <CardContent className="space-y-4">
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
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your app preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="theme">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="theme">Theme</TabsTrigger>
                </TabsList>
                <TabsContent value="theme" className="pt-4">
                  <RadioGroup
                    value={profile.theme}
                    onValueChange={(value) => handleChange("theme", value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system">System</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                  </RadioGroup>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleChange("theme", "system");
                  toast.success("Settings updated successfully!");
                }}
              >
                Save Settings
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
              <div className="flex justify-between items-center pb-2 border-b">
                <span>Joined</span>
                <span className="font-medium">{profile.joined}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Reputation Score</span>
                <span className="font-medium text-primary">
                  {profile.reputation}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
