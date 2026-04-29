import { Link } from "react-router";

export default function CardLayouts({ title, detail, children, path }) {
  return (
    <div className="mt-14">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tightest">{title}</h1>
        <Link to={path} className="text-base font-semibold tracking-tightest cursor-pointer">
          {detail}
        </Link>
      </div>

      {children}
    </div>
  );
}
