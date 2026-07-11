export function TechnicalDivider() {
  return (
    <div aria-hidden="true" className="my-10 grid grid-cols-12 gap-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <span key={index} className={`h-px ${index % 3 === 0 ? "bg-[#35F06A]/70" : "bg-white/10"}`} />
      ))}
    </div>
  );
}
