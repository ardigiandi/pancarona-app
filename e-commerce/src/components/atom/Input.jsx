export default function Input({type, placeholder, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...props}
      className="w-full py-3 pl-10 pr-4 border border-abuborder rounded-full outline-none"
    />
  );
}
