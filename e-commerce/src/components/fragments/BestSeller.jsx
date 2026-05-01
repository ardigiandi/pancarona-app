import { Link } from "react-router";
import CardLayouts from "../layouts/CardLayouts";
import ProductCard from "../molecule/ProductCard";
import { formatPrice } from "@/utils/formatPrice";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";

export default function BestSeller() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const bestSellerProducts = [...products]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 8);

  return (
    <CardLayouts title="Best Seller" detail="See All Product" path="/list/best">
      <div className="mx-auto mt-6 ml-2 lg:ml-10">
        <div className="flex flex-nowrap overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth no-scrollbar px-5">
          {loading
            ? [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
            : bestSellerProducts.map((product) => {
                if (!product.slug) return null;
                return (
                  <Link key={product.id} to={`products/${product.slug}`}>
                    <ProductCard
                      image={product.images?.[0]}
                      name={product.name}
                      price={formatPrice(product.price)}
                    />
                  </Link>
                );
              })}
        </div>
      </div>
    </CardLayouts>
  );
}
