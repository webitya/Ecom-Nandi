import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import FeaturedProductData from "./FeaturedProductData";

export const FeaturedProduct = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default for large screens

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(4); // Desktop: 4 items
      else if (window.innerWidth >= 768) setItemsPerPage(2); // Tablet: 2 items
      else setItemsPerPage(1); // Mobile: 1 item
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(FeaturedProductData.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentProducts = FeaturedProductData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="mx-auto mt-4 p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50  shadow-lg">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="font-extrabold md:text-4xl text-4xl text-purple-700">
        Featured Products
        </h2>
      </div>

      {/* Carousel Content */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative w-full h-56 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                />
                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <StarFilled className="text-white" /> {product.rating || "4.5"}
                </div>
              </div>
              {/* Product Details */}
              <div className="mt-6 text-center">
                <h3 className="font-bold text-lg text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-3">
                  {product.discountPrice && (
                    <span className="line-through text-gray-400">
                      ₹{product.discountPrice}
                    </span>
                  )}
                  <span className="font-bold text-purple-700 ml-2">
                    ₹{product.price}
                  </span>
                </p>
                <button className="mt-4 px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-transform duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {currentPage > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-4 shadow-md hover:bg-purple-700 transition-transform duration-300"
          >
            <LeftOutlined style={{ fontSize: "20px" }} />
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-4 shadow-md hover:bg-purple-700 transition-transform duration-300"
          >
            <RightOutlined style={{ fontSize: "20px" }} />
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentPage
                ? "bg-purple-600 scale-110"
                : "bg-gray-300 hover:bg-purple-400"
            } transition-all duration-300`}
          ></div>
        ))}
      </div>
    </div>
  );
};
