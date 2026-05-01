import { Link } from "react-router";
import CardLayouts from "../layouts/CardLayouts";
import ProductCard from "../molecule/ProductCard";
import { formatPrice } from "@/utils/formatPrice";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";

export default function NewArrival() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const newArrivalProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <CardLayouts title="New Arrival" detail="See All Product" path="/list/new">
      <div className="mx-auto mt-6 ml-2 lg:ml-10">
        <div className="flex flex-nowrap overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth no-scrollbar px-5">
          {loading
            ? [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
            : newArrivalProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.slug}`}>
                  <ProductCard
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
