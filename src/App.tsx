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

function App() {
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
      </SidebarProvider>
    </>
  );
}

export default App;
