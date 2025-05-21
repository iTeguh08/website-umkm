import React from "react";

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-400 to-blue-600 text-white py-24">
            <div className="absolute inset-0 bg-grid-white/[0.05]" />
            <div className="relative container mx-auto px-4 text-center z-10">
                <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full text-blue-100">
                    Artikel Terbaru
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                    Blog & Artikel
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                    Temukan informasi terbaru seputar UMKM, tips bisnis, dan
                    cerita inspiratif dari pelaku usaha.
                </p>
            </div>
        </div>
    );
};

export default Hero;
