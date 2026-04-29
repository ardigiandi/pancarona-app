import { useState, useEffect } from "react";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router";
import InputField from "../molecule/InputField";
import { Button } from "../ui/button";

export default function Checkout({ cart }) {
  const navigate = useNavigate();

  const { clearCart } = useCart();

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("checkoutForm");
    return saved ? JSON.parse(saved) : { fullName: "", address: "", phone: "" };
  });

  useEffect(() => {
    localStorage.setItem("checkoutForm", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.address || !form.phone) {
      alert("Lengkapi semua data dulu ya!");
      return;
    }

    clearCart();
    navigate("/");
  };

  return (
    <div className="mt-12.5 flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div className="w-full lg:w-[65%]">
          <div className="flex flex-col gap-5 mt-8">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row gap-6 items-center border-2 border-abuborder w-full px-5 py-3.5 rounded-2xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-37.5 rounded-lg"
                />

                <div className="flex flex-col w-full">
                  <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between items-start">
                    <div className="flex flex-col gap-4 w-full lg:w-80">
                      <h1 className="text-xl font-medium tracking-tightest leading-6 lg:leading-7">
                        {item.name}
                      </h1>
                      <p>Size, {item.size}</p>
                    </div>
                    <h1 className="text-lg font-semibold tracking-tightest leading-6 lg:leading-7">
                      {item.qty} x {formatPrice(item.price)}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-2 w-full h-fit p-8 rounded-2xl border-abuborder lg:w-[35%]">
          <h1 className="text-xl font-medium tracking-tightest leading-5">
            Order Summary
          </h1>

          <div className="flex flex-col gap-6 mt-12">
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="Enter your name"
              image="/assets/user.svg"
              value={form.fullName}
              onChange={handleChange}
            />

            <InputField
              label="Address"
              name="address"
              type="text"
              placeholder="Enter your address"
              image="/assets/express.svg"
              value={form.address}
              onChange={handleChange}
            />

            <InputField
              label="Phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              image="/assets/call.svg"
              value={form.phone}
              onChange={handleChange}
            />

            <Button
              onClick={handleCheckout}
              className="bg-maroon text-center py-5 text-white font-medium rounded-full hover:bg-maroon/90 transition"
            >
              Checkout Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
