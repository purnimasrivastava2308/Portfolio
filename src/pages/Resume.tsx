import { motion } from 'framer-motion';
import { FileDown, Award, BookOpen, Briefcase } from 'lucide-react';

export default function Resume() {
  const education = [
    {
      school: 'BITSoM (Masai)',
      degree: 'Business Analytics with Generative AI and Agentic AI',
      year: 'Jul 2026',
      cgpa: '8.7',
      coursework: [
        'Hypothesis Testing',
        'A/B Testing',
        'Regression Analysis',
        'Data Visualization (Tableau)',
        'Python for GenAI',
        'Machine Learning',
        'Neural Networks & Deep Learning',
        'LLMs & Prompt Engineering',
        'AI Agents',
      ],
    },
    {
      school: 'Banaras Hindu University (BHU)',
      degree: 'M.Sc. Computer Science',
      year: '2022',
      cgpa: '8.7',
    },
    {
      school: 'Banasthali Vidyapeeth',
      degree: 'B.Sc. Mathematics',
      year: '2020',
      cgpa: '8.9',
    },
  ];

  const certifications = [
    {
      title: 'Business Analytics in Generative AI and Agentic AI',
      issuer: 'BITSoM (Masai)',
      cgpa: '8.7',
      date: 'Jul 2026',
    },
    {
      title: 'Generative AI Workshop',
      issuer: 'GrowthSchool Outskill',
      date: '3-Day Workshop',
    },
  ];

  const experience = [
    {
      title: 'Senior Relationship Manager',
      company: 'CoderOgres',
      period: 'Aug 2026 – Present',
      highlights: [
        'Relationship management and stakeholder collaboration',
        'Building technical depth in Data Analytics and AI',
      ],
    },
    {
      title: 'Senior Lead Teacher cum Trainer',
      company: 'CoderOgres',
      period: 'Nov 2024 – Aug 2026',
      highlights: [
        'Led end-to-end design of ML, DL, and AI curriculum tracks',
        'Taught AI, ML, DL, backend web development, Linux, and Advanced Python',
        'Worked with US and Indian clients',
        'Guided learners through real-world AI/ML capstone projects',
        'Built quantitative KPI frameworks and translated insights to stakeholders',
      ],
    },
    {
      title: 'Lead Teacher cum Trainer',
      company: 'CoderOgres',
      period: 'Nov 2023 – Nov 2024',
      highlights: [
        'Taught Python programming fundamentals',
        'Built structured lesson plans and hands-on coding exercises',
        'Analyzed learner performance data and tailored instruction',
        'Created structured documentation and instructional materials',
      ],
    },
  ];

  const skills = {
    'Data Analysis': [
      'Data Cleaning',
      'Exploratory Data Analysis',
      'Statistical Analysis',
      'Anomaly Detection',
      'Custom Analysis',
    ],
    'Programming & Querying': [
      'Python',
      'SQL',
      'MySQL',
      'Linux',
      'Bash',
    ],
    'Spreadsheets': ['Excel', 'Google Sheets'],
    'Data Visualization & BI': ['Tableau'],
    'AI & Machine Learning': [
      'Machine Learning',
      'Deep Learning',
      'Artificial Intelligence',
      'Predictive Modeling',
      'Model Evaluation',
    ],
    'Business & Decision-Making': [
      'KPI Tracking',
      'Stakeholder Reporting',
      'Data-Driven Decision-Making',
      'Curriculum Design',
    ],
    'Soft Skills': [
      'Critical Thinking',
      'Problem Solving',
      'Adaptability',
      'Stakeholder Collaboration',
    ],
  };

  return (
    <div className="min-h-screen px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#A8A8B7]">
              09 – Resume
            </div>
            <h1 className="text-[clamp(2.7rem,5vw,5rem)] tracking-[-0.06em] text-cosmic-light">
              Professional Profile.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#A8A8B7]">
              Data Analyst | Business Analyst | Data Scientist
            </p>
          </motion.div>
        </section>

        {/* Experience */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <Briefcase className="text-[#8FA8FF]" size={24} />
            <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.05em] text-cosmic-light">
              Experience
            </h2>
          </div>

          <div className="space-y-6">
            {experience.map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="ambient-panel rounded-[24px] p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-lg tracking-[-0.04em] text-cosmic-light">{role.title}</h3>
                    <div className="text-[0.85rem] text-[#8FA8FF]">{role.company}</div>
                  </div>
                  <div className="text-sm text-[#A8A8B7]">{role.period}</div>
                </div>
                <ul className="space-y-2">
                  {role.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#A8A8B7]">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-[#B6A1D9] flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <BookOpen className="text-[#B6A1D9]" size={24} />
            <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.05em] text-cosmic-light">
              Education
            </h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="ambient-panel rounded-[24px] p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-lg tracking-[-0.04em] text-cosmic-light">{edu.school}</h3>
                    <div className="text-[0.85rem] text-[#B6A1D9]">{edu.degree}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#A8A8B7]">{edu.year}</div>
                    <div className="text-sm text-[#8FA8FF]">CGPA: {edu.cgpa}</div>
                  </div>
                </div>
                {edu.coursework && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-xs text-[#A8A8B7] font-medium mb-2">Relevant Coursework:</div>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-1 text-xs text-[#A8A8B7]"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <Award className="text-[#D8C7B5]" size={24} />
            <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.05em] text-cosmic-light">
              Certifications
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="ambient-panel rounded-[24px] p-6"
              >
                <h3 className="text-base tracking-[-0.04em] text-cosmic-light mb-2">{cert.title}</h3>
                <div className="text-sm text-[#B6A1D9]">{cert.issuer}</div>
                <div className="text-xs text-[#A8A8B7] mt-2">{cert.date}</div>
                {cert.cgpa && <div className="text-xs text-[#8FA8FF] mt-1">CGPA: {cert.cgpa}</div>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-20">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.05em] text-cosmic-light mb-8">
            Skills
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, skillList], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.05 }}
                className="ambient-panel rounded-[24px] p-6"
              >
                <h3 className="text-sm font-medium tracking-[-0.04em] text-cosmic-light mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-[#A8A8B7]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Download Button */}
        <section className="py-16 text-center border-t border-white/10">
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F7F5EF] px-8 py-3 text-sm font-medium text-[#070812] transition-all hover:-translate-y-0.5 hover:shadow-glow">
            <FileDown size={18} />
            Download Full Resume
          </button>
        </section>
      </div>
    </div>
  );
}
