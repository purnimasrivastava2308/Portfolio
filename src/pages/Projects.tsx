export default function Projects() {
  const projects = [
    {
      title: 'Retail Analytics Intelligence Platform',
      type: 'Data Architecture & BI',
      tech: 'MySQL | SQL | Tableau | Python',
      summary: 'Built an end-to-end retail analytics platform using a Medallion (Bronze/Silver/Gold) architecture to transform raw CRM and ERP data into a business-ready analytical model.',
      description: 'Designed a sales-centered Gold star schema with data quality validation and referential integrity checks, applying targeted indexing and year-based partitioning to feed Tableau dashboards and downstream ML workflows.',
      accent: 'from-[#8FA8FF]/15 via-[#B6A1D9]/10 to-transparent',
      path: '/projects/retail-analytics',
    },
    {
      title: 'Customer Churn Analysis',
      type: 'Predictive Modeling',
      tech: 'SQL | Python',
      summary: 'Conducted custom analysis using SQL and Python to identify anomalies and key churn drivers across customer segments.',
      description: 'Built a predictive model to quantify business impact of churn-driving factors, turning raw customer behavior into actionable business insights.',
      accent: 'from-[#B6A1D9]/15 via-[#8FA8FF]/10 to-transparent',
      path: '/projects/churn-analysis',
    },
  ];

  return (
    <div className="min-h-screen px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 max-w-3xl">
          <div className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#A8A8B7]">
            04 — Projects
          </div>
          <h1 className="text-[clamp(2.7rem,5vw,5rem)] tracking-[-0.06em] text-cosmic-light">
            Things I've built.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#A8A8B7]">
            Turning concepts into analytical systems.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="ambient-panel group relative overflow-hidden rounded-[30px] p-6 hover:border-[#B6A1D9]/60 transition-colors">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
              <div className="relative z-10">
                <div className="mb-2 text-[0.65rem] uppercase tracking-[0.24em] text-[#A8A8B7]">
                  {project.type}
                </div>
                <div className="mb-5 text-xs text-[#8FA8FF]">{project.tech}</div>
                <h2 className="mb-3 text-2xl tracking-[-0.05em] text-cosmic-light">{project.title}</h2>
                <p className="mb-4 text-base leading-relaxed text-[#A8A8B7]">{project.summary}</p>
                <p className="mb-6 text-sm leading-relaxed text-[#A8A8B7]">{project.description}</p>
                <a href={project.path} className="inline-flex items-center gap-2 text-sm text-cosmic-light hover:text-[#8FA8FF] transition-colors">
                  View case study <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
