import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === category && product._id !== currentProductId
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {relatedProducts.map((product, index) => (
          <div key={index} className="h-full bg-white p-2">
            <ProductItem
              id={product._id}
              image_url={product.image_url}
              name={product.name}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
