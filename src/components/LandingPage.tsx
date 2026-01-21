import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/sapexlogo.png";
import MetaBalls from "./ui/MetaBalls";
import CircularText from "./CircularText";

// Simple inline SVG icons to avoid new deps
function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.25a.75.75 0 0 1 .3.064l7.5 3.214a.75.75 0 0 1 .45.686V12c0 4.788-3.37 8.725-7.95 9.682a.75.75 0 0 1-.3 0C7.42 20.725 4.05 16.788 4.05 12V6.214a.75.75 0 0 1 .45-.686l7.5-3.214A.75.75 0 0 1 12 2.25Z" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M7.5 3.75h9a3.75 3.75 0 0 1 3.75 3.75v5.25A3.75 3.75 0 0 1 16.5 16.5H9.62l-3.37 2.527A1 1 0 0 1 5 18.166V7.5A3.75 3.75 0 0 1 8.75 3.75h-1.25Z" />
    </svg>
  );
}
function IconSparkles() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.48 3.5a.75.75 0 0 1 1.04 0l1.676 1.676a.75.75 0 0 0 .53.22h2.37a.75.75 0 0 1 .53 1.28l-1.676 1.676a.75.75 0 0 0-.22.53v2.37a.75.75 0 0 1-1.28.53l-1.676-1.676a.75.75 0 0 0-.53-.22h-2.37a.75.75 0 0 1-.53-1.28l1.676-1.676a.75.75 0 0 0 .22-.53v-2.37Z" />
      <path d="M5.25 12.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75v-1.5Zm8.25 6a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H14.25a.75.75 0 0 1-.75-.75v-1.5Z" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5c1.657 0 3 3.358 3 8.25s-1.343 8.25-3 8.25-3-3.358-3-8.25 1.343-8.25 3-8.25Zm7.938 8.25a8.466 8.466 0 0 1-2.38 5.25H6.442a8.466 8.466 0 0 1-2.38-5.25h15.876Z" />
    </svg>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0D17] text-[#D8DEDE] flex flex-col">
    

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24">
        <img src={Logo} alt="Sapex Logo" className="w-35 h-35 mb-5 animate-pulse" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D8DEDE] to-[#A8D3CC] bg-clip-text text-transparent">
          Welcome to <span className="font-syncopate">Sapex</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-[#D8DEDE]/90">
          A safe, supportive online community built for your school — where students can ask questions, post problems, and get help from your fellow peers.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:sapexglobalyouth@gmail.com@?subject=Bring Sapex to My Community&body=Name:%0D%0ASchool Name:%0D%0ACity:%0D%0ACountry:%0D%0AEmail Address:%0D%0AYour School Email Domain:%0D%0ADoes Your School use Google Sign In?:`}
          >
            <Button className="bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#D8DEDE] hover:text-[#2D4F53] transition-colors">Bring to Your School</Button>
          </a>

          <Button asChild variant="outline" className="border-[#A8D3CC] text-[#D8DEDE] hover:bg-[#A8D3CC] hover:text-[#2D4F53]">
            <Link to="/stillindevelopment">Find Your School</Link>
          </Button>
        </div>

        {/* Decorative metaballs + circular text */}
        <div className="relative w-full max-w-[900px] h-[440px] mt-10">
          <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden border border-white/10">
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
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <CircularText text="SAPEX BUILDS COMMUNITIES " onHover="goBonkers" spinDuration={30} className="custom-class" />
          </div>
        </div>

        {/* Trust bar / stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full">
          {[
            { label: "Schools on waitlist", value: "N/A" },
            { label: "Questions answered", value: "N/A" },
            { label: "Avg. response time", value: "N/A" },
            { label: "Student satisfaction", value: "N/A" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-semibold">{s.value}</div>
              <div className="text-xs text-[#D8DEDE]/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why students love Sapex</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Safe & Moderated",
                desc: "School-verified logins and gentle moderation keep things respectful.",
                Icon: IconShield,
              },
              {
                title: "Peer-to-Peer Help",
                desc: "Ask anonymously or as yourself and get answers fast.",
                Icon: IconChat,
              },
              {
                title: "Level Up Together",
                desc: "Share notes, guides, and tips that actually work.",
                Icon: IconSparkles,
              },
              {
                title: "For Every School",
                desc: "Custom spaces for clubs, grades, and subjects.",
                Icon: IconGlobe,
              },
            ].map(({ title, desc, Icon }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-[#0C111C] p-6">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                  <Icon />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-[#D8DEDE]/80">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Sapex works</h2>
          <ol className="grid md:grid-cols-3 gap-6 list-decimal list-inside">
            {[
              {
                step: 1,
                title: "Join with school email",
                text: "We verify you're from your school to keep the community safe.",
              },
              {
                step: 2,
                title: "Post or browse",
                text: "Ask a question, share a problem, or explore existing answers.",
              },
              {
                step: 3,
                title: "Get help fast",
                text: "Peers respond, you learn, everyone levels up.",
              },
            ].map(({ step, title, text }) => (
              <li key={title} className="rounded-2xl border border-white/10 bg-[#0C111C] p-6">
                <div className="text-xs tracking-wider text-[#A8D3CC]">STEP {step}</div>
                <div className="mt-2 font-semibold">{title}</div>
                <p className="mt-1 text-sm text-[#D8DEDE]/80">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex justify-center">
            <Button asChild className="bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#D8DEDE] hover:text-[#2D4F53]">
              <Link to="/stillindevelopment">See supported schools</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 border-t border-white/5 bg-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: "Is Sapex anonymous?",
                a: "You can post either as yourself or anonymously. Your google login verifies you're a real student first.",
              },
              {
                q: "How do schools get access?",
                a: "Ask an educator to contact us or hit 'Bring to Your School' above—we'll onboard you quickly.",
              },
              {
                q: "Is it free?",
                a: "Students can join free. Schools can optionally upgrade for moderation tools and insights.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-white/10 bg-[#0C111C] p-5 open:pb-4">
                <summary className="cursor-pointer select-none flex items-center justify-between">
                  <span className="font-medium">{q}</span>
                  <span className="text-[#A8D3CC] group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-[#D8DEDE]/80">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Sapex footer logo" className="w-6 h-6" />
            <span className="text-sm text-[#D8DEDE]/80">© {new Date().getFullYear()} Sapex</span>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="border-[#A8D3CC] text-[#D8DEDE] hover:bg-[#A8D3CC] hover:text-[#2D4F53]">
              <Link to="/stillindevelopment">Browse schools</Link>
            </Button>
            <a
              href={`mailto:shiroiyuzuru@gmail.com?subject=Bring Sapex to My Community&body=Name:%0D%0ASchool Name:%0D%0ACity:%0D%0ACountry:%0D%0AEmail Address:%0D%0AYour School Email Domain:%0D%0ADoes Your School use Google Sign In?:`}
            >
              <Button className="bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#D8DEDE] hover:text-[#2D4F53]">Get Sapex</Button>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
