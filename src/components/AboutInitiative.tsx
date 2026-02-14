import { motion } from "framer-motion";
import { Earth, BookOpen, Heart, Users } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
  hidden: {},
};

function AboutInitiative() {
  return (
    <div className="min-h-screen bg-[#0A0D17] text-[#D8DEDE] relative overflow-hidden pt-[100px]">
      {/* Background: subtle gradient orbs instead of busy icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#2D4F53]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#A8D3CC]/08 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#A8D3CC]/06 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pb-24">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {/* Hero */}
          <motion.section
            className="pt-12 pb-16 md:pt-16 md:pb-20 text-center"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#2D4F53]/60 border border-[#A8D3CC]/25 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <Earth className="w-10 h-10 md:w-12 md:h-12 text-[#A8D3CC]" />
            </motion.div>
            <p className="text-sm font-medium tracking-wider uppercase text-[#A8D3CC]/90 mb-3">
              Our story
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#D8DEDE] via-[#D8DEDE] to-[#A8D3CC] bg-clip-text text-transparent tracking-tight">
              Why We Started
            </h1>
            <p className="text-lg md:text-xl text-[#D8DEDE]/85 leading-relaxed max-w-2xl mx-auto">
              Sapex began to combat two critical gaps: a lack of human connection
              that fuels mental health struggles, and a lack of unity and
              collaboration among students.
            </p>
            <p className="mt-5 text-base text-[#D8DEDE]/75 leading-relaxed max-w-2xl mx-auto">
              Many young people feel isolated—at school, online, or in their own
              heads—without a safe place to reach out. Silos between classes,
              schools, and communities make it harder to learn together. Our
              initiative exists to restore real connection and build unity: peer
              support for academics and mental wellness, and collaboration
              across and within communities. We offer anonymous chat for
              non-academic issues so everyone can seek help without fear.
            </p>
          </motion.section>

          {/* Mission — quote-style block */}
          <motion.section
            className="relative rounded-2xl overflow-hidden"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative bg-[#0C111C]/90 border border-white/10 rounded-2xl p-8 md:p-10 pl-10 md:pl-12 hover:border-[#A8D3CC]/20 transition-colors"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-[#A8D3CC] to-[#2D4F53]" />
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#A8D3CC]/15 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#A8D3CC]" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                    The Mission
                  </h2>
                  <p className="text-[#D8DEDE]/90 leading-relaxed text-base md:text-lg">
                    We create a space where human connection comes first—so mental
                    health is supported through real peer relationships, not
                    isolation. We foster unity and collaboration so that
                    students learn together, help each other, and grow as a
                    community. Questions lead to understanding; challenges
                    become opportunities to connect and support one another.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Two pillars */}
          <section className="mt-16 md:mt-20">
            <motion.p
              className="text-center text-sm font-medium tracking-wider uppercase text-[#A8D3CC]/80 mb-8"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              What we stand for
            </motion.p>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="group relative rounded-2xl border border-white/10 bg-[#0C111C]/80 p-8 md:p-8 overflow-hidden"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#A8D3CC]/05 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-[#A8D3CC]/15 flex items-center justify-center mb-5">
                    <Heart className="w-7 h-7 text-[#A8D3CC]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Human Connection & Mental Health
                  </h3>
                  <p className="text-[#D8DEDE]/85 leading-relaxed text-sm md:text-base">
                    Isolation worsens mental health; connection heals. We provide
                    peer support for wellness, stress, and belonging—so students
                    have someone to talk to and a community that cares.
                    Anonymous options keep it safe for everyone.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group relative rounded-2xl border border-white/10 bg-[#0C111C]/80 p-8 md:p-8 overflow-hidden"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#A8D3CC]/05 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-[#A8D3CC]/15 flex items-center justify-center mb-5">
                    <Users className="w-7 h-7 text-[#A8D3CC]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Unity & Collaboration
                  </h3>
                  <p className="text-[#D8DEDE]/85 leading-relaxed text-sm md:text-base">
                    We break down silos and bring students together—within
                    schools and across communities. Share knowledge, solve
                    problems, and support each other in one collaborative
                    space. Your contributions build a stronger, more united
                    learning environment for everyone.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutInitiative;
