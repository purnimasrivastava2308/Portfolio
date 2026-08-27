import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const strengths = [
    {
      icon: Database,
      title: 'PEOPLE',
      subtitle: 'human connection',
      skills: ['Teaching', 'Communication', 'Relationship Management', 'Leadership'],
      glow: 'from-[#D8C7B5]/18 via-[#B6A1D9]/10 to-transparent',
    },
    {
      icon: Code,
      title: 'DATA',
      subtitle: 'clarity through structure',
      skills: ['SQL', 'Python', 'Analytics', 'Business Intelligence'],
      glow: 'from-[#8FA8FF]/18 via-[#B6A1D9]/10 to-transparent',
    },
    {
      icon: Zap,
      title: 'INTELLIGENCE',
      subtitle: 'patterns into possibility',
      skills: ['Machine Learning', 'AI', 'Generative AI', 'Data Science'],
      glow: 'from-[#B6A1D9]/18 via-[#8FA8FF]/10 to-transparent',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden text-cosmic-white">
      <section className="relative flex min-h-[88vh] items-center justify-center px-4 pt-16 pb-20 md:px-8">
        <motion.div
          className="relative z-10 mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#A8A8B7]"
          >
            Senior Relationship Manager
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-4 text-[clamp(4rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-cosmic-light"
          >
            PURNIMA
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mb-6 max-w-[780px] text-[clamp(2.2rem,4vw,4rem)] leading-[0.96] tracking-[-0.05em] text-cosmic-white"
          >
            <span className="block">From understanding people</span>
            <span className="editorial-serif text-cosmic-warm block italic">to understanding patterns.</span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-[680px] text-base leading-relaxed text-[#A8A8B7] md:text-lg"
          >
            I work at the intersection of people, business, and technology — turning complex information into clear decisions and human-centered insight.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to="/journey"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F7F5EF] px-6 py-3 text-sm font-medium text-[#070812] transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              Explore my journey
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/3 px-6 py-3 text-sm font-medium text-cosmic-white transition-all hover:border-[#B6A1D9]/60 hover:bg-[#B6A1D9]/5"
            >
              View my work
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative px-4 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <div className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-[#A8A8B7]">
                How I think
              </div>
              <h2 className="text-[clamp(2.4rem,4vw,4rem)] leading-none tracking-[-0.05em] text-cosmic-light">
                People. Data. Intelligence.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-[#A8A8B7]">
              Three dimensions of the work I love — understanding people, finding patterns, and exploring what technology can make possible.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {strengths.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="ambient-panel relative overflow-hidden rounded-[28px] p-6"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.glow}`} />
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="rounded-full border border-white/10 bg-white/5 p-2 text-[#F7F5EF]">
                      <pillar.icon size={18} />
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-[0.24em] text-[#A8A8B7]">
                      {pillar.subtitle}
                    </span>
                  </div>
                  <h3 className="mb-5 text-2xl font-medium tracking-[-0.05em] text-cosmic-light">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-3 text-sm text-[#A8A8B7]">
                    {pillar.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#B6A1D9]" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <div className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-[#A8A8B7]">
              Path
            </div>
            <h2 className="text-[clamp(2.4rem,4vw,4rem)] tracking-[-0.05em] text-cosmic-light">
              A career shaped by connection.
            </h2>
          </motion.div>

          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-[9px] md:left-1/2 top-4 bottom-4 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-[#B6A1D9]/60 to-transparent" />

            <div className="space-y-8">
              {[
                { title: 'Lead Teacher & Trainer', label: 'FOUNDATION', description: 'Teaching technology. Simplifying complexity. Learning to communicate clearly.' },
                { title: 'Senior Lead Teacher & Trainer', label: 'LEADERSHIP', description: 'Mentoring, curriculum design, and building learning systems that scale.' },
                { title: 'Senior Relationship Manager', label: 'CURRENT ROLE', description: 'Working closely with clients, teams, and business context to translate needs into action.' },
                { title: 'Business Analytics • Data Science • AI', label: 'EXPLORING', description: 'Current learning direction focused on structure, predictive thinking, and intelligent systems.' },
              ].map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: isLeft ? -18 : 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="relative grid items-center gap-4 md:gap-6 grid-cols-[20px_1fr] md:grid-cols-[1fr_24px_1fr]"
                  >
                    {/* Left Column (Desktop only for even items) */}
                    {isLeft ? (
                      <div className="hidden md:block md:col-start-1 md:row-start-1 md:pr-8 md:text-right">
                        <div className="ambient-panel rounded-[24px] p-5">
                          <div className="mb-2 text-[0.64rem] uppercase tracking-[0.24em] text-[#A8A8B7]">{item.label}</div>
                          <h3 className="mb-2 text-xl tracking-[-0.04em] text-cosmic-light">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-[#A8A8B7]">{item.description}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:block md:col-start-1 md:row-start-1" />
                    )}

                    {/* Center Dot (Always at column 1 on mobile, column 2 on desktop) */}
                    <div className="relative z-10 mx-auto flex h-5 w-5 items-center justify-center rounded-full border border-[#B6A1D9]/40 bg-[#070812] shadow-[0_0_24px_rgba(182,161,217,0.4)] col-start-1 md:col-start-2 md:row-start-1">
                      <div className="h-2 w-2 rounded-full bg-[#B6A1D9]" />
                    </div>

                    {/* Right Column (Odd items on desktop, all items on mobile) */}
                    <div className={`col-start-2 ${!isLeft ? 'md:col-start-3 md:row-start-1 md:pl-8 md:text-left' : 'md:hidden'}`}>
                      <div className="ambient-panel rounded-[24px] p-5">
                        <div className="mb-2 text-[0.64rem] uppercase tracking-[0.24em] text-[#A8A8B7]">{item.label}</div>
                        <h3 className="mb-2 text-xl tracking-[-0.04em] text-cosmic-light">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-[#A8A8B7]">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-[#A8A8B7]">
            Let’s connect
          </div>
          <h2 className="mb-5 text-[clamp(2.2rem,4vw,3.5rem)] tracking-[-0.05em] text-cosmic-light">
            Thoughtful work needs a thoughtful conversation.
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-[#A8A8B7]">
            I enjoy working where people, business understanding, and intelligent systems meet.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[#B6A1D9]/40 bg-[#B6A1D9]/8 px-6 py-3 text-sm font-medium text-cosmic-light transition-all hover:border-[#B6A1D9]/70 hover:bg-[#B6A1D9]/12"
          >
            Get in touch
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
