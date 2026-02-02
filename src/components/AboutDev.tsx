import { Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TEAM_MEMBERS = [
  { name: "Ying Chen Leu", role: "Founder and Developer" },
  { name: "Wiktor Waligora", role: "Co-founder" },
  { name: "Julien Nowak", role: "Co-founder" },
  { name: "Bianca Nusca Dagon", role: "Secretary" },
] as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AboutDev = () => {
  return (
    <div className="min-h-screen bg-[#0A0D17] text-[#D8DEDE] overflow-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(168, 211, 204, 0.15), transparent),
              radial-gradient(ellipse 60% 40% at 80% 50%, rgba(168, 211, 204, 0.06), transparent)
            `,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#A8D3CC]/20 mb-6">
            <Users className="w-7 h-7 text-[#A8D3CC]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-syncopate bg-gradient-to-r from-[#D8DEDE] to-[#A8D3CC] bg-clip-text text-transparent mb-4">
            About Sapex
          </h1>
          <p className="text-lg text-[#D8DEDE]/80 max-w-2xl mx-auto leading-relaxed">
            A youth-led initiative building a safe, supportive platform for
            students to learn, connect, and grow.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-[#0C111C]/80 p-8 md:p-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#A8D3CC]" />
              <span className="text-sm font-medium uppercase tracking-wider text-[#A8D3CC]">
                Our mission
              </span>
            </div>
            <p className="text-[#D8DEDE]/90 leading-relaxed text-lg">
              Sapex exists to give every student access to peer-led academic
              help and wellness support within their own school community. We
              believe in connection over isolation—and that young people, when
              supported, can achieve more together.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
            The team
          </h2>
          <p className="text-[#D8DEDE]/70 text-center mb-12 max-w-xl mx-auto">
            The people behind the platform.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-white/10 bg-[#0C111C] p-6 hover:border-[#A8D3CC]/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#A8D3CC]/20 flex items-center justify-center shrink-0 text-[#A8D3CC] font-semibold text-lg font-syncopate">
                    {getInitials(member.name)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-lg truncate">
                      {member.name}
                    </h3>
                    <p className="text-[#A8D3CC] text-sm mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#D8DEDE]/70 mb-6">
            Want to bring Sapex to your school?
          </p>
          <Button
            asChild
            className="bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#D8DEDE] hover:text-[#2D4F53]"
          >
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutDev;
