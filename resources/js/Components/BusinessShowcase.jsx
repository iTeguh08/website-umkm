import React from 'react';

const BusinessShowcase = () => {
    const categories = [
        {
            name: 'Nama usaha 1',
            image: 'https://i.pinimg.com/474x/09/a6/e4/09a6e45b4c41322afba305ba262cba87.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
            tags: ['Jasa', 'Cargo']
        },
        {
            name: 'Nama usaha 1',
            image: 'https://i.pinimg.com/736x/07/c2/7e/07c27e71429cc6b5c1ec65cec3f85377.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
            tags: ['Jasa', 'Cargo']
        },
        {
            name: 'Nama usaha 1',
            image: 'https://i.pinimg.com/736x/de/0f/a5/de0fa5daf9d6246cf3dbeda9573cf2fa.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
            tags: ['Jasa', 'Cargo']
        },
    ];

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                        <img src={category.image} alt={category.name} className="w-full aspect-video object-cover" />
                        <div className="pt-4">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
                            <div className="flex gap-2 items-center">
                                {category.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                                <button className="ml-auto text-blue-600 text-sm font-medium">
                                    DETAIL
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BusinessShowcase;