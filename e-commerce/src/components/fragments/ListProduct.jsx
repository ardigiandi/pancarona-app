import { useParams } from "react-router";
import { useState } from "react";
import ProductCard from "@/components/molecule/ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router";
import CardDetailLayouts from "../layouts/CardDetailLayouts";
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

  const productsPerPage = 16;

  // filter product
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

  // total page
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // pagination
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;

  const currentProducts = filteredProducts.slice(start, end);

  return (
    <CardDetailLayouts>
      {/* product list */}
      <div className="flex flex-wrap justify-center mt-25 gap-6">
        {currentProducts.map((product) => (
          <Link key={product.id} to={`/products/${product.slug}`}>
            <ProductCard
              image={product.images[0]}
              name={product.name}
              price={product.price}
            />
          </Link>
        ))}
      </div>

      {/* pagination */}
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
    </CardDetailLayouts>
  );
}
