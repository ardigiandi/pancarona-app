import { Link, useNavigate } from "react-router";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";

export default function Cart({ cart }) {
  const { changeQty, removeItem } = useCart();

  const navigate = useNavigate()

  const totalItems = cart.reduce((a, b) => a + b.qty, 0);
  const totalPrice = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div className="mt-12.5 flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row justify-between gap-10">

        <div className="w-full lg:w-[70%]">
          <h1 className="text-base font-medium">Cart ({cart.length})</h1>

          {cart.length === 0 && (
            <p className="text-center mt-10 text-abu">Cart kamu kosong 🛒</p>
          )}

          <div className="flex flex-col gap-5 mt-8">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row gap-6 items-center border-2 border-abuborder w-full px-5 py-3.5 rounded-2xl"
              >
                <img src={item.image} alt={item.name} className="w-37.5 rounded-lg" />

                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg font-medium">{item.name}</h1>
                      <p className="text-sm text-abu">Size, {item.size}</p>
                    </div>

                    <button onClick={() => removeItem(item.id, item.size)}>
                      <img src="/assets/trash.svg" alt="hapus" className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <h1 className="text-lg font-semibold">{formatPrice(item.price)}</h1>

                    <div className="flex items-center gap-4 border-2 border-abuborder px-4 py-2 rounded-full">
                      <button onClick={() => changeQty(item.id, item.size, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => changeQty(item.id, item.size, 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 h-fit mt-14 p-8 rounded-2xl border-abuborder w-full lg:w-80">
          <h1 className="text-xl font-medium">Order Summary</h1>

          <div className="flex justify-between mt-4">
            <span className="text-abu">Subtotal ({totalItems} items)</span>
            <span className="font-medium">{formatPrice(totalPrice)}</span>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <button
            onClick={() => navigate('/checkout')}
              disabled={cart.length === 0}
              className={`rounded-full py-4 text-lg font-medium text-white ${
                cart.length === 0 ? "bg-gray-400" : "bg-maroon hover:bg-maroon/90"
              }`}
            >
              Continue to Checkout
            </button>

            <Link
              to="/"
              className="border-2 border-maroon text-center rounded-full py-4 text-lg font-medium text-maroon hover:bg-maroon hover:text-white transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}