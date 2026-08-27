import { motion } from 'framer-motion';
import TimelineItem from '../components/TimelineItem';
import { BookOpen, Users, Briefcase, Lightbulb } from 'lucide-react';

export default function Journey() {
  const roles = [
    {
      title: 'Lead Teacher cum Trainer',
      subtitle: 'CoderOgres | Nov 2023 – Nov 2024',
      description:
        'Taught Python programming fundamentals. Built structured lesson plans and hands-on coding exercises. Analyzed learner performance data and learning patterns, identified gaps and tailored instruction accordingly. Created structured documentation and instructional materials. Supported knowledge sharing across course modules.',
      skills: [
        'Python Teaching',
        'Curriculum Development',
        'Student Engagement',
        'Mentoring',
        'Communication',
      ],
      icon: <BookOpen size={14} className="text-cosmic-black" />,
    },
    {
      title: 'Senior Lead Teacher cum Trainer',
      subtitle: 'CoderOgres | Nov 2024 – Aug 2026',
      description:
        'Led end-to-end design and roadmap for Machine Learning, Deep Learning and AI curriculum tracks. Taught AI, Machine Learning, Deep Learning, backend web development, Linux and Advanced Python. Worked with US and Indian clients. Guided learners through real-world AI/ML capstone projects. Built quantitative KPI frameworks and translated results into actionable insights.',
      skills: [
        'AI Curriculum Design',
        'ML Teaching',
        'Leadership',
        'Program Design',
        'Stakeholder Communication',
      ],
      icon: <Users size={14} className="text-cosmic-black" />,
    },
    {
      title: 'Senior Relationship Manager',
      subtitle: 'CoderOgres | Aug 2026 – Present',
      description:
        'Currently focusing on relationship management, stakeholder collaboration, and business context while actively building technical depth in Data Analytics, Business Analytics, Data Science and AI.',
      skills: [
        'Stakeholder Management',
        'Business Communication',
        'Relationship Building',
        'Problem Solving',
        'Data Analytics',
      ],
      icon: <Briefcase size={14} className="text-cosmic-black" />,
      isCurrent: true,
    },
  ];

  const nextSteps = [
    'Data Analytics',
    'Business Analytics',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
  ];

  return (
    <div className="min-h-screen px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#A8A8B7]">
              02 — Journey
            </div>
            <h1 className="text-[clamp(2.7rem,5vw,5rem)] tracking-[-0.06em] text-cosmic-light">
              A career built on understanding.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#A8A8B7]">
              Every role taught me a different way of understanding people, problems, and
              possibilities — and each chapter brought me closer to the work I want to do next.
            </p>
          </motion.div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-0">
              {roles.map((role, index) => (
                <TimelineItem
                  key={index}
                  title={role.title}
                  subtitle={role.subtitle}
                  description={role.description}
                  skills={role.skills}
                  icon={role.icon}
                  index={index}
                  isLast={index === roles.length - 1}
                  isCurrent={role.isCurrent}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-[#A8A8B7]">
                Where I am going next
              </div>
              <h2 className="text-[clamp(2.4rem,4vw,4rem)] tracking-[-0.05em] text-cosmic-light">
                Structured learning for deeper signals.
              </h2>
            </motion.div>

            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="ambient-panel flex items-center gap-4 rounded-[22px] p-4"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-[#8FA8FF]" />
                  <div className="flex-grow text-lg text-cosmic-white">{step}</div>
                  {index < nextSteps.length - 1 && <div className="text-[#A8A8B7]">↓</div>}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="ambient-panel mt-12 rounded-[28px] p-6 md:p-8"
            >
              <div className="flex gap-4">
                <Lightbulb className="mt-1 text-[#8FA8FF]" size={22} />
                <div>
                  <div className="mb-2 text-[0.65rem] uppercase tracking-[0.24em] text-[#A8A8B7]">
                    Current direction
                  </div>
                  <p className="text-base leading-relaxed text-[#A8A8B7]">
                    I am combining my background in learning, relationships, and business context with
                    technical depth in data and AI to move from understanding information to shaping
                    better decisions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
