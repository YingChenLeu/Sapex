import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/LeafLogo.png";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0D17] text-[#D8DEDE] flex flex-col pt-16">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-16">
        <img
          src={Logo}
          alt="Sapex Logo"
          className="w-40 h-40 mb-5 animate-pulse"
        />
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#D8DEDE] to-[#A8D3CC] bg-clip-text text-transparent">
          Welcome to <span className="edu-font">Sapex</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-[#D8DEDE]/90">
        A safe, supportive online community built for your school — where students can ask questions, post problems, and get help from your fellow peers.
        </p>
        <div className="flex gap-4">
          <Button
            asChild
            className="bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#D8DEDE] hover:text-[#2D4F53] transition-colors"
          >
            <Link to="/post-problem">Bring to Your School</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#A8D3CC] text-[#D8DEDE] hover:bg-[#A8D3CC] hover:text-[#2D4F53]"
          >
            <Link to="/browse">Find Your School</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
