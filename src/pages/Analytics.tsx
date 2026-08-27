export default function Analytics() {
  const patterns = [
    {
      label: 'Scatter',
      title: 'Observe the field',
      copy: 'Start with individual points before forcing a conclusion.',
    },
    {
      label: 'Cluster',
      title: 'Find natural groups',
      copy: 'Look for behavior that gathers, separates, or repeats.',
    },
    {
      label: 'Trend',
      title: 'Follow direction',
      copy: 'Translate movement into a clear business question.',
    },
    {
      label: 'Outlier',
      title: 'Respect the anomaly',
      copy: 'Treat unusual signals as context, not noise.',
    },
  ];

  const signals = [
    'Business question -> data definition -> cleaning -> exploration -> insight -> decision',
    'I like understanding the context before choosing a metric or dashboard.',
    'Strong analytics is about clarity, not complexity.',
  ];

  return (
    <div className="min-h-screen px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 max-w-3xl">
          <div className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[#A8A8B7]">
            05 - Analytics
          </div>
          <h1 className="text-[clamp(2.7rem,5vw,5rem)] tracking-[-0.06em] text-cosmic-light">
            Turning data into clear decisions.
          </h1>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {patterns.map((pattern) => (
            <div key={pattern.label} className="ambient-panel rounded-[24px] p-5">
              <div className="mb-5 text-[0.65rem] uppercase tracking-[0.24em] text-[#A8A8B7]">
                {pattern.label}
              </div>
              <div className="mb-3 text-xl tracking-[-0.04em] text-cosmic-light">{pattern.title}</div>
              <p className="text-sm leading-relaxed text-[#A8A8B7]">{pattern.copy}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="ambient-panel rounded-[30px] p-6 md:p-8">
            <div className="mb-6 text-[0.65rem] uppercase tracking-[0.24em] text-[#A8A8B7]">
              Analytical philosophy
            </div>
            <ul className="space-y-4">
              {signals.map((signal) => (
                <li key={signal} className="flex items-start gap-3 text-base leading-relaxed text-[#A8A8B7]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#B6A1D9]" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ambient-panel rounded-[30px] p-6 md:p-8">
            <div className="mb-5 text-[0.65rem] uppercase tracking-[0.24em] text-[#A8A8B7]">
              Core workflow
            </div>
            <div className="space-y-3">
              {['Question', 'Data', 'Clean', 'Explore', 'Visualize', 'Decide'].map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-cosmic-light">
                    {index + 1}
                  </div>
                  <span className="text-sm uppercase tracking-[0.14em] text-[#A8A8B7]">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
