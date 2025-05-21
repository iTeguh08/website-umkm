import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        
        // Simulate API call
        router.post('/newsletter/subscribe', { email }, {
            onSuccess: () => {
                setMessage({
                    text: 'Terima kasih telah berlangganan newsletter kami!',
                    type: 'success'
                });
                setEmail('');
                setIsSubmitting(false);
            },
            onError: () => {
                setMessage({
                    text: 'Terjadi kesalahan. Silakan coba lagi nanti.',
                    type: 'error'
                });
                setIsSubmitting(false);
            },
            preserveScroll: true
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
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan alamat email Anda"
                                className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-md transition-colors duration-200 whitespace-nowrap"
                            >
                                {isSubmitting ? 'Memproses...' : 'Berlangganan'}
                            </button>
                        </div>
                        
                        {message.text && (
                            <p className={`mt-3 text-sm ${
                                message.type === 'success' ? 'text-green-300' : 'text-red-300'
                            }`}>
                                {message.text}
                            </p>
                        )}
                        
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
