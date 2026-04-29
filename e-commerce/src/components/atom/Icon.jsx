export default function Icon({image}) {
  return (
    <img
      src={image}
      alt="icon"
      className="absolute left-4 top-1/2 -translate-y-1/2"
    />
  );
}
