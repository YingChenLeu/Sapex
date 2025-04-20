import {
  Leaf,
  Earth,
  Sprout,
  BookOpen,
  TreeDeciduous,
  School,
  Flower,
  Pencil,
} from "lucide-react";

function AboutInitiative() {
  return (
    <div className="min-h-screen bg-[#0A0D17] text-[#D8DEDE] py-12 relative overflow-hidden pt-[100px]">
      {/* Decorative Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Leaf className="absolute top-20 left-10 text-[#A8D3CC]/20 w-16 h-16 animate-bounce" />
        <Sprout className="absolute top-40 right-20 text-[#A8D3CC]/20 w-12 h-12 animate-bounce delay-100" />
        <TreeDeciduous className="absolute bottom-20 left-20 text-[#A8D3CC]/20 w-20 h-20 animate-bounce delay-200" />
        <Flower className="absolute top-60 left-1/2 text-[#A8D3CC]/20 w-14 h-14 animate-bounce delay-300" />
        <School className="absolute bottom-40 right-40 text-[#A8D3CC]/20 w-16 h-16 animate-bounce delay-150" />
        <Pencil className="absolute top-32 left-32 text-[#A8D3CC]/20 w-10 h-10 animate-bounce delay-75" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto space-y-12">
          <section className="text-center">
            <Earth className="w-16 h-16 mx-auto mb-6 text-[#A8D3CC]" />
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#D8DEDE] to-[#A8D3CC] bg-clip-text text-transparent">
              Learning Initiative
            </h1>
            <p className="text-lg mb-8 text-[#D8DEDE]/90">
              Within today's world, peer to peer tutoring is a powerful tool for
              many students. However often times, its difficult to find the
              right person especially if you're not in the immediate school
              environment. Our initiative aims to bridge that gap by creating a
              platform where students can ask questions, post problems, and get
              help from their fellow peers. We believe that by fostering a
              collaborative learning environment, we can enhance the educational
              experience for all students. Our platform can also be used for
              problems outside of academics, such as mental health and social
              issues. We aim to create a safe space for students to share their
              experiences and seek help from their peers. In order to integrate
              such a safe environemnt, any problem other than academics will be
              integrated with anonymous chat.
            </p>
          </section>

          <section className="bg-[#2D4F53]/50 rounded-lg p-8 backdrop-blur-sm border border-[#A8D3CC]/20">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#A8D3CC]" />
              The Mission
            </h2>
            <p className="text-[#D8DEDE]/90 leading-relaxed">
              Our platform connects students and educators in a collaborative
              environment where questions lead to understanding, and challenges
              become opportunities for growth. Like a garden that needs
              nurturing to flourish, we provide the space and resources for
              academic development to bloom.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#2D4F53]/50 rounded-lg p-6 backdrop-blur-sm border border-[#A8D3CC]/20">
              <h3 className="text-xl font-semibold mb-3 text-[#A8D3CC]">
                Peer Support
              </h3>
              <p className="text-[#D8DEDE]/90">
                Connect with fellow students who understand your academic
                journey. Share experiences, solutions, and insights across
                various subjects and levels.
              </p>
            </div>
            <div className="bg-[#2D4F53]/50 rounded-lg p-6 backdrop-blur-sm border border-[#A8D3CC]/20">
              <h3 className="text-xl font-semibold mb-3 text-[#A8D3CC]">
                Knowledge Growth
              </h3>
              <p className="text-[#D8DEDE]/90">
                Every question asked and answered contributes to our collective
                learning. If needed the contribution you put forth will be
                recorded as evidence of your service to our community.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutInitiative;
