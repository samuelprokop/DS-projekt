import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const formatted = [];
    for (const [itemId, manufacturers] of Object.entries(cartItems)) {
      for (const [manufacturer, quantity] of Object.entries(manufacturers)) {
        if (quantity > 0) {
          formatted.push({ _id: itemId, manufacturer, quantity });
        }
      }
    }
    setCartData(formatted);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={" CART"} />
      </div>

      <div>
        {cartData.map((item) => {
          const product = products.find((p) => p._id === item._id);
          if (!product) return null;

          return (
            <div
              key={`${item._id}-${item.manufacturer}`}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={product.image_url} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {product.price}
                      {currency}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.manufacturer}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(event) =>
                  updateQuantity(
                    item._id,
                    item.manufacturer,
                    Number(event.target.value)
                  )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                value={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.manufacturer, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
              disabled={cartData.length === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
