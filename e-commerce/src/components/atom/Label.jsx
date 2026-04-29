export default function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="text-base tracking-tightest">
      {children}
    </label>
  );
}
