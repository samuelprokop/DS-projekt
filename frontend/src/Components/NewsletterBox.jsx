import React from "react";

const NewsLetterbox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <hr className="border-gray-300 py-2" />
      <p className="text-2xl font-medium text-gray-800">
        Sign up for our newsletter and get 10% off your first purchase
      </p>
      <p className="text-gray-400 mt-3">
        Get daily information about our exclusive offers and updates
      </p>

      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 mx-auto my-6">
        <div className="flex flex-col sm:flex-row border">
          <input
            className="w-full outline-none py-4 px-3 border-b sm:border-b-0 sm:border-r border-gray-300"
            type="email"
            placeholder="Enter your e-mail"
            required
          />
          <button
            type="submit"
            className="bg-black text-white text-xs px-10 py-4 sm:py-4 whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </div>
      </form>

      <hr className="border-gray-300 py-5" />
    </div>
  );
};

export default NewsLetterbox;
