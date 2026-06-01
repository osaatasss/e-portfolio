import Placeholder from './Placeholder';
import HTF from './../assets/HTF.jpg';
import deepSeek from './../assets/deepseek.jpg';
import natoCybersec from './../assets/nato-cybersec.jpeg';
import ipv6 from './../assets/ipv6.png';

const EVENTS = [
  {
    type: 'Hackathon',
    date: '12 nov 2025 ',
    title: 'Hack The Future Antwerp',
    desc: 'Compete in the Flexso "S.O.S. Abyss" challenge during the Hack the Future hackathon in Antwerp. Tasked with a rapid-response scenario to "repair and escape" a compromised deep-sea research station, ' +
        'I developed a full-stack solution under strict time constraints. Using TypeScript, a Node.js middleware framework, and a frontend MVC architecture, ' +
        'I engineered an operational dashboard capable of processing real-time environmental data and orchestrating recovery workflows, demonstrating rapid problem-solving and full-stack adaptability.',
    img:HTF,
    imgLabel: 'Hackathon',
  },
  {
    type: 'Tech & Meet',
    date: '2025',
    title: 'DeepSeek Uncovered ',
    desc: 'Attending the "DeepSeek Uncovered" session at HOWEST with Dimitri Casier offered an eye-opening look at China’s open-source challenger to GPT-4. ' +
        'The live demos of its reasoning and code-generation capabilities highlighted exactly how fast the software engineering landscape is shifting. ' +
        'What resonated most was the broader discussion on AI ethics, transparency, and geopolitical competition. ' +
        'As a Software Engineering student, staying tuned into these major tech trends is essential for shaping my future career.',
    img:deepSeek,
    imgLabel: 'ChatGPT Killer?',
  },
  {
    type: 'Tech & Meet',
    date: '2025',
    title: "The Birth of NATO's Cyber Defense",
    desc: 'On December 2nd last year, I attended the HOWEST Tech & Meet session on the birth of NATO’s Cyber Defence, presented by Martin De Pauw. ' +
        'The talk highlighted how cybersecurity evolved from a niche technical issue into a borderless, global necessity that affects everyone today. ' +
        'It was fascinating to learn how NATO officially recognized cyberspace as an operational domain in 2016, alongside land, sea, and air. ' +
        'Hearing about the vital collaboration between military and civilian experts perfectly illustrated the sheer complexity of modern cyber resilience.',
    img:natoCybersec,
    imgLabel: 'NATO Cyber Defense pledge',
  },
  {
    type: 'Tech & Meet',
    date: '2025',
    title: 'The Wonderful World of IPv6',
    desc: 'On November 25th last year, I attended a HOWEST meetup focused on the critical transition from IPv4 to IPv6. ' +
        'The session offered great insight into modern networking infrastructure, detailing the necessity of IPv6, migration challenges, and how companies handle the switchover today.',
    img:ipv6,
    imgLabel: 'IPv6 transition',
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
        {EVENTS.map(({ type, date, title, desc, img, imgLabel }) => (
          <article key={title} className="border-r border-b border-ink">
            <div className="border-b-[1.5px] border-ink">
              <Placeholder label={imgLabel} minHeight={200} image={img} />
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
