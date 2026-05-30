import Placeholder from './Placeholder';

const EVENTS = [
  {
    type: 'Conference',
    date: '[ Date ]',
    title: 'Backend & Cloud Conf',
    desc: 'Two days of talks on distributed systems and event-driven architecture. Came home with a notebook full of queue patterns I immediately tried to over-apply.',
  },
  {
    type: 'Hackathon',
    date: '12 nov 2025 ',
    title: 'Hack The Future Antwerp',
    desc: 'Compete in the Flexso "S.O.S. Abyss" challenge during the Hack the Future hackathon in Antwerp. Tasked with a rapid-response scenario to "repair and escape" a compromised deep-sea research station, ' +
        'I developed a full-stack solution under strict time constraints. Using TypeScript, a Node.js middleware framework, and a frontend MVC architecture, ' +
        'I engineered an operational dashboard capable of processing real-time environmental data and orchestrating recovery workflows, demonstrating rapid problem-solving and full-stack adaptability.',
  },
  {
    type: 'Meetup',
    date: '[ Date ]',
    title: '.NET User Group',
    desc: 'A local evening meetup on C# and the modern .NET ecosystem. Good talks, better hallway conversations about how people actually run things in production.',
  },
  {
    type: 'Workshop',
    date: '[ Date ]',
    title: 'Docker & Containers Workshop',
    desc: 'A hands-on day containerising real apps and untangling networking. The session that finally made multi-service local setups click for me.',
  },
];

const Events = () => (
  <section id="events" className="border-b-2 border-ink py-[64px]">
    <div className="max-w-[1180px] mx-auto px-8">

      <div className="flex items-baseline gap-[18px] mb-10">
        <span className="font-mono text-[13px] text-rust font-bold">04</span>
        <span
          className="font-display font-extrabold uppercase tracking-[-0.01em] leading-none"
          style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
        >
          Events Attended
        </span>
        <span className="flex-1 h-[2px] bg-ink self-center" />
      </div>

      <div className="rv grid grid-cols-1 md:grid-cols-2 border-t border-l border-ink">
        {EVENTS.map(({ type, date, title, desc }) => (
          <article key={title} className="border-r border-b border-ink">
            <div className="border-b-[1.5px] border-ink">
              <Placeholder label="drop: event photo" minHeight={200} />
            </div>
            <div className="px-[22px] pt-[20px] pb-[26px]">
              <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-rust mb-2 flex justify-between">
                <span>{type}</span>
                <span>{date}</span>
              </div>
              <h3 className="font-display font-extrabold text-[24px] uppercase leading-none mb-[10px]">
                {title}
              </h3>
              <p className="text-[17px] text-ink-soft max-w-[44ch]">{desc}</p>
            </div>
          </article>
        ))}
      </div>

    </div>
  </section>
);

export default Events;
