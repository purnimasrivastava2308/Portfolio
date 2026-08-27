export default function About() {
  return (
    <div className="min-h-screen px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-10 pb-12 pt-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <div className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#A8A8B7]">
              01 — About
            </div>
            <h1 className="text-[clamp(2.7rem,5vw,5rem)] tracking-[-0.06em] text-cosmic-light">
              Beyond the resume.
            </h1>
          </div>
          <p className="text-lg leading-relaxed text-[#A8A8B7]">
            I am interested in the space where people, systems, and meaning meet — where thoughtful
            communication becomes useful insight, and useful insight becomes better decisions.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            ['People-first', 'I care about understanding context before solving problems.'],
            ['Analytical', 'I like turning ambiguity into structure, and structure into clarity.'],
            ['Grounded', 'I believe calm thinking, humility, and curiosity are real strengths.'],
          ].map(([title, copy]) => (
            <div key={title} className="ambient-panel rounded-[28px] p-6">
              <div className="mb-4 text-[0.65rem] uppercase tracking-[0.24em] text-[#A8A8B7]">
                {title}
              </div>
              <p className="text-base leading-relaxed text-[#A8A8B7]">{copy}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="ambient-panel rounded-[32px] p-7 md:p-9">
            <div className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-[#A8A8B7]">
              My perspective
            </div>
            <p className="text-xl leading-relaxed text-cosmic-white md:text-2xl">
              I believe the strongest work happens when technical understanding is paired with human
              understanding. Numbers reveal patterns, but people reveal the story behind the pattern.
            </p>
          </div>

          <div className="ambient-panel rounded-[32px] p-7">
            <div className="mb-4 text-[0.65rem] uppercase tracking-[0.24em] text-[#A8A8B7]">
              The formula
            </div>
            <div className="editorial-serif text-5xl italic text-cosmic-warm">People × Data × Curiosity</div>
          </div>
        </section>
      </div>
    </div>
  );
}
