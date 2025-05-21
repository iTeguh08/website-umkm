import React from 'react';

const Hero = () => {
    return (
        <section className="pt-16">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-sm sm:text-xl md:text-xl font-semibold text-blue-700 mb-2">
                    <span className="font-bold text-blue-800">1000+ UMKM</span> TELAH BERGABUNG!
                </h2>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-6 leading-tight">
                    Temukan UMKM <br /> <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Terbaik di sekitarmu!</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
                    Jelajahi berbagai bidang usaha lokal yang terpercaya dan inovatif!
                </p>
            </div>
        </section>
    );
};

export default Hero;