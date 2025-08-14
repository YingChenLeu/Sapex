import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/leaf&crow.png";
import MetaBalls from "./ui/MetaBalls";
import CircularText from "./CircularText";
import { MacbookScroll } from "./MacbookScroll";


function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0D17] text-[#D8DEDE] flex flex-col pt-16">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-16">
        <img
          src={Logo}
          alt="Sapex Logo"
          className="w-35 h-35 mb-5 animate-pulse"
        />
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#D8DEDE] to-[#A8D3CC] bg-clip-text text-transparent">
          Welcome to <span className="edu-font">Sapex</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-[#D8DEDE]/90">
          A safe, supportive online community built for your school — where
          students can ask questions, post problems, and get help from your
          fellow peers.
        </p>
        <div className="flex gap-4">
          <a
            href={`mailto:shiroiyuzuru@gmail.com?subject=Bring Sapex to My Community&body=Name:%0D%0ASchool Name:%0D%0ACity:%0D%0ACountry:%0D%0AEmail Address:%0D%0AYour School Email Domain:%0D%0ADoes Your School use Google Sign In?:`}
          >
            <Button className="bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#D8DEDE] hover:text-[#2D4F53] transition-colors">
              Bring to Your School
            </Button>
          </a>

          <Button
            asChild
            variant="outline"
            className="border-[#A8D3CC] text-[#D8DEDE] hover:bg-[#A8D3CC] hover:text-[#2D4F53]"
          >
            <Link to="/stillindevelopment">Find Your School</Link>
          </Button>
        </div>

        <div className="relative w-[800px] h-[500px]">
          <div className="absolute inset-0 z-0">
            <MetaBalls
              color="#2D4F53"
              cursorBallColor="#abd7dc"
              cursorBallSize={2}
              ballCount={19}
              animationSize={30}
              enableMouseInteraction={false}
              enableTransparency={true}
              hoverSmoothness={0.05}
              clumpFactor={1}
              speed={0.9}
            />
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center ">
            <CircularText
              text="SAPEX BUILDS COMMUNITIES "
              onHover="goBonkers"
              spinDuration={30}
              className="custom-class"
            />
          </div>
          <div className="mt-[9rem]">
          <MacbookScroll
            src="/src/assets/SapexHelpboardPreview.png"
            showGradient={true}
            title={<span>Sapex HelpBoard Preview</span>}
          />
          </div>


        </div>
      </div>
    </div>
  );
}

export default LandingPage;
