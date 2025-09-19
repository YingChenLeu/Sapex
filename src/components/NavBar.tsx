import { UserRound, Users, LogIn, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Logo from "@/assets/simple-logo.png";

const Navbar = () => {


  return (
    <nav className="bg-[#181b24] text-[#D8DEDE] py-2 px-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-15" />
            <span className="ml-2 text-2xl font-syncopate">SAPEX</span>
          </Link>
          <Link
            to={"/initiative"}
            className="flex items-center space-x-2 hover:text-[#A8D3CC] transition-colors"
          >
            <Leaf size={20} />
            <span>{"Initiative"}</span>
          </Link>
          <Link
            to={"/developer"}
            className="flex items-center space-x-2 hover:text-[#A8D3CC] transition-colors"
          >
            <UserRound size={20} />
            <span>{"About the Dev"}</span>
          </Link>
          <Link
            to={"/community"}
            className="flex items-center space-x-2 hover:text-[#A8D3CC] transition-colors"
          >
            <Users size={20} />
            <span>{"Community"}</span>
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
