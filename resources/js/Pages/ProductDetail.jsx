import React, { useState, useRef, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselStyles = `
    .slick-arrow {
        width: 48px;
        height: 48px;
        z-index: 20;
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0.9;
        background: rgba(255, 255, 255, 0.48) !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .slick-arrow:hover {
        background: rgba(255, 255, 255, 1) !important;
    }
    .slick-arrow:before {
        display: none;
    }
    .slick-prev {
        left: 25px;
    }
    .slick-next {
        right: 25px;
    }
    .slick-arrow:after {
        content: '';
        width: 10px;
        height: 10px;
        border: 2px solid #1a1a1a;
        border-width: 0 2px 2px 0;
        display: inline-block;
        transition: transform 0.2s ease;
    }
    .slick-prev:after {
        transform: rotate(135deg);
        margin-left: 4px;
    }
    .slick-next:after {
        transform: rotate(-45deg);
        margin-right: 4px;
    }
    .slick-slide {
        opacity: 0;
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .slick-slide.slick-active {
        opacity: 1;
    }
    .slick-list {
        height: 480px;
    }
    .slick-track {
        height: 100%;
    }
    .slick-slide > div {
        height: 100%;
    }
    .thumbnail-container::-webkit-scrollbar {
        height: 6px;
    }
    .thumbnail-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }
    .thumbnail-container::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }
    .thumbnail-container::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

// Component untuk Nearby Products Map
const NearbyProductsMap = ({ currentProduct, nearbyProducts = [], apiKey }) => {
    const [map, setMap] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMapInitialized, setIsMapInitialized] = useState(false);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const infoWindowRef = useRef(null);
    const circleRef = useRef(null);

    // Lazy load Google Maps script
    useEffect(() => {
        if (!apiKey) return;

        const loadGoogleMaps = () => {
            // Check if already loaded
            if (window.google && window.google.maps) {
                setIsLoaded(true);
                return;
            }

            // Check if script already exists
            const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
            if (existingScript) {
                existingScript.onload = () => setIsLoaded(true);
                return;
            }

            // Load new script
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
            script.async = true;
            script.defer = true;

            // Global callback function
            window.initMap = () => {
                setIsLoaded(true);
                delete window.initMap; // Clean up
            };

            document.head.appendChild(script);
        };

        loadGoogleMaps();
    }, [apiKey]);

    // Initialize map only once
    useEffect(() => {
        if (!isLoaded || !mapRef.current || isMapInitialized) return;
        if (!currentProduct.latitude || !currentProduct.longitude) return;

        const mapOptions = {
            center: {
                lat: parseFloat(currentProduct.latitude),
                lng: parseFloat(currentProduct.longitude)
            },
            zoom: 12,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            // Optimize for performance
            gestureHandling: 'greedy',
            clickableIcons: false,
            disableDefaultUI: false,
            zoomControl: true,
        };

        const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
        setMap(newMap);
        setIsMapInitialized(true);

        // Add radius circle (25km)
        const circle = new window.google.maps.Circle({
            map: newMap,
            center: mapOptions.center,
            radius: 25000, // 25km in meters
            fillColor: '#3B82F6',
            fillOpacity: 0.1,
            strokeColor: '#2563EB',
            strokeOpacity: 0.3,
            strokeWeight: 2,
        });
        circleRef.current = circle;

        // Fit bounds to include circle
        newMap.fitBounds(circle.getBounds());
    }, [isLoaded, currentProduct, isMapInitialized]);

    // Update markers when products change
    useEffect(() => {
        if (!map || !isMapInitialized) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Info window untuk semua markers
        const infoWindow = new window.google.maps.InfoWindow();
        infoWindowRef.current = infoWindow;

        // Marker untuk produk saat ini (warna khusus)
        const currentMarker = new window.google.maps.Marker({
            position: {
                lat: parseFloat(currentProduct.latitude),
                lng: parseFloat(currentProduct.longitude)
            },
            map: map,
            title: currentProduct.nama_usaha,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#DC2626"/>
                        <circle cx="12" cy="9" r="3" fill="white"/>
                        <text x="12" y="13" text-anchor="middle" fill="#DC2626" font-size="8" font-weight="bold">YOU</text>
                    </svg>
                `),
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 40),
            },
            animation: window.google.maps.Animation.DROP,
            zIndex: 999,
        });

        currentMarker.addListener('click', () => {
            infoWindow.setContent(`
                <div class="p-3 max-w-xs">
                    <h3 class="font-bold text-lg text-gray-900 mb-2">${currentProduct.nama_usaha}</h3>
                    <p class="text-sm text-red-600 font-medium mb-2">📍 Lokasi Anda Saat Ini</p>
                    <p class="text-sm text-gray-600 mb-2">${currentProduct.bidang_usaha || 'Bidang usaha tidak tersedia'}</p>
                    <p class="text-xs text-gray-500">${currentProduct.lokasi || 'Alamat lengkap tidak tersedia'}</p>
                </div>
            `);
            infoWindow.open(map, currentMarker);
        });

        markersRef.current = [currentMarker];

        // Markers untuk produk terdekat dengan animasi stagger
        nearbyProducts.forEach((product, index) => {
            if (product.latitude && product.longitude && product.id !== currentProduct.id) {
                setTimeout(() => {
                    const marker = new window.google.maps.Marker({
                        position: {
                            lat: parseFloat(product.latitude),
                            lng: parseFloat(product.longitude)
                        },
                        map: map,
                        title: product.nama_usaha,
                        icon: {
                            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#2563EB"/>
                                    <circle cx="12" cy="9" r="2.5" fill="white"/>
                                    <text x="12" y="13" text-anchor="middle" fill="white" font-size="6" font-weight="bold">${index + 1}</text>
                                </svg>
                            `),
                            scaledSize: new window.google.maps.Size(32, 32),
                            anchor: new window.google.maps.Point(16, 32),
                        },
                        animation: window.google.maps.Animation.DROP,
                    });

                    marker.addListener('click', () => {
                        const distance = product.distance ? `${product.distance.toFixed(1)} km` : 'Jarak tidak diketahui';
                        infoWindow.setContent(`
                            <div class="p-3 max-w-xs">
                                <h3 class="font-bold text-lg text-gray-900 mb-2">${product.nama_usaha}</h3>
                                <p class="text-sm text-green-600 font-medium mb-2">📍 ${distance} dari lokasi Anda</p>
                                <p class="text-sm text-gray-600 mb-2">${product.bidang_usaha || 'Bidang usaha tidak tersedia'}</p>
                                <p class="text-xs text-gray-500 mb-3">${product.lokasi || 'Alamat lengkap tidak tersedia'}</p>
                                <a href="/products/${product.id}" class="inline-block bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                                    Lihat Detail
                                </a>
                            </div>
                        `);
                        infoWindow.open(map, marker);
                    });

                    markersRef.current.push(marker);
                }, index * 100); // Stagger animation
            }
        });

        return () => {
            if (infoWindowRef.current) {
                infoWindowRef.current.close();
            }
        };
    }, [map, currentProduct, nearbyProducts, isMapInitialized]);

    if (!apiKey) {
        return (
            <div className="rounded-xl overflow-hidden bg-gray-100 h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                    </svg>
                    <p className="text-sm">API Key Google Maps belum dikonfigurasi</p>
                    <p className="text-xs text-gray-400 mt-1">Hubungi administrator untuk mengaktifkan peta</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl overflow-hidden relative">
            <div ref={mapRef} style={{ width: '100%', height: '450px' }} />
            {!isMapInitialized && isLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-sm text-gray-600">Memuat peta...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// Component untuk daftar nearby products
const NearbyProductsList = ({ nearbyProducts = [] }) => {
    if (nearbyProducts.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p>Tidak ada UMKM terdekat dalam radius 25 km</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyProducts.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="relative">
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={`/storage/${product.images[0].image_path}`}
                                alt={product.nama_usaha}
                                className="w-full h-32 object-cover rounded-t-lg"
                            />
                        ) : (
                            <div className="w-full h-32 bg-gray-100 rounded-t-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                        {product.distance && (
                            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                {product.distance.toFixed(1)} km
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.nama_usaha}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.bidang_usaha || 'Bidang usaha tidak tersedia'}</p>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.lokasi || 'Alamat tidak tersedia'}</p>
                        <Link
                            href={`/products/${product.id}`}
                            className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200"
                        >
                            Lihat Detail
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ProductDetail = () => {
    const { product, nearbyProducts, googleMapsApiKey } = usePage().props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Function to reset the auto-advance interval
    const resetAutoAdvance = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        if (product.images?.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % product.images.length);
                if (sliderRef.current) {
                    sliderRef.current.slickNext();
                }
            }, 5000);
        }
    };

    // Auto-advance slides
    useEffect(() => {
        if (product.images?.length > 1) {
            resetAutoAdvance();
        }

        // Cleanup interval on component unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [product.images?.length]);

    const settings = {
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
        autoplay: false, // We handle autoplay manually for better control
        beforeChange: (current, next) => setCurrentSlide(next),
        afterChange: (current) => {
            setCurrentSlide(current);
            resetAutoAdvance(); // Reset timer when slide changes (including arrow clicks)
        },
    };

    const handleThumbnailClick = (index) => {
        setCurrentSlide(index);
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
        resetAutoAdvance(); // Reset timer when user manually navigates
    };

    return (
        <>
            <Head>
                <title>Fauget Travel - Your Gateway to Paradise</title>
                <meta
                    name="description"
                    content="Discover the beauty of the world with our exclusive travel packages and experiences."
                />
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kaushan+Script&family=Montserrat:ital,wght@0,900;1,900&display=swap');
                        
                        .kaushan-script {
                            font-family: "Kaushan Script", cursive;
                            font-style: normal;
                        }
                        
                        .bebas-neue-regular {
                            font-family: "Bebas Neue", sans-serif;
                            font-weight: 400;
                        }
                        
                        .montserrat {
                            font-family: "Montserrat", sans-serif;
                        }
                    `}
                </style>
            </Head>
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <style>{carouselStyles}</style>
                <Header />

                <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
                    <Link
                        href={route("homepage")}
                        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 group transition-colors duration-300"
                    >
                        <svg
                            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span className="font-medium">Kembali ke Beranda</span>
                    </Link>

                    <div className="bg-white rounded-md shadow-sm p-6 mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left column - Image Carousel */}
                            <div className="relative">
                                {product.images && product.images.length > 0 ? (
                                    product.images.length === 1 ? (
                                        <div className="outline-none rounded-xl overflow-hidden shadow-lg">
                                            <img
                                                src={`/storage/${product.images[0].image_path}`}
                                                alt={`${product.nama_usaha} - 1`}
                                                className="w-full h-[480px] object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="rounded-xl overflow-hidden shadow-lg">
                                            <Slider ref={sliderRef} {...settings}>
                                                {product.images.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="outline-none"
                                                    >
                                                        <img
                                                            src={`/storage/${image.image_path}`}
                                                            alt={`${product.nama_usaha} - ${index + 1}`}
                                                            className="w-full h-[480px] object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    )
                                ) : (
                                    <div className="w-full h-[480px] bg-gray-100 rounded-xl flex items-center justify-center">
                                        <span className="text-gray-400 flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Tidak ada gambar tersedia
                                        </span>
                                    </div>
                                )}

                                {product.images && product.images.length > 1 && (
                                    <div className="flex mt-6 space-x-3 overflow-x-auto py-4 px-2 thumbnail-container">
                                        {product.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex-shrink-0"
                                            >
                                                <button
                                                    onClick={() => handleThumbnailClick(index)}
                                                    className={`w-20 h-20 rounded-md overflow-hidden transition-all duration-300 ${index === currentSlide
                                                        ? "ring-2 ring-blue-500 opacity-100"
                                                        : "opacity-60 hover:opacity-100"
                                                        }`}
                                                >
                                                    <img
                                                        src={`/storage/${image.image_path}`}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right column - Business details */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {product.nama_usaha}
                                    </h1>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.bidang_usaha && (
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                                {capitalizeFirstLetter(product.bidang_usaha)}
                                            </span>
                                        )}
                                        {product.jenis_usaha && (
                                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                                                {capitalizeFirstLetter(product.jenis_usaha)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="prose prose-lg max-w-none text-gray-600">
                                        <div dangerouslySetInnerHTML={{
                                            __html: product.description ||
                                                "<p>Informasi detail tentang usaha ini belum tersedia.</p>"
                                        }} />
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-md p-4 space-y-4">
                                    <div className="flex items-center text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Buka operasional senin-jumat (08:00-17:00)</span>
                                    </div>

                                    <div className="flex items-center text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L16 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{product.email || 'Email tidak tersedia'}</span>
                                    </div>

                                    <div className="flex items-center text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>{product.telephone || 'Nomor telepon tidak tersedia'}</span>
                                    </div>

                                    {product.website && (
                                        <div className="flex items-center text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                            <a href={product.website} target="_blank" rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                                                {product.website}
                                            </a>
                                        </div>
                                    )}

                                    <div className="flex items-center text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                        <span className="font-medium">Rating 4.5/5.0</span>
                                        <span className="text-sm text-gray-500 ml-2">(50 ulasan)</span>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-blue-50 rounded-md">
                                    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm text-gray-500">Tahun Berdiri</span>
                                        <span className="block text-lg font-semibold text-gray-900">2014</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-md shadow-sm p-6 mb-8">
                        <div className="mb-4 text-center text-gray-600">
                            {product.lokasi || 'Alamat lengkap tidak tersedia'}
                        </div>

                        {/* Interactive Google Maps dengan nearby products */}
                        <NearbyProductsMap
                            currentProduct={product}
                            nearbyProducts={nearbyProducts || []}
                            apiKey={googleMapsApiKey}
                        />

                        {/* Legend/Info */}
                        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                                <div className="w-4 h-4 mr-2" style={{
                                    background: 'url(data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#DC2626"/>
                                        <circle cx="12" cy="9" r="2.5" fill="white"/>
                                    </svg>
                                `) + ')'
                                }}></div>
                                <span>Lokasi Saat Ini</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 mr-2" style={{
                                    background: 'url(data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#2563EB"/>
                                        <circle cx="12" cy="9" r="2.5" fill="white"/>
                                    </svg>
                                `) + ')'
                                }}></div>
                                <span>UMKM Terdekat (radius 25km)</span>
                            </div>
                        </div>
                    </div>

                    {/* Section untuk daftar UMKM terdekat */}
                    {(nearbyProducts && nearbyProducts.length > 0) && (
                        <div className="relative overflow-hidden">
                            {/* Gradient Background */}
                            <div className="bg-[#1F81B0] rounded-xl shadow-xl py-8 px-32 mb-8 relative">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-4 left-4 w-8 h-8 text-white">
                                        <svg fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                                        </svg>
                                    </div>
                                    <div className="absolute top-8 right-8 w-6 h-6 text-white">
                                        <svg fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title Section */}
                                <div className="text-center mb-12 relative z-10">
                                    <h1 className="text-4xl md:text-7xl bebas-neue-regular font-bold text-white mb-4 tracking-wide">
                                        EKSPLORASI UMKM
                                    </h1>
                                    <div className="flex items-center justify-center mt-6">
                                        <div className="w-16 h-[2px] bg-orange-400 mr-3"></div>
                                        <span className="text-lg text-white kaushan-script font-medium">
                                            {nearbyProducts.length} UMKM Terdekat
                                        </span>
                                        <div className="w-16 h-[2px] bg-orange-400 ml-3"></div>
                                    </div>
                                </div>

                                {/* Grid Cards Layout with Lines */}
                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
                                    {nearbyProducts.slice(0, 6).map((product, index) => {
                                        const items = [];
                                        
                                        // Add the product card
                                        items.push(
                                            <div key={product.id} className="lg:col-span-2 flex justify-center">
                                                <div className="w-full max-w-lg lg:max-w-xl">
                                                    {/* Step Number */}
                                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                                        <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                                                            {String(index + 1).padStart(2, '0')}
                                                        </div>
                                                    </div>

                                                    {/* Polaroid Card - Larger Size */}
                                                    <div className="relative group pt-8 mb-4">
                                                        {/* Binder Clip - SVG */}
                                                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-30">
                                                            <img src="/binderClipImage.svg" alt="Binder Clip" className="w-16 h-14" />
                                                        </div>

                                                        {/* Polaroid Frame - Professional & Attractive Design */}
                                                        <div className={`bg-white p-4 shadow-2xl shadow-black/20 border border-gray-100 transform transition-all duration-500 hover:shadow-3xl hover:shadow-black/30 ${index % 2 === 0 ? 'rotate-2 hover:rotate-1' : '-rotate-2 hover:-rotate-1'} w-72 mx-[auto] backdrop-blur-sm`}>
                                                            <div className="relative overflow-hidden aspect-square">
                                                                {product.images && product.images.length > 0 ? (
                                                                    <img
                                                                        src={`/storage/${product.images[0].image_path}`}
                                                                        alt={product.nama_usaha}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                        </svg>
                                                                    </div>
                                                                )}

                                                                {/* Distance Badge - Professional Design */}
                                                                {product.distance && (
                                                                    <div className="absolute top-1 right-1 bg-gray-50 text-red-500 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                                                                        <span className="flex items-center gap-1">
                                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                            </svg>
                                                                            {product.distance.toFixed(1)}km
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Enhanced Content Section */}
                                                        <div className="space-y-4 mt-5">
                                                            {/* Business Name with improved styling */}
                                                            <div className="relative">
                                                                <img src="/backgroundTextOrange.svg" alt="Orange Background" className="w-full" />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <h3 className="font-bold bebas-neue-regular text-center text-3xl uppercase tracking-wider text-white line-clamp-2">
                                                                        {product.nama_usaha}
                                                                    </h3>
                                                                </div>
                                                            </div>

                                                            {/* Enhanced Description */}
                                                            <p className="text-md text-white leading-relaxed line-clamp-3 text-center mx-5">
                                                                {product.description ?
                                                                    product.description.replace(/<[^>]*>/g, '').substring(0, 160) + (product.description.length > 160 ? '...' : '')
                                                                    : 'Informasi detail tentang UMKM ini akan segera tersedia.'
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                        
                                        // Add curved line after odd-indexed items (0,2,4) but not on mobile
                                        if (index % 2 === 0 && index < nearbyProducts.slice(0, 6).length - 1) {
                                            items.push(
                                                <div key={`line-${index}`} className="hidden lg:flex lg:col-span-1 items-center justify-center scale-x-[400%] mb-40">
                                                    <svg className="w-full h-16" viewBox="0 0 100 64" fill="none">
                                                        {/* Horizontal curved path */}
                                                        <path
                                                            d="M10 32 Q30 20, 50 32 T90 32"
                                                            stroke="#FFA500"
                                                            strokeWidth="2"
                                                            strokeDasharray="4,3"
                                                            fill="none"
                                                            opacity="0.9"
                                                        />
                                                    </svg>
                                                </div>
                                            );
                                        }
                                        
                                        return items;
                                    }).flat()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
};

export default ProductDetail;
