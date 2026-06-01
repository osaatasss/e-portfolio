const FACTS = [
  { k: 'Based in',    v: '[ Roeselare, Belgium ]'     },
  { k: 'Focus',       v: 'Full-stack'         },
  { k: 'Primary',     v: 'C# · Java · React'              },
  { k: 'Also writes', v: 'TypeScript · Python · Vue'    },
  { k: 'Looking for', v: 'Job opportunities'        },
];

const About = () => (
  <section id="about" className="border-b-2 border-ink py-[64px]">
    <div className="max-w-[1180px] mx-auto px-8">

      <div className="flex items-baseline gap-[18px] mb-10">
        <span className="font-mono text-[13px] text-rust font-bold">01</span>
        <span
          className="font-display font-extrabold uppercase tracking-[-0.01em] leading-none"
          style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
        >
          About
        </span>
        <span className="flex-1 h-[2px] bg-ink self-center" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[48px] items-start">

        <div className="rv">
          <p className="text-[22px] leading-[1.5] mb-[18px] max-w-[46ch]">
            <span className="dropcap" aria-hidden="true">I</span>
            'm a software engineering student who got hooked on the backend the moment I realised
            most of the interesting problems live behind the API, I stopped fighting CSS and started
            detangling complex domains.
          </p>
          <p className="text-[22px] leading-[1.5] mb-[18px] max-w-[46ch]">
            I like clean architecture, microservices and UX oriented frontend design.
            Lately that means a lot of ASP.NET Core, React,
            and the occasional FastAPI service.
          </p>
          <p className="text-[22px] leading-[1.5] max-w-[46ch]">
            Outside of work, I enjoy riding my motorcycle, playing football, and developing side projects.
          </p>
        </div>

        <aside className="rv border-2 border-ink" aria-label="Quick facts">
          {FACTS.map(({ k, v }, i) => (
            <div
              key={k}
              className={`flex justify-between gap-[14px] px-4 py-3 font-mono text-[12px] uppercase tracking-[0.04em] ${i < FACTS.length - 1 ? 'border-b border-ink' : ''}`}
            >
              <span className="text-mute">{k}</span>
              <span className="text-right text-ink">{v}</span>
            </div>
          ))}
        </aside>

      </div>
    </div>
  </section>
);

export default About;
