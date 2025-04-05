import React, { useState } from "react";
import image1 from "../assets/image1.jpg"; // تأكد من المسار الصحيح
import image2 from "../assets/image2.jpg"; // تأكد من المسار الصحيح

const HeroBanner = () => {
  const images = [image1, image2]; // تخزين الصور في مصفوفة

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[410px] overflow-hidden">
      <div className="absolute inset-0 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full h-full inline-block">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white">
              <h4 className="text-lg uppercase font-medium mb-3">10% Off Your First Order</h4>
              <h3 className="text-4xl font-bold mb-4">
                {index === 0 ? "Fashionable Dress" : "Reasonable Price"}
              </h3>
              <a href="#" className="bg-white text-black py-2 px-4 rounded-md shadow-md hover:bg-gray-200 transition duration-300">
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 text-black p-2 rounded-full shadow-md hover:bg-opacity-100 transition duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 text-black p-2 rounded-full shadow-md hover:bg-opacity-100 transition duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HeroBanner;