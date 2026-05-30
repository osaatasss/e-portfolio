const NAV = [
  { label: 'About',      href: '#about'  },
  { label: 'Projects',   href: '#work'   },
  { label: 'Stack',      href: '#stack'  },
  { label: 'Events',     href: '#events' },
  { label: 'Experience', href: '#xp'     },
  { label: 'CV',     href: '#resume' },
];

const Topbar = () => (
  <div className="sticky top-0 z-50 bg-paper border-b-2 border-ink">
    <div className="max-w-[1180px] mx-auto px-8 flex items-center justify-between h-[54px]">
      <span className="font-mono font-bold text-[13px] tracking-[0.04em] uppercase">
        Robert Mihai Apostol <span className="text-rust">Portfolio</span>
      </span>
      <nav className="hidden md:flex gap-[26px]" aria-label="Primary navigation">
        {NAV.map(({ label, href }) => (
          <a key={label} href={href} className="nav-link">
            {label}
          </a>
        ))}
      </nav>
    </div>
  </div>
);

export default Topbar;
