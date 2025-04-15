import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    backendUrl,
    token,
    userId,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleWheel = (event) => {
    event.target.blur();
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!emailRegex.test(formData.email.trim()))
      errors.email = "Invalid email format";
    if (!formData.street.trim()) errors.street = "Street is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.zipcode.trim()) errors.zipcode = "ZIP code is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (formErrors) {
      alert(Object.values(formErrors).join("\n"));
      return;
    }

    setIsSubmitting(true);

    try {
      if (!userId) throw new Error("User not authenticated");
      if (Object.keys(cartItems).length === 0) throw new Error("Cart is empty");
      const orderItems = [];
      for (const productId in cartItems) {
        const manufacturers = cartItems[productId];
        for (const manufacturer in manufacturers) {
          const quantity = manufacturers[manufacturer];
          if (quantity > 0) {
            const product = products.find((p) => p._id === productId);
            if (product) {
              orderItems.push({
                product_id: parseInt(productId),
                manufacturer,
                quantity,
                unit_price: product.price,
              });
            }
          }
        }
      }
      const totalAmount = getCartAmount() + delivery_fee;
      const orderData = {
        user_id: userId,
        total_amount: totalAmount,
        payment_method: "COD",
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        street: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zip_code: formData.zipcode.trim(),
        country: formData.country.trim(),
        items: orderItems,
      };
      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders", {
          state: { orderNumber: response.data.orderNumber, success: true },
        });
      } else {
        throw new Error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).join(
          "\n"
        );
        alert(`Please fix these errors:\n${errorMessages}`);
      } else {
        alert(
          `Failed to place order: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-14 min-h-[80vh] border-t">
      <div className="w-full sm:max-w-[480px]">
        <div className="text-2xl mb-6">
          <Title text1={"DELIVERY"} text2={" INFORMATION"} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="w-full px-3 py-2 border focus:outline-none border-gray-800"
              type="text"
              placeholder="First name"
              required
            />
            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className=" w-full px-3 py-2 border focus:outline-none border-gray-800"
              type="text"
              placeholder="Last name"
              required
            />
          </div>
          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="w-full px-3 py-2 border focus:outline-none border-gray-800"
            type="email"
            placeholder="Email address"
            required
          />
          <input
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="w-full px-3 py-2 border focus:outline-none border-gray-800"
            type="text"
            placeholder="Street"
            required
          />
          <div className="flex gap-4">
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="w-full px-3 py-2 border focus:outline-none border-gray-800"
              type="text"
              placeholder="City"
              required
            />
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="w-full px-3 py-2 border focus:outline-none border-gray-800"
              type="text"
              placeholder="State"
              required
            />
          </div>
          <div className="flex gap-4">
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="w-full px-3 py-2 border focus:outline-none border-gray-800 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              placeholder="ZIP code"
              onWheel={handleWheel}
              required
            />
            <input
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="w-full px-3 py-2 border focus:outline-none border-gray-800"
              type="text"
              placeholder="Country"
              required
            />
          </div>
          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="w-full px-3 py-2 border focus:outline-none border-gray-800 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="tel"
            placeholder="Phone"
            onWheel={handleWheel}
            required
          />
        </div>
      </div>
      <form onSubmit={onSubmitHandler} className="w-full sm:max-w-[450px]">
        <div className="mb-8">
          <CartTotal />
        </div>
        <div className="mb-8">
          <div className="text-2xl mb-4">
            <Title text1={"PAYMENT"} text2={" METHOD"} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-not-allowed opacity-50">
              <div className="min-w-3.5 h-3.5 border rounded-full"></div>
              <span className="ml-4">Credit Card</span>
            </div>
            <div className="flex items-center gap-3 border p-2 px-3 cursor-not-allowed opacity-50">
              <div className="min-w-3.5 h-3.5 border rounded-full"></div>
              <span className="ml-4">Apple Pay</span>
            </div>
            <div className="flex items-center gap-3 border p-2 px-3">
              <div className="min-w-3.5 h-3.5 border rounded-full bg-black"></div>
              <span className="ml-4">Cash on Delivery (COD)</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white px-8 py-3 text-sm hover:bg-opacity-90 transition-colors"
          disabled={isSubmitting || Object.keys(cartItems).length === 0}
        >
          {" "}
          {isSubmitting ? "PROCESSING..." : "PLACE ORDER"}
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
