import {
  Code,
  Coffee,
  Github,
  Laptop,
  Mail,
  Star,
  BookOpen,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";


const AboutDev = () => {
  return (
    <div className="min-h-screen bg-[#0A0D17] text-[#D8DEDE] py-12 relative overflow-hidden pt-[100px]">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Code className="absolute top-20 left-10 text-[#A8D3CC]/20 w-16 h-16 animate-bounce" />
        <Coffee className="absolute top-40 right-20 text-[#A8D3CC]/20 w-12 h-12 animate-bounce delay-100" />
        <Laptop className="absolute bottom-20 left-20 text-[#A8D3CC]/20 w-20 h-20 animate-bounce delay-200" />
        <Star className="absolute top-60 left-1/2 text-[#A8D3CC]/20 w-14 h-14 animate-bounce delay-300" />
        <Leaf className="absolute bottom-40 right-40 text-[#A8D3CC]/20 w-16 h-16 animate-bounce delay-150" />
        <BookOpen className="absolute top-32 left-32 text-[#A8D3CC]/20 w-10 h-10 animate-bounce delay-75" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto space-y-12">
          <section className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[#A8D3CC] flex items-center justify-center">
              <Code className="w-16 h-16 text-[#2D4F53]" />
            </div>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#D8DEDE] to-[#A8D3CC] bg-clip-text text-transparent">
              About the Developer
            </h1>
            <p className="text-lg mb-8 text-[#D8DEDE]/90">
              Passionate about creating meaningful connections
            </p>
          </section>

          <section className="bg-[#2D4F53]/50 rounded-lg p-8 backdrop-blur-sm border border-[#A8D3CC]/20">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Laptop className="w-6 h-6 text-[#A8D3CC]" />
              Developer's Note
            </h2>
            <p className="text-[#D8DEDE]/90 leading-relaxed">
              Hey, I noticed you clicked on my profile! I'm thrilled to share a
              bit about myself. I'm a self-taught solo developer with a passion
              for creating meaningful connections through technology. Currently
              I go to the American International School of Cape Town. If you go
              there, you might know me, but my identity is a secret for now. I
              hope you enjoy this creation of mine. 
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#2D4F53]/50 rounded-lg p-6 backdrop-blur-sm border border-[#A8D3CC]/20">
              <h3 className="text-xl font-semibold mb-3 text-[#A8D3CC]">
                Skills & Expertise
              </h3>
              <ul className="space-y-2 text-[#D8DEDE]/90">
                <li>• Front End Development</li>
                <li>• Limited Backend Knowledge</li>
                <li>• User Experience Design</li>
                <li>• Community Building</li>
                <li>• Amazing Academic Advisor</li>
              </ul>
            </div>
            <div className="bg-[#2D4F53]/50 rounded-lg p-6 backdrop-blur-sm border border-[#A8D3CC]/20">
              <h3 className="text-xl font-semibold mb-3 text-[#A8D3CC]">
                Connect With Me
              </h3>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-[#A8D3CC] text-[#D8DEDE] hover:bg-[#A8D3CC] hover:text-[#2D4F53]"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-[#A8D3CC] text-[#D8DEDE] hover:bg-[#A8D3CC] hover:text-[#2D4F53]"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutDev;
