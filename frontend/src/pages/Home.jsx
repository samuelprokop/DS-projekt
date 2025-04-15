import React from "react";
import Hero from "../Components/Hero";
import BestDeals from "../Components/BestDeals";
import BestSellers from "../Components/BestSellers";
import OurPolicy from "../Components/OurPolicy";
import NewsLetterbox from "../Components/NewsLetterbox";

const Home = () => {
  return (
    <div>
      <Hero />
      <BestDeals />
      <BestSellers />
      <OurPolicy />
      <NewsLetterbox />
    </div>
  );
};

export default Home;
