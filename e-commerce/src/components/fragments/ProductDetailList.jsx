import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { getProductBySlug } from "@/services/productService";

export default function ProductDetailList() {
  const { slug } = useParams();
  const { addItem: addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!slug) return;

    getProductBySlug(slug)
      .then((data) => setProduct(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedSize(null);
  }, [product]);

  if (!slug) return <p>Slug tidak ditemukan</p>;
  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product tidak ditemukan</p>;

  const images = product.images || [];
  const sizes = product.sizes || [];

  const totalStock = sizes.reduce((total, item) => total + item.stock, 0);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Pilih size dulu ya");
      return;
    }

    const sizeData = sizes.find((s) => s.size === selectedSize);

    addToCart({
      productId: product.id,
      name: product.name,
      image: images[0],
      price: product.price,
      size: selectedSize,
      qty: 1,
      stock: sizeData?.stock ?? 0,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 px-5 lg:px-0">
      {/* Breadcrumb */}
      <div className="flex gap-2">
        <Link to="/" className="text-lg tracking-tightest">
          Home
        </Link>
        <span>/</span>
        <Link to="#" className="text-lg tracking-tightest">
          Product
        </Link>
        <span>/</span>
        <Link to="#" className="text-lg font-medium tracking-tightest">
          Product Detail
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row mt-16 gap-10 items-start">
        {/* Images */}
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-2xl w-full">
            <img
              src={images[currentIndex]}
              alt={product.name}
              className="w-full h-165 object-cover"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-3 px-3 py-2 w-full">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`border-2 rounded-lg overflow-hidden transition ${
                    currentIndex === index
                      ? "border-maroon"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`preview ${index + 1}`}
                    className="w-37.5 h-37.5 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl lg:text-4xl font-medium tracking-tightest leading-10 lg:leading-12">
            {product.name}
          </h1>
          <p className="mt-6 text-xl font-semibold tracking-tightest leading-6">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm mt-2 font-medium text-abu">
            Stock: {totalStock}
          </p>

          {/* Size Selector */}
          <div className="flex flex-col gap-3 mt-8">
            <h1 className="text-base tracking-tightest leading-6">
              Select Size:{" "}
              {selectedSize && (
                <span className="font-semibold text-maroon">
                  {selectedSize}
                </span>
              )}
            </h1>
            <div className="flex flex-wrap gap-4 mt-4">
              {sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  disabled={s.stock === 0}
                  className={`border px-8 py-3 w-25 rounded-full cursor-pointer transition-colors ${
                    selectedSize === s.size
                      ? "bg-maroon text-white border-maroon"
                      : "bg-abuabu text-abu border-transparent"
                  } ${s.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="text-xl font-semibold tracking-tightest leading-5">
                    {s.size}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col lg:flex-row gap-1.5 mt-8">
            <button
              onClick={handleAddToCart}
              className={`px-28 text-white text-center text-lg font-medium py-3.5 tracking-tightest rounded-full leading-6 transition-colors ${
                added ? "bg-green-600" : "bg-maroon hover:bg-maroon/90"
              }`}
            >
              {added ? "Added" : "Add to Cart"}
            </button>
            <button className="bg-white border-2 border-maroon px-10 text-maroon tracking-tightest text-center text-lg font-medium py-3.5 rounded-full leading-6 hover:bg-maroon hover:text-white transition-colors">
              Buy Now
            </button>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-6 mt-12">
            <h1 className="text-lg tracking-tightest font-medium leading-6">
              Description & Fit : {product.name}
            </h1>
            <p className="text-base text-abu tracking-tightest leading-6">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
