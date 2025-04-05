import React from 'react';

const TrandyProducts = () => {
    const products = [
        {
            id: 1,
            name: 'Colorful Stylish Shirt',
            price: '$123.00',
            image: '/api/placeholder/400/500',
            alt: 'Colorful Stylish Shirt'
        },
        {
            id: 2,
            name: 'Colorful Stylish Shirt',
            price: '$123.00',
            image: '/api/placeholder/400/500',
            alt: 'Colorful Stylish Shirt'
        },
        {
            id: 3,
            name: 'Colorful Stylish Shirt',
            price: '$123.00',
            image: '/api/placeholder/400/500',
            alt: 'Colorful Stylish Shirt'
        },
        {
            id: 4,
            name: 'Colorful Stylish Shirt',
            price: '$123.00',
            image: '/api/placeholder/400/500',
            alt: 'Colorful Stylish Shirt'
        },
        {
            id: 5,
            name: 'Colorful Stylish Shirt',
            price: '$123.00',
            image: '/api/placeholder/400/500',
            alt: 'Colorful Stylish Shirt'
        },
        {
            id: 6,
            name: 'Colorful Stylish Shirt',
            price: '$123.00',
            image: '/api/placeholder/400/500',
            alt: 'Colorful Stylish Shirt'
        },
        {
            id: 7,
            name: 'Colorful Stylish Shirt',
            price: '$123.00',
            image: '/api/placeholder/400/500',
            alt: 'Colorful Stylish Shirt'
        },
        {
            id: 8,
            name: 'Colorful Stylish Shirt',
            price: '$123.00',
            image: '/api/placeholder/400/500',
            alt: 'Colorful Stylish Shirt'
        }
    ];

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    <span className="font-serif">— Trandy Products —</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white">
                            <div className="overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.alt}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-base font-medium text-gray-800 mb-2">{product.name}</h3>
                                <div className="mb-4">
                                    <span className="text-base text-gray-800">{product.price}</span>
                                    <span className="text-gray-400 line-through ml-2">{product.price}</span>
                                </div>
                                <div className="flex justify-between px-2">
                                <a
    href={`/product/${product.id}`}
    className="flex items-center text-[#d39c94] hover:text-[#b77c75] transition-colors border border-[#d39c94] rounded px-3 py-1 mr-2"
>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
    View Detail
</a>

<a
    href="/cart"
    className="flex items-center text-[#d39c94] hover:text-[#b77c75] transition-colors border border-[#d39c94] rounded px-3 py-1"
>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
        <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
    Add To Cart
</a>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrandyProducts;