import React from 'react';

const NewsletterSection = () => {
  return (
    <div className="bg-[#ecf4fc] py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-black mb-4">
          — Stay Updated —
        </h2>
        <p className="text-lg text-black mb-8">
          Subscribe now to receive the latest news and exclusive offers directly to your inbox.
        </p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Email Goes Here"
            className="w-full md:w-96 px-6 py-3 full border border-black focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="bg-[#d39c94] text-white px-8 py-3 full font-semibold hover:bg-[#b77c75] transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;
