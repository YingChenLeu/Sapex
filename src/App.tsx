import { JSX, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import AdminManagement from "./components/AdminManagement";
import { Navigate } from "react-router-dom";
import AboutDev from "./components/AboutDev";
import AboutInitiative from "./components/AboutInitiative";
import Community from "./components/Community";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import SideBar, { SidebarProvider } from "./components/SideBar";
import Auth from "./components/Auth";
import HelpBoard from "./components/HelpBoard";
import PostProblem from "./components/PostProblem";
import Contributions from "./components/Contribution";
import ProtectedRoute from "./components/ProtectedRoute";
import StillInDevelopment from "./components/StillInDevelopment";
import Profile from "./components/Profile";
import WellnessSupport from "./components/WellnessSupport";
import PersonalityQuiz from "./components/Big5Personality";
import Matching from "./components/Loading";
import ChatPage from "./components/Chat";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(docRef);
        setIsAdmin(userSnap.exists() && userSnap.data().isAdmin === true);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return <div className="text-white p-4">Checking admin access...</div>;
  return isAdmin ? children : <Navigate to="/" />;
};

function App() {
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) return;

    const userRef = doc(db, "users", uid);

    const setOnline = async () => {
      try {
        await updateDoc(userRef, {
          online: true,
          lastActive: new Date(),
        });
      } catch (err) {
        console.error("Failed to set user online", err);
      }
    };

    const setOffline = async () => {
      try {
        await updateDoc(userRef, {
          online: false,
        });
      } catch (err) {
        console.error("Failed to set user offline", err);
      }
    };

    setOnline();

    window.addEventListener("beforeunload", setOffline);
    return () => {
      window.removeEventListener("beforeunload", setOffline);
      setOffline();
    };
  }, []);
  return (
    <>
      <SidebarProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar /> <LandingPage />
              </div>
            }
          />
          <Route
            path="/post-problem"
            element={
              <div>
                <PostProblem />
              </div>
            }
          />
          <Route
            path="/initiative"
            element={
              <div>
                <AboutInitiative />
                <Navbar />
              </div>
            }
          />
          <Route
            path="/sapex-global"
            element={
              <div>
                <StillInDevelopment />
              </div>
            }
          />
          <Route
            path="/developer"
            element={
              <div>
                <AboutDev />
                <Navbar />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                <Auth />
              </div>
            }
          />
          <Route
            path="/contributions"
            element={
              <div>
                <ProtectedRoute>
                  <div>
                    <Contributions />
                    <SideBar />
                  </div>
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <div>
                  <ChatPage />
                  <SideBar />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/stillindevelopment"
            element={
              <div>
                <StillInDevelopment />
              </div>
            }
          />
          <Route
            path="/community"
            element={
              <div>
                <Community />
                <Navbar />
              </div>
            }
          />
          <Route
            path="/helpboard"
            element={
              <ProtectedRoute>
                <div>
                  <SideBar />
                  <HelpBoard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/personality-quiz"
            element={
              <ProtectedRoute>
                <div>
                  <SideBar />
                  <PersonalityQuiz />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/wellness-support"
            element={
              <ProtectedRoute>
                <div>
                  <SideBar />
                  <WellnessSupport />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/finding-match"
            element={
              <ProtectedRoute>
                <div>
                  <SideBar />
                  <Matching />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <div>
                  <Profile />
                  <SideBar />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div>
                  <SideBar />
                  <AdminManagement />
                </div>
              </AdminRoute>
            }
          />
        </Routes>
      </SidebarProvider>
    </>
  );
}

export default App;
