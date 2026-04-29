import { Link } from "react-router";

export default function CardDetailLayouts({ children }) {
  return (
    <div className="max-w-6xl mx-auto mt-16 lg:mt-25 px-5 lg:px-0">
      {/* breadcrumb */}
      <div className="flex gap-2">
        <Link to="/" className="text-lg tracking-tightest">
          Home
        </Link>
        <span>/</span>
        <Link to="#" className="text-lg font-medium tracking-tightest">
          Product
        </Link>
      </div>

      {/* title */}
      <div className="lg:mt-25 mt-16 w-full lg:w-176.25">
        <h1 className="text-3xl font-semibold tracking-tightest">PRODUCT</h1>

        <p className="text-sm lg:text-base tracking-tightest mt-4 text-abu">
          A curated collection of casual wear that blends comfort with modern
          style. From clothing and outerwear to accessories, made for those who
          want to look good and feel confident every day.
        </p>
      </div>

      {children}
    </div>
  );
}
