export default function Skills() {
  const groups = [
    {
      title: 'Programming',
      skills: ['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Bash'],
    },
    {
      title: 'Data & Analytics',
      skills: ['SQL', 'MySQL', 'Pandas', 'NumPy', 'ETL', 'Data Modelling'],
    },
    {
      title: 'BI & Reporting',
      skills: ['Tableau', 'KPI Design', 'Dashboards', 'Statistical Analysis'],
    },
    {
      title: 'Machine Learning',
      skills: ['Scikit-learn', 'Regression', 'Classification', 'Clustering'],
    },
    {
      title: 'AI & NLP',
      skills: ['Generative AI', 'LLMs', 'Prompt Engineering', 'NLP'],
    },
    {
      title: 'Engineering',
      skills: ['Git', 'Docker', 'Linux', 'Flask', 'React', 'Next.js'],
    },
    {
      title: 'Professional Skills',
      skills: ['Leadership', 'Training', 'Communication', 'Relationship Management'],
    },
  ];

  return (
    <div className="min-h-screen px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 max-w-3xl">
          <div className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#A8A8B7]">
            03 — Skills
          </div>
          <h1 className="text-[clamp(2.7rem,5vw,5rem)] tracking-[-0.06em] text-cosmic-light">
            A technical toolkit for human problems.
          </h1>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group, index) => (
            <div
              key={group.title}
              className="ambient-panel rounded-[28px] p-6"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-5 text-[0.66rem] uppercase tracking-[0.24em] text-[#A8A8B7]">
                {group.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-[#A8A8B7]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
