import React from "react";
import HeroCarousel from "../Components/HeroCaraousel";
import TrendingProducts from "../Components/TrendingProducts";
import AboutPage from "../sections/AboutPage";
import ServicesPage from "../sections/ServicesPage";
import BlogPage from "../sections/BlogPage";
import ContactPage from "../sections/ContactPage";

const HomePage = () => {
  return (
    <div>
      <HeroCarousel />
      <TrendingProducts />
      <AboutPage />
      <ServicesPage />
      <BlogPage />
      <ContactPage />
    </div>
  );
};

export default HomePage;
