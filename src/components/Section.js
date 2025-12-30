export default function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`
        w-screen h-screen shrink-0 flex items-left justify-end 
        backdrop-blur-lg bg-opacity-50
        ${className}
      `}
    >
      {children}
    </section>
  );
}
