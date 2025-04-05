import React from 'react';

const ProductCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Tablets',
      image: 'src/assets/images (2).jpg',
      alt: 'Tablets collection',
      slug: 'tablets',
    },
    {
      id: 2,
      name: 'Points',
      image: 'src/assets/image2.jpg',
      alt: 'Points collection',
      slug: 'points',
    },
    {
      id: 3,
      name: 'Office Supplies',
      image: 'src/assets/images (1).jpg',
      alt: 'Office supplies collection',
      slug: 'office-supplies',
    },
    {
      id: 4,
      name: 'Books',
      image: 'src/assets/YAFRI-Read-Pink.jpg',
      alt: 'Books collection',
      slug: 'books',
    },
    {
      id: 5,
      name: 'Eid Collection',
      image: 'src/assets/images.jpg',
      alt: 'Eid collection',
      slug: 'eid-collection',
    },
    {
      id: 6,
      name: 'Printed Clothing',
      image: 'src/assets/clothes.jpg',
      alt: 'Printed clothing',
      slug: 'printed-clothing',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="border border-gray-200 hover:shadow-md transition duration-300">
              <div className="overflow-hidden">
                <a href={`/category/${category.slug}`}>
                  <img
                    src={category.image}
                    alt={category.alt}
                    className="w-[350px] h-[300px] object-cover hover:scale-105 transition duration-300"
                  />
                </a>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-medium text-gray-800 lowercase">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;