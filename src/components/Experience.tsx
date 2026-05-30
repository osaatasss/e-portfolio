const XP = [
  {
    when:  '2026',
    title: 'Full-Stack Engineer Intern (16 weeks)',
    org:   'Play It, Kortrijk',
    desc:  'Optimized and expanded a core web application by architecting an extensive onboarding wizard to streamline new organization sign-ups. Driven by user experience and system health, ' +
        'I systematically redesigned outdated UI components, implemented demanded functionalities, and executed performance tuning to improve application responsiveness.',
  },
  {
    when:  '2023 — Present',
    title: 'Applied Computer Science Studies',
    org:   'Howest University of Applied Sciences, Brugge',
    desc:  'Coursework across software architecture, databases, DDD, microservices, algorithms, and web development.',
  },

];

const Experience = () => (
  <section id="xp" className="border-b-2 border-ink py-[64px]">
    <div className="max-w-[1180px] mx-auto px-8">

      <div className="flex items-baseline gap-[18px] mb-10">
        <span className="font-mono text-[13px] text-rust font-bold">05</span>
        <span
          className="font-display font-extrabold uppercase tracking-[-0.01em] leading-none"
          style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
        >
          Experience
        </span>
        <span className="flex-1 h-[2px] bg-ink self-center" />
      </div>

      <div className="rv">
        {XP.map(({ when, title, org, desc }, i) => (
          <div
            key={title}
            className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 py-[26px] ${i > 0 ? 'border-t border-ink' : ''}`}
          >
            <div className="font-mono text-[12px] uppercase tracking-[0.04em] text-mute">
              {when}
            </div>
            <div>
              <h3 className="font-display font-extrabold text-[24px] uppercase leading-none mb-1">
                {title}
              </h3>
              <div className="font-mono text-[13px] text-rust mb-[10px]">{org}</div>
              <p className="text-[18px] text-ink-soft max-w-[54ch]">{desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Experience;
