import { useEffect, useState } from "react";
import { Edit, Save, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
    theme: "system"
  });

  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setProfile(prev => ({ ...prev, ...userSnap.data() }));
      } else {
        setProfile(prev => ({ ...prev, email: user.email || "" }));
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, profile, { merge: true });
    toast.success("Profile updated successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange("profilePicture", imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D17] text-white py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#80eceb] mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <Card className="lg:col-span-2 bg-[#0A0D17]/60 border border-[#80eceb]/20 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[#80eceb]">Profile Information</CardTitle>
                <CardDescription className="text-[#8ED9D9]">Update your profile information</CardDescription>
              </div>
              <Button
                type={isEditing ? "submit" : "button"}
                variant="outline"
                size="sm"
                onClick={() => !isEditing && setIsEditing(true)}
                className="text-[#80eceb] border-[#80eceb] hover:bg-[#80eceb]/10"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    {profile.profilePicture ? (
                      <AvatarImage src={profile.profilePicture} alt={profile.name} />
                    ) : (
                      <AvatarFallback className="text-2xl bg-[#80eceb]/20 text-[#80eceb]">
                        <User size={32} />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <Button
                        type="button"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-[#80eceb]/10"
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                      >
                        <Edit className="h-3 w-3 text-[#80eceb]" />
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
                    <Label htmlFor="name" className="text-[#80eceb]">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#1A1F2C] text-white border-[#80eceb]/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-[#80eceb]">Username</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      disabled={!isEditing}
                      className="bg-[#1A1F2C] text-white border-[#80eceb]/30"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-[#80eceb]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="bg-[#1A1F2C] text-white border-[#80eceb]/30"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="text-[#80eceb]">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="bg-[#1A1F2C] text-white border-[#80eceb]/30"
                />
              </div>
            </CardContent>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="bg-[#0D2A2C]/60 border border-[#80eceb]/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#80eceb]">Settings</CardTitle>
              <CardDescription className="text-[#8ED9D9]">Manage your app preferences</CardDescription>
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
                onClick={async () => {
                  if (!user) return;
                  await setDoc(doc(db, "users", user.uid), { theme: "system" }, { merge: true });
                  handleChange("theme", "system");
                  toast.success("Settings updated successfully!");
                }}
                className="text-[#80eceb] border-[#80eceb] hover:bg-[#80eceb]/10"
              >
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
