import { useParams } from "react-router";
import { useState, useEffect } from "react";
import ProductCard from "@/components/molecule/ProductCard";
import { Link } from "react-router";
import CardDetailLayouts from "../layouts/CardDetailLayouts";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import { getProducts } from "@/services/productService";
import { formatPrice } from "@/utils/formatPrice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "../ui/pagination";

export default function ListProduct() {
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 16;

  useEffect(() => {
    setPage(1); 
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [type]);

  let filteredProducts = [];

  if (type === "best") {
    filteredProducts = [...products].sort((a, b) => b.sold - a.sold);
  } else if (type === "new") {
    filteredProducts = [...products].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } else {
    filteredProducts = products;
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const currentProducts = filteredProducts.slice(start, end);

  return (
    <CardDetailLayouts>
      <div className="flex flex-wrap justify-center mt-25 gap-6">
        {loading
          ? [...Array(16)].map((_, i) => <ProductCardSkeleton key={i} />)
          : currentProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.slug}`}>
                <ProductCard
                  image={product.images[0]}
                  name={product.name}
                  price={formatPrice(product.price)}
                />
              </Link>
            ))}
      </div>

      {!loading && (
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(page - 1)}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(page + 1)}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </CardDetailLayouts>
  );
}
