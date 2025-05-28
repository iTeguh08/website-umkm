import React from "react";

const Hero = () => {
    return (
        <div className="relative min-h-[500px] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-white/[0.05] animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-blue-900/50 to-transparent" />
            </div>

            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://plus.unsplash.com/premium_photo-1661666816099-16d75246849a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="UMKM Background"
                    className="absolute w-full object-cover opacity-25"
                />
            </div>

            {/* Floating Elements with increased visibility */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-5 w-16 h-16 bg-blue-300/30 rounded-full blur-xl animate-float-slow" />
                <div className="absolute top-20 right-10 w-24 h-24 bg-white/20 rounded-full blur-xl animate-float-medium" />
                <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-float-fast" />
            </div>

            {/* Content with improved contrast */}
            <div className="relative container mx-auto px-4 py-16 text-center z-10">
                <div 
                    className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-white/15 backdrop-blur-md rounded-full text-white border border-white/30 shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                    🔥 Artikel & Inspirasi UMKM
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up drop-shadow-lg">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                        Blog & Artikel
                    </span>
                </h1>
                
                <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200 drop-shadow-md">
                    Temukan informasi terbaru seputar UMKM, tips bisnis, dan
                    cerita inspiratif dari para pelaku usaha sukses.
                </p>

                {/* Stats with improved visibility */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-center animate-fade-in-up animation-delay-300">
                    {[
                        { number: "1000+", label: "Artikel" },
                        { number: "50+", label: "Kategori" },
                        { number: "10K+", label: "Pembaca" },
                    ].map((stat, index) => (
                        <div key={index} className="backdrop-blur-md bg-white/10 rounded-lg p-3 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
                            <div className="text-2xl font-bold text-white drop-shadow-md">{stat.number}</div>
                            <div className="text-blue-100 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;

/* Add to your CSS (tailwind.config.js) */
/*
extend: {
    animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
    },
    keyframes: {
        float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
    },
}
*/
