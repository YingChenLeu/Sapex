import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db, app } from "../lib/firebase";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  courseGroups,
  type CourseCategory,
  type Course,
} from "@/components/ui/courseData";

const PostProblem = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "">(
    ""
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | "">("");
  const [urgency, setUrgency] = useState<string>("low");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as CourseCategory);
    setSelectedCourse("");
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value as Course);
  };

  const handlePostProblem = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!title || !description || !selectedCategory || !selectedCourse) {
      alert("Please fill in all required fields.");
      return;
    }

    let avatar = "";
    if (user?.uid) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        avatar = userDoc.data().profilePicture || "";
      }
    }

    try {
      await addDoc(collection(db, "problems"), {
        title,
        description,
        category: selectedCategory,
        course: selectedCourse,
        urgency,
        image: selectedImage || null,
        createdAt: serverTimestamp(),
        user: {
          name: user?.displayName || "Anonymous",
          avatar,
          uid: user?.uid || "",
        },
        responses: 0,
      });
      navigate("/helpboard");
    } catch (error) {
      console.error("Error posting problem:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Back to Problems
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Post a Problem</h1>
          <p className="text-gray-400">Share your problem with the community</p>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What's your problem about?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category and Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="category">Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger
                  id="category"
                  className="bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border border-gray-700 rounded-md shadow-md z-50 mt-1 transition-all duration-200 ease-in-out transform scale-95 origin-top data-[state=open]:scale-100">
                  {Object.keys(courseGroups).map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="hover:bg-gray-700 cursor-pointer"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label htmlFor="course">Course</Label>
              <Select
                value={selectedCourse}
                onValueChange={handleCourseChange}
                disabled={!selectedCategory}
              >
                <SelectTrigger
                  id="course"
                  className="bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <SelectValue
                    placeholder={
                      selectedCategory
                        ? "Select course"
                        : "Select a category first"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border border-gray-700 rounded-md shadow-md z-50 mt-1 transition-all duration-200 ease-in-out transform scale-95 origin-top data-[state=open]:scale-100">
                  {selectedCategory &&
                    courseGroups[selectedCategory].map((course) => (
                      <SelectItem
                        key={course}
                        value={course}
                        className="hover:bg-gray-700 cursor-pointer"
                      >
                        {course}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Urgency */}
          <div className="space-y-4">
            <Label htmlFor="urgency">Urgency</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger
                id="urgency"
                className="bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border border-gray-700 rounded-md shadow-md z-50 mt-1 transition-all duration-200 ease-in-out transform scale-95 origin-top data-[state=open]:scale-100">
                <SelectItem
                  value="low"
                  className="hover:bg-gray-700 cursor-pointer"
                >
                  Low
                </SelectItem>
                <SelectItem
                  value="medium"
                  className="hover:bg-gray-700 cursor-pointer"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="high"
                  className="hover:bg-gray-700 cursor-pointer"
                >
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your problem in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[200px] bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>Image (optional)</Label>
            <FileUpload
              onChange={async (files) => {
                if (!files?.length) return;
                const file = files[0];
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  setUploadError(
                    "Please upload an image file (e.g. JPEG, PNG)."
                  );
                  return;
                }
                setUploadError(null);
                setIsUploading(true);
                try {
                  const storage = getStorage(app);
                  const currentUser = getAuth().currentUser;
                  const path = `problemImages/${
                    currentUser?.uid ?? "anon"
                  }/${Date.now()}-${file.name}`;
                  const storageRef = ref(storage, path);
                  await uploadBytes(storageRef, file);
                  const downloadURL = await getDownloadURL(storageRef);
                  setSelectedImage(downloadURL);
                } catch (err) {
                  console.error("Upload failed:", err);
                  setUploadError(
                    err instanceof Error
                      ? err.message
                      : "Upload failed. Try again."
                  );
                  setSelectedImage(null);
                } finally {
                  setIsUploading(false);
                }
              }}
            />
            {isUploading && (
              <p className="text-sm text-gray-400">Uploading image…</p>
            )}
            {uploadError && (
              <p className="text-sm text-red-400">{uploadError}</p>
            )}
            {selectedImage && (
              <div className="relative aspect-video w-full mt-4">
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              onClick={() => navigate(-1)}
              className="bg-red-700 text-white rounded-md hover:bg-red-800 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePostProblem}
              className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              Post Problem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProblem;
