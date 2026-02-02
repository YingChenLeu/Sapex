import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/sapexlogo.png";
import MetaBalls from "./ui/MetaBalls";
import CircularText from "./CircularText";

const BRIDGE_PILLARS = [
  {
    letter: "B",
    word: "BUILD",
    description: "Building a safe haven for the current youth.",
  },
  {
    letter: "R",
    word: "RECOGNIZE",
    description: "Recognize the strength found in connection.",
  },
  {
    letter: "I",
    word: "INNOVATION",
    description: "Innovate new ways for support.",
  },
  {
    letter: "D",
    word: "DEVELOP",
    description: "Develop character, resilience, and purpose.",
  },
  {
    letter: "G",
    word: "GUIDE",
    description: "Guide peers with patience, wisdom and care.",
  },
  {
    letter: "E",
    word: "EMBRACE",
    description: "Embrace diversity, individuality, and the future.",
  },
] as const;

// Simple inline SVG icons to avoid new deps
function IconShield() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M12 2.25a.75.75 0 0 1 .3.064l7.5 3.214a.75.75 0 0 1 .45.686V12c0 4.788-3.37 8.725-7.95 9.682a.75.75 0 0 1-.3 0C7.42 20.725 4.05 16.788 4.05 12V6.214a.75.75 0 0 1 .45-.686l7.5-3.214A.75.75 0 0 1 12 2.25Z" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M7.5 3.75h9a3.75 3.75 0 0 1 3.75 3.75v5.25A3.75 3.75 0 0 1 16.5 16.5H9.62l-3.37 2.527A1 1 0 0 1 5 18.166V7.5A3.75 3.75 0 0 1 8.75 3.75h-1.25Z" />
    </svg>
  );
}
function IconSparkles() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M11.48 3.5a.75.75 0 0 1 1.04 0l1.676 1.676a.75.75 0 0 0 .53.22h2.37a.75.75 0 0 1 .53 1.28l-1.676 1.676a.75.75 0 0 0-.22.53v2.37a.75.75 0 0 1-1.28.53l-1.676-1.676a.75.75 0 0 0-.53-.22h-2.37a.75.75 0 0 1-.53-1.28l1.676-1.676a.75.75 0 0 0 .22-.53v-2.37Z" />
      <path d="M5.25 12.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75v-1.5Zm8.25 6a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H14.25a.75.75 0 0 1-.75-.75v-1.5Z" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5c1.657 0 3 3.358 3 8.25s-1.343 8.25-3 8.25-3-3.358-3-8.25 1.343-8.25 3-8.25Zm7.938 8.25a8.466 8.466 0 0 1-2.38 5.25H6.442a8.466 8.466 0 0 1-2.38-5.25h15.876Z" />
    </svg>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0D17] text-[#D8DEDE] flex flex-col">
      {/* Hero */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
          },
          hidden: {},
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={Logo}
            alt="Sapex Logo"
            className="w-35 h-35 mb-5 animate-pulse"
          />
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D8DEDE] to-[#A8D3CC] bg-clip-text text-transparent"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          Welcome to <span className="font-syncopate">Sapex</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-4 max-w-3xl text-[#D8DEDE]/90 leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          A comprehensive, secure platform designed exclusively for educational
          communities. Sapex empowers students to excel academically, support
          each other's wellness, and build meaningful connections within their
          school ecosystem.
        </motion.p>
        <motion.p
          className="text-base md:text-lg mb-8 max-w-3xl text-[#D8DEDE]/75 leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          From academic problem-solving to peer wellness support, Sapex creates
          a trusted environment where students can learn, grow, and thrive
          together.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.a
            href={`mailto:sapexglobalyouth@gmail.com?subject=Bring Sapex to My Community&body=Name:%0D%0ASchool Name:%0D%0ACity:%0D%0ACountry:%0D%0AEmail Address:%0D%0AYour School Email Domain:%0D%0ADoes Your School use Google Sign In?:`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#D8DEDE] hover:text-[#2D4F53] transition-colors">
              Bring to Your School
            </Button>
          </motion.a>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              variant="outline"
              className="border-[#A8D3CC] text-[#D8DEDE] hover:bg-[#A8D3CC] hover:text-[#2D4F53]"
            >
              <Link to="/stillindevelopment">Find Your School</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative metaballs + circular text */}
        <motion.div
          className="relative w-full max-w-[900px] h-[440px] mt-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
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
            <CircularText
              text="SAPEX BUILDS COMMUNITIES "
              onHover="goBonkers"
              spinDuration={30}
              className="custom-class"
            />
          </div>
        </motion.div>

        {/* Trust bar / stats */}
        <motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.8 },
            },
            hidden: {},
          }}
        >
          {[
            {
              label: "Schools on waitlist",
              value: "N/A",
              desc: "Growing community",
            },
            {
              label: "Questions answered",
              value: "N/A",
              desc: "Peer solutions",
            },
            { label: "Avg. response time", value: "N/A", desc: "Fast support" },
            {
              label: "Student satisfaction",
              value: "N/A",
              desc: "Trusted platform",
            },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#A8D3CC]/30 transition-colors"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -2 }}
            >
              <div className="text-2xl font-semibold mb-1">{s.value}</div>
              <div className="text-xs text-[#D8DEDE]/70 font-medium">
                {s.label}
              </div>
              <div className="text-xs text-[#D8DEDE]/50 mt-1">{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Our Purpose & Organization */}
      <section
        id="about"
        className="py-16 md:py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-white/5"
      >
        <motion.div
          className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Purpose</h2>
          <p className="text-lg text-[#D8DEDE]/90 leading-relaxed mb-6">
            Sapex is a youth-led initiative created to give students a safe,
            supportive space to learn, connect, and grow. We believe that every
            young person deserves access to peer-led academic help and wellness
            support within their own school community.
          </p>
          <p className="text-base text-[#D8DEDE]/80 leading-relaxed max-w-3xl mx-auto">
            Our platform is built for schools and by people who care about
            student well-being and academic success. We combine verified school
            access, peer helpers, and structured support so that students can
            thrive together—not in isolation.
          </p>
        </motion.div>
      </section>

      {/* BRIDGE Framework - animated */}
      <section id="bridge" className="py-16 md:py-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Our framework
            </h2>
            <p className="text-lg text-[#D8DEDE]/80 max-w-2xl mx-auto">
              The values that guide everything we do at Sapex
            </p>
          </motion.div>

          <motion.div
            className="rounded-3xl border-2 border-[#A8D3CC]/30 bg-[#0C111C]/80 p-6 md:p-8 shadow-xl shadow-[#A8D3CC]/5"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                },
                hidden: {},
              }}
            >
              {["B", "R", "I", "D", "G", "E"].map((letter) => (
                <motion.span
                  key={letter}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-4xl md:text-5xl font-bold font-syncopate bg-gradient-to-b from-[#D8DEDE] to-[#A8D3CC] bg-clip-text text-transparent"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BRIDGE_PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.word}
                  className="rounded-xl border border-white/10 bg-[#0A0D17] p-4 md:p-5 hover:border-[#A8D3CC]/40 transition-colors"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 rounded-lg bg-[#A8D3CC]/20 flex items-center justify-center text-lg font-bold text-[#A8D3CC] font-syncopate">
                      {pillar.letter}
                    </span>
                    <span className="font-semibold text-white">
                      {pillar.word}
                    </span>
                  </div>
                  <p className="text-sm text-[#D8DEDE]/80 leading-relaxed mt-1">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-16 md:py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-white/5"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why students love Sapex
            </h2>
            <p className="text-lg text-[#D8DEDE]/80 max-w-3xl mx-auto">
              A comprehensive platform that addresses both academic excellence
              and personal well-being, all within a secure, school-verified
              environment.
            </p>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.15 },
              },
              hidden: {},
            }}
          >
            {[
              {
                title: "Safe & Moderated",
                desc: "School-verified Google authentication ensures only verified students can access your community. Built-in moderation tools and respectful community guidelines maintain a positive, constructive environment for everyone.",
                Icon: IconShield,
              },
              {
                title: "Academic Center",
                desc: "Post questions across Mathematics, Science, English, Social Sciences, and Foreign Languages. Get detailed explanations from peers, share study resources, and collaborate on problem-solving in real-time chat sessions.",
                Icon: IconChat,
              },
              {
                title: "Wellness Support",
                desc: "Connect with trained Sapex Helpers for peer support on friendship building, stress management, burnout recovery, study habits, and more. Personality-matched connections ensure meaningful, empathetic conversations.",
                Icon: IconSparkles,
              },
              {
                title: "Custom Study Session Rooms",
                desc: "Create or join dedicated study rooms by subject, project, or topic. Collaborate with peers in real time, share screens and notes, and stay focused in structured sessions—all within your school's secure environment.",
                Icon: IconGlobe,
              },
            ].map(({ title, desc, Icon }) => (
              <motion.div
                key={title}
                className="rounded-2xl border border-white/10 bg-[#0C111C] p-6 hover:border-[#A8D3CC]/30 transition-colors"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                  <Icon />
                </div>
                <h3 className="font-semibold mb-3 text-lg">{title}</h3>
                <p className="text-sm text-[#D8DEDE]/80 leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="py-16 md:py-24 border-t border-white/5"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Sapex works
            </h2>
            <p className="text-lg text-[#D8DEDE]/80 max-w-2xl mx-auto">
              Getting started is simple. Join your school's community and start
              connecting with peers in minutes.
            </p>
          </motion.div>
          <motion.ol
            className="grid md:grid-cols-3 gap-6 list-decimal list-inside mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
              },
              hidden: {},
            }}
          >
            {[
              {
                step: 1,
                title: "Join with school email",
                text: "Sign in using your school's Google account. Our verification system ensures only verified students from your institution can access your community, maintaining security and trust.",
              },
              {
                step: 2,
                title: "Explore or contribute",
                text: "Browse the Academic Center for study help across all subjects, access Wellness Support for peer guidance, or become a Sapex Helper to support others. Post questions anonymously or with your profile.",
              },
              {
                step: 3,
                title: "Connect and grow",
                text: "Receive timely responses from peers and Sapex Helpers. Engage in real-time chat discussions, share resources, and build lasting connections within your school community.",
              },
            ].map(({ step, title, text }) => (
              <motion.li
                key={title}
                className="rounded-2xl border border-white/10 bg-[#0C111C] p-6 hover:border-[#A8D3CC]/30 transition-colors"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-xs tracking-wider text-[#A8D3CC] font-semibold">
                  STEP {step}
                </div>
                <div className="mt-2 font-semibold text-lg mb-2">{title}</div>
                <p className="mt-1 text-sm text-[#D8DEDE]/80 leading-relaxed">
                  {text}
                </p>
              </motion.li>
            ))}
          </motion.ol>
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button
              asChild
              className="bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#D8DEDE] hover:text-[#2D4F53]"
            >
              <Link to="/stillindevelopment">See supported schools</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-16 md:py-24 border-t border-white/5 bg-white/5"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#D8DEDE]/80">
              Everything you need to know about Sapex
            </p>
          </motion.div>
          <motion.div
            className="space-y-4 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
              hidden: {},
            }}
          >
            {[
              {
                q: "Is Sapex anonymous?",
                a: "Yes, you have full control over your privacy. You can post questions and problems either anonymously or with your profile visible. All users are verified through their school Google account first, ensuring a safe community while respecting your choice to remain anonymous when needed.",
              },
              {
                q: "How do schools get access?",
                a: "Schools can request access by having an educator or administrator contact us through the 'Bring to Your School' button above. We'll work with your IT department to set up Google authentication, configure your school's community settings, and provide training materials. The onboarding process typically takes 1-2 weeks.",
              },
              {
                q: "Is it free?",
                a: "Yes, Sapex is completely free for all students. Schools can optionally upgrade to premium plans that include advanced moderation tools, analytics dashboards, custom branding, and priority support. However, all core features—academic help, wellness support, and community building—remain free for students.",
              },
              {
                q: "What is a Sapex Helper?",
                a: "Sapex Helpers are students who volunteer to provide peer support and guidance. They undergo a brief orientation and commit to supporting others with respect, empathy, and patience. Helpers can assist with both academic questions and wellness support, creating a culture of mutual aid within your school community.",
              },
              {
                q: "What subjects are supported?",
                a: "The Academic Center supports all major subject areas including Mathematics, Science (Biology, Chemistry, Physics), English Language and Literature, Social Sciences (History, Geography, Economics), and Foreign Languages. You can also post general academic questions or study strategy inquiries.",
              },
            ].map(({ q, a }) => (
              <motion.details
                key={q}
                className="group rounded-xl border border-white/10 bg-[#0C111C] p-5 open:pb-4 hover:border-[#A8D3CC]/30 transition-colors"
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.35 }}
              >
                <summary className="cursor-pointer select-none flex items-center justify-between">
                  <span className="font-medium text-lg">{q}</span>
                  <span className="text-[#A8D3CC] group-open:rotate-45 transition text-xl">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[#D8DEDE]/80 leading-relaxed">
                  {a}
                </p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer / CTA */}
      <motion.footer
        className="border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Sapex footer logo" className="w-6 h-6" />
            <span className="text-sm text-[#D8DEDE]/80">
              © {new Date().getFullYear()} Sapex
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="border-[#A8D3CC] text-[#D8DEDE] hover:bg-[#A8D3CC] hover:text-[#2D4F53]"
            >
              <Link to="/stillindevelopment">Browse schools</Link>
            </Button>
            <a
              href={`mailto:shiroiyuzuru@gmail.com?subject=Bring Sapex to My Community&body=Name:%0D%0ASchool Name:%0D%0ACity:%0D%0ACountry:%0D%0AEmail Address:%0D%0AYour School Email Domain:%0D%0ADoes Your School use Google Sign In?:`}
            >
              <Button className="bg-[#A8D3CC] text-[#2D4F53] hover:bg-[#D8DEDE] hover:text-[#2D4F53]">
                Get Sapex
              </Button>
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default LandingPage;
