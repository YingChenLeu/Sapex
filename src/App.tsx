import AboutDev from "./components/AboutDev";
import AboutInitiative from "./components/AboutInitiative";
import Community from "./components/Community";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Auth from "./components/Auth";
import HelpBoard from "./components/HelpBoard";
import PostProblem from "./components/PostProblem";



function App() {
  return (
    <>
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
            <div>
              <SideBar />
              <HelpBoard />
            </div>
          }
        />

      </Routes>
      
    </>
  );
}

export default App;
