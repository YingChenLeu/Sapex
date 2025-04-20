import { UserRound, Users, LogIn, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isOnInitiativePage = location.pathname === "/initiative";
  const isOnAboutDev = location.pathname === "/developer";
  const isOnCommunity = location.pathname === "/community";

  return (
    <nav className="bg-[#181b24] text-[#D8DEDE] p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            to={isOnInitiativePage ? "/" : "/initiative"}
            className="flex items-center space-x-2 hover:text-[#A8D3CC] transition-colors"
          >
            <Leaf size={20} />
            <span>{isOnInitiativePage ? "Home" : "Initiative"}</span>
          </Link>
          <Link
            to={isOnAboutDev ? "/" : "/developer"}
            className="flex items-center space-x-2 hover:text-[#A8D3CC] transition-colors"
          >
            <UserRound size={20} />
            <span>{isOnAboutDev ? "Home" : "About the Dev"}</span>
          </Link>
          <Link
            to={isOnCommunity ? "/" : "/community"}
            className="flex items-center space-x-2 hover:text-[#A8D3CC] transition-colors"
          >
            <Users size={20} />
            <span>{isOnCommunity ? "Home" : "Community"}</span>
          </Link>
          <Link
            to="/helpboard"
            className="flex items-center space-x-2 hover:text-[#A8D3CC] transition-colors"
          >
            <UserRound size={20} />
            <span>{"Front End Test"}</span>
          </Link>
        </div>
        <Button
          variant="outline"
          asChild
          className="bg-transparent border-[#A8D3CC] text-[#D8DEDE] hover:bg-[#A8D3CC] hover:text-[#2D4F53]"
        >
          <Link to="/login">
            <LogIn className="mr-2" size={20} />
            Login
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
