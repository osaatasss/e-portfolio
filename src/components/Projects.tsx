import Placeholder from './Placeholder';
import howestPrime from '../assets/howest-prime.png';
import futbololoLeagues from '../assets/futbololo-leagues.png';

const PROJECTS = [
  {
    num: 'P/01',
    title: 'Howest Prime Cinema',
    desc: 'Howestprime is a cloud-native, distributed cinema application built to demonstrate scalable microservices and automated cloud engineering. The back-end leverages Hexagonal Architecture (Ports & Adapters) and event-driven communication to ensure strict decoupling and avoid distributed monolith bottlenecks. On the frontend, user-facing clients seamlessly consume the microservice APIs. ' +
        'The entire infrastructure is automated via Infrastructure as Code (IaC), containerized, orchestrated, and deployed through automated CI/CD pipelines featuring real-time system monitoring.',
    tags: ['ASP.NET Core', 'LavinMQ', 'PostgreSQL', 'Docker', "TS", "Blazor"],
    ph: 'Movie management client',
    image: howestPrime,
  },
  {
    num: 'P/02',
    title: 'Futbololo',
    desc: 'Developed an interactive Football Manager clone using ASP.NET Core and Blazor. The application features a match simulation engine that processes attribute-based logic to calculate 90-minute match events and final results. ' +
        'On the management side, I built complete workflows for squad selection, formation setups, and tracking player morale and fitness. ' +
        'Additionally, I implemented a custom transfer market to facilitate direct player transfers, leveraging Blazor\'s component-based UI to deliver a clean, statistics-heavy dashboard experience.',
    tags: ['ASP.NET', 'Blazor', 'PostgreSQL', 'Docker'],
    ph: 'Futbololo match simulator',
    image:futbololoLeagues,
  },
];

const Projects = () => (
  <section id="work" className="border-b-2 border-ink py-[64px]">
    <div className="max-w-[1180px] mx-auto px-8">

      <div className="flex items-baseline gap-[18px] mb-10">
        <span className="font-mono text-[13px] text-rust font-bold">02</span>
        <span
          className="font-display font-extrabold uppercase tracking-[-0.01em] leading-none"
          style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
        >
          Selected Projects
        </span>
        <span className="flex-1 h-[2px] bg-ink self-center" />
      </div>

      {PROJECTS.map(({ num, title, desc, tags, ph, image }, i) => (
        <article
          key={num}
          className={`proj-row grid grid-cols-1 md:grid-cols-[64px_1.1fr_1fr] gap-7 py-[30px] rv ${i > 0 ? 'border-t border-ink' : ''}`}
        >
          <div className="font-mono text-[13px] text-rust md:pt-[6px]">{num}</div>

          <div>
            <h3
              className="font-display font-extrabold uppercase leading-none mb-3"
              style={{ fontSize: 'clamp(24px, 3vw, 34px)' }}
            >
              {title}
            </h3>
            <p className="text-[18px] max-w-[42ch] text-ink-soft">{desc}</p>
            <div className="flex flex-wrap gap-2 mt-[14px]">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[11px] uppercase tracking-[0.04em] border-[1.5px] border-ink px-2 py-[3px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <Placeholder label={ph} image={image} />
          </div>
        </article>
      ))}

    </div>
  </section>
);

export default Projects;
