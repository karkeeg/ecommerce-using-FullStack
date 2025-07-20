import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getAllProducts } from "../api/ProductApi";
import { API } from "../constants";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        if (data && !data.error) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const LoadingSkeleton = () => (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading amazing products...
        </p>
      </div>
    </section>
  );

  if (loading || products.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <section className="w-full  relative overflow-hidden">
      {/* Decorative Background */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
      </div> */}

      {/* Carousel */}
      <div className="relative z-10 py-6">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={true}
          interval={6000}
          swipeable
          emulateTouch
          className="hero-carousel"
        >
          {products.slice(0, 8).map((product, index) => (
            <div key={product._id} className="px-4 md:px-8">
              <div className="max-w-7xl mb-4 mx-auto">
                <div className="relative bg-white/80  rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                  <div className="absolute  inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>

                  <div className="relative md:flex md:items-center md:justify-between p-6 md:p-12 lg:p-16 gap-8 md:gap-12">
                    {/* Left - Content */}
                    <div className="md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left">
                      <div className="flex justify-center md:justify-start">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 shadow-sm border border-indigo-200/50">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {product.product_category?.category_name ||
                            "Featured"}
                        </span>
                      </div>

                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                        {product.product_name}
                      </h1>

                      <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                        {product.product_description}
                      </p>

                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          Rs. {product.product_price.toFixed(2)}
                        </span>
                        <div className="h-8 w-px bg-gray-300"></div>
                        <span className="text-sm text-gray-500 font-medium">
                          Best Price
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                        <Link
                          to={`/product/${product._id}`}
                          className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            View Details
                            <svg
                              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                      </div>
                    </div>

                    {/* Right - Image */}
                    <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 transform rotate-6"></div>
                        <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
                          <img
                            src={product.product_image}
                            alt={product.product_name}
                            className="h-[50vh] md:h-[60vh] w-full object-contain transform group-hover:scale-105 rounded transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-600 border border-gray-200">
                    {index + 1} / {Math.min(products.length, 8)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Carousel Custom Styling */}
      <style jsx>{`
        .hero-carousel .carousel-root {
          outline: none;
        }

        .hero-carousel .carousel .control-dots {
          bottom: 20px;
          margin: 0;
        }

        .hero-carousel .carousel .control-dots .dot {
          background: rgba(255, 255, 255, 0.5);
          border: 2px solid white;
          width: 12px;
          height: 12px;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .hero-carousel .carousel .control-dots .dot.selected {
          background: #4f46e5;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
