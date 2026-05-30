const Footer = () => (
  <footer className="border-t-2 border-ink py-[30px]">
    <div className="max-w-[1180px] mx-auto px-8 flex justify-between gap-4 flex-wrap font-mono text-[11px] uppercase tracking-[0.06em] text-mute">
      <span>© 2026 Robert Mihai Apostol</span>
      <span>
        <a
          href="https://github.com/osaatasss"
          className="text-ink no-underline border-b border-rust hover:text-rust transition-colors duration-200"
          aria-label="GitHub profile"
        >
          GitHub
        </a>
        {' · '}
        <a
          href="https://www.linkedin.com/in/robert-apostol-4a3992386/"
          className="text-ink no-underline border-b border-rust hover:text-rust transition-colors duration-200"
          aria-label="LinkedIn profile"
        >
          LinkedIn
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;
