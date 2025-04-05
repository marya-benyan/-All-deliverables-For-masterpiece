import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-[#f8f8f8] py-16"> {/* تم تغيير الخلفية إلى لون فاتح */}
      <div className="container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <h1 className="text-4xl font-bold text-[#d39c94] text-center mb-4">
          ABOUT US
        </h1>
        <p className="text-lg text-[#d39c94] text-center mb-12">
          Home - About Us
        </p>

        {/* القسم الرئيسي */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* النص */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#d39c94]">
              — Our Story —
            </h2>
            <p className="text-lg text-black"> {/* النص باللون الأسود */}
              At <strong>ELORA MARYA</strong>, we believe in empowering young talents and showcasing the beauty of handcrafted art. Our journey began with a simple mission: to create opportunities for young artisans to share their creativity with the world while supporting their livelihoods.
            </p>
            <p className="text-lg text-black"> {/* النص باللون الأسود */}
              We are passionate about preserving the charm of handmade crafts, whether it’s paintings, candles, resin art, or printed clothing. By connecting skilled artisans with customers, we not only celebrate creativity but also promote sustainable and ethical trade.
            </p>
            <p className="text-lg text-black"> {/* النص باللون الأسود */}
              Every product you find on our platform is crafted with care and tells a unique story. By shopping with us, you are not just purchasing an item but supporting a dream and contributing to a brighter future for talented youth.
            </p>
          </div>

          {/* الصورة (يمكن استبدالها بصورة حقيقية) */}
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <span className="text-[#d39c94] text-lg">
              Placeholder for Image
            </span>
          </div>
        </div>

        {/* قسم إضافي (اختياري) */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-[#d39c94] mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#d39c94] mb-4">
                Handcrafted Excellence
              </h3>
              <p className="text-lg text-black"> {/* النص باللون الأسود */}
                Each product is made with precision and passion, ensuring the highest quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#d39c94] mb-4">
                Support for Artisans
              </h3>
              <p className="text-lg text-black"> {/* النص باللون الأسود */}
                Your purchase directly supports talented artisans and their communities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#d39c94] mb-4">
                Sustainable Practices
              </h3>
              <p className="text-lg text-black"> {/* النص باللون الأسود */}
                We are committed to eco-friendly and ethical production methods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;