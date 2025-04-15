import React from "react";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../Components/NewsletterBox";

const Content = () => {
  return (
    <div className="border-t pt-10">
      <div className="text-center mb-12">
        <div className="text-3xl md:text-4xl">
          <Title text1={"CONTACT"} text2={"  US"} />
        </div>
      </div>
      <div className="flex justify-center my-8">
        <img className="w-full max-w-[480px]" src={assets.contact_us} />
      </div>
      <div className="text-center my-8">
        <p className="font-semibold text-lg text-gray-600 mb-4">Our Store</p>
        <p className="text-sm text-gray-500 mb-2">
          Karpatská 12
          <br />
          821 05 Bratislava, Slovenská republika
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Tel: +1-556-643-9910
          <br />
          Email: info@autodiely.sk
        </p>
      </div>
      <div className="text-center mt-12 mb-8">
        <p className="font-medium text-xl text-gray-800 mb-2">
          Careers at Autodiely.sk
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Learn more about our teams and job openings.
        </p>
        <button className="border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300">
          Explore Jobs
        </button>
      </div>
      <div className="mt-12 mb-20">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default Content;
