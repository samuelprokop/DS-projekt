import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image_url, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="text-gray-700 cursor-pointer block w-full"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden h-48 w-full flex items-center justify-center bg-white">
        <img
          className="max-h-full max-w-full object-contain hover:scale-110 transition ease-in-out"
          src={image_url}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {price}
        {currency}
      </p>
    </Link>
  );
};

export default ProductItem;
