import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        setMessage({ text: '', type: '' });
        
        axios.post('/newsletter/subscribe', { email })
            .then(response => {
                setMessage({
                    text: response.data.message || 'Terima kasih telah berlangganan newsletter kami!',
                    type: 'success'
                });
                setEmail('');
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || 
                                  error.response?.data?.errors?.email?.[0] || 
                                  'Terjadi kesalahan. Silakan coba lagi nanti.';
                
                setMessage({
                    text: errorMessage,
                    type: 'error'
                });
            })
            .finally(() => {
                setIsSubmitting(false);
                
                // Auto-hide message after 5 seconds
                if (message.type === 'success') {
                    setTimeout(() => {
                        setMessage({ text: '', type: '' });
                    }, 5000);
                }
            });
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-800 text-white py-16 mt-16">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Tetap Terhubung dengan Kami
                    </h2>
                    <p className="text-blue-100 mb-8 text-lg">
                        Dapatkan update terbaru tentang artikel, tips, dan informasi UMKM langsung ke email Anda.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        {/* Message Alert */}
                        {message.text && (
                            <div className={`mb-4 p-3 rounded-md ${
                                message.type === 'success' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                <p className="text-sm">{message.text}</p>
                            </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan alamat email Anda"
                                className={`flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 ${
                                    message.type === 'error' ? 'ring-2 ring-red-500' : 'focus:ring-blue-300'
                                }`}
                                required
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-md transition-colors duration-200 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memproses...
                                    </span>
                                ) : 'Berlangganan'}
                            </button>
                        </div>
                        
                        <p className="text-xs text-blue-200 mt-4">
                            Dengan berlangganan, Anda menyetujui Kebijakan Privasi kami.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSection;
