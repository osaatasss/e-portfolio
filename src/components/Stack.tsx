const CATEGORIES = [
  { title: 'Backend',           items: ['ASP.NET Core', 'Java Spring Boot', 'FastAPI', 'Blazor', 'Deno'] },
  { title: 'Frontend',          items: ['React', 'Vue', 'TypeScript']                            },
  { title: 'Data',              items: ['SQL databases', 'NoSQL databases']                       },
  { title: 'Infra & Messaging', items: ['Docker', 'LavinMQ']                                     },
];

const Stack = () => (
  <section id="stack" className="border-b-2 border-ink py-[64px]">
    <div className="max-w-[1180px] mx-auto px-8">

      <div className="flex items-baseline gap-[18px] mb-10">
        <span className="font-mono text-[13px] text-rust font-bold">03</span>
        <span
          className="font-display font-extrabold uppercase tracking-[-0.01em] leading-none"
          style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
        >
          The Stack
        </span>
        <span className="flex-1 h-[2px] bg-ink self-center" />
      </div>

      <div className="rv grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-ink">
        {CATEGORIES.map(({ title, items }) => (
          <div key={title} className="border-r border-b border-ink px-4 pt-[18px] pb-[22px]">
            <h4 className="font-mono text-[11px] tracking-[0.08em] uppercase text-rust mb-4 pb-[10px] border-b border-ink">
              {title}
            </h4>
            <ul className="list-none p-0 m-0">
              {items.map(item => (
                <li key={item} className="tech-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Stack;
