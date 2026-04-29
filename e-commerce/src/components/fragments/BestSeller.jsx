import { Link } from "react-router";
import CardLayouts from "../layouts/CardLayouts";
import ProductCard from "../molecule/ProductCard";
import { products } from "@/data/products";
import { formatPrice } from "@/utils/formatPrice";

export default function BestSeller() {
  const bestSellerProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 8);

  return (
    <CardLayouts title="Best Seller" detail="See All Product" path="/list/best">
      <div className="mx-auto mt-6 ml-2 lg:ml-10">
        <div className="flex flex-nowrap overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth no-scrollbar px-5">
          {bestSellerProducts.map((product) => (
            <Link to={`products/${product.slug}`}>
              <ProductCard key={product.id} 
                image={product.images[0]}
                name={product.name}
                price={formatPrice(product.price)}
              />
            </Link>
          ))}
        </div>
      </div>
    </CardLayouts>
  );
}
