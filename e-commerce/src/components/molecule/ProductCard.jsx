import { formatPrice } from "@/utils/formatPrice";

export default function ProductCard({ image, name, price }) {
  return (
    <div className="snap-center shrink-0 w-56 lg:w-66.25 h-99  flex flex-col justify-between">
      <div className="lg:w-66.25 lg:h-66.25 w-56 overflow-hidden">
        <img src={image} alt="product" className="w-full h-full object-cover" />
      </div>

      <h1 className="text-base text-center text-abu font-medium tracking-tightest px-6">
        {name}
      </h1>

      <p className="text-base text-abu text-center font-semibold tracking-tightest">
        {price}
      </p>
    </div>
  );
}
