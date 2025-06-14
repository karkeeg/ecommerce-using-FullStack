import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroCarousel = () => {
  return (
    <section className="relative h-[80vh] w-full">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        interval={4000}
        style={{ height: "80vh" }}
      >
        <div className="h-[80vh]">
          <img
            src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-[80vh]">
          <img
            src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80"
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-[80vh]">
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80"
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </div>
      </Carousel>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to BibekDev Store
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Discover quality products crafted with modern design and tech.
        </p>
        <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
