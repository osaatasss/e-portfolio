interface PlaceholderProps {
  label: string;
  minHeight?: number;
  image?: string;
}

const Placeholder = ({ label, minHeight = 150, image }: PlaceholderProps) => (
  <div
    className="relative w-full h-full flex items-end justify-start border-[1.5px] border-ink overflow-hidden"
    style={{ minHeight }}
  >
    {image ? (
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    ) : (
      <div className="ph-hatch absolute inset-0" />
    )}
    <span className="relative font-mono text-[10px] uppercase tracking-[0.06em] bg-ink text-paper px-2 py-1 m-2">
      {label}
    </span>
  </div>
);

export default Placeholder;
