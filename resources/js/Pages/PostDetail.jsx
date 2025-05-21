import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function PostDetail({ post, posts }) {
    // Format tanggal dengan JavaScript native
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Asia/Jakarta",
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    // Data dummy untuk konten post
    const dummyContent =
        post.content ||
        `
        <p class="mb-4">Ini adalah contoh konten artikel yang menampilkan bagaimana sebuah UMKM dapat berkembang di era digital saat ini. Artikel ini berisi berbagai tips dan trik yang bisa langsung diaplikasikan.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Mengapa Digitalisasi Penting untuk UMKM?</h2>
        <p class="mb-4">Digitalisasi memungkinkan UMKM untuk menjangkau pasar yang lebih luas dan meningkatkan efisiensi operasional. Dengan memanfaatkan teknologi, UMKM bisa bersaing dengan bisnis yang lebih besar.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Langkah-langkah Memulai Digitalisasi</h2>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li>Buat website atau toko online</li>
            <li>Manfaatkan media sosial untuk pemasaran</li>
            <li>Gunakan aplikasi akuntansi digital</li>
            <li>Terapkan sistem manajemen inventori</li>
        </ol>
        
        <p class="mb-4">Dengan mengikuti langkah-langkah di atas, diharapkan UMKM dapat tumbuh dan berkembang dengan lebih baik di era digital ini.</p>
    `;

    return (
        <>
            <Head title={post.title} />

            {/* Hero Section */}
            <div className="relative bg-blue-700 text-white pb-16 md:pb-24">
                <div className="container px-4 pt-4">
                    <Link
                        href={route("frontend.posts.index")}
                        className="inline-flex items-center text-gray-100 hover:text-white hover:bg-blue-600 transition-colors duration-200 px-4 py-2 rounded-lg mb-8"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                </div>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        {post.tags?.length > 0 && (
                            <div className="flex justify-center gap-2 mb-4">
                                {post.tags.slice(0, 2).map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="inline-block bg-blue-600 text-xs font-semibold px-3 py-1 rounded-full"
                                    >
                                        {tag.title}
                                    </span>
                                ))}
                            </div>
                        )}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center space-x-4 text-sm text-blue-100">
                            <span>Oleh {post.user?.name || "Admin"}</span>
                            <span>•</span>
                            <span>{formatDate(post.created_at)}</span>
                            <span>•</span>
                            <span>{post.read_time || "5"} min read</span>
                            {post.published_at && (
                                <>
                                    <span>•</span>
                                    <span>
                                        Dipublikasikan{" "}
                                        {formatDate(post.published_at)}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-white"></div>
            </div>

            {/* Main Content */}
            <div className="relative -mt-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-md shadow-lg overflow-hidden">
                        {/* Featured Image */}
                        {post.photo && (
                            <div className="h-64 md:h-96 overflow-hidden">
                                <img
                                    src={`/storage/posts/${post.photo}`}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Article Content */}
                        <article className="prose max-w-none p-6 md:p-10">
                            {post.description && (
                                <p className="text-lg text-gray-700 mb-6 font-medium">
                                    {post.description}
                                </p>
                            )}

                            <div
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: dummyContent,
                                }}
                            />

                            {/* Tags */}
                            {post.tags?.length > 0 && (
                                <div className="mt-10 pt-6 border-t border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                        Tag
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                href={`/posts?category=${tag.title}`}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                                            >
                                                {tag.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Author Bio */}
                            <div className="mt-10 pt-6 border-t border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-12 w-12 rounded-full"
                                            src={
                                                post.user?.profile_photo_url ||
                                                `https://ui-avatars.com/api/?name=${
                                                    post.user?.name || "Admin"
                                                }&background=3b82f6&color=fff`
                                            }
                                            alt={post.user?.name || "Admin"}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {post.user?.name || "Admin"}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {post.user?.bio ||
                                                "Penulis di UMKM Digital"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            {posts && posts.length > 0 && (
                <div className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Artikel Terkait
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts
                                .filter((p) => p.id !== post.id) // Exclude current post
                                .slice(0, 3) // Limit to 3 posts
                                .map((relatedPost) => (
                                    <div
                                        key={relatedPost.id}
                                        className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {relatedPost.photo && (
                                            <div className="h-56 overflow-hidden">
                                                <img
                                                    src={`/storage/posts/${relatedPost.photo}`}
                                                    alt={relatedPost.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center text-sm text-gray-500 mb-3">
                                                <span>
                                                    {new Date(
                                                        relatedPost.created_at
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                                {relatedPost.tags?.length >
                                                    0 && (
                                                    <span className="mx-2">
                                                        •
                                                    </span>
                                                )}
                                                <div className="flex flex-wrap gap-1">
                                                    {relatedPost.tags
                                                        ?.slice(0, 2)
                                                        .map((tag) => (
                                                            <span
                                                                key={tag.id}
                                                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                            >
                                                                {tag.title}
                                                            </span>
                                                        ))}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {relatedPost.description}
                                            </p>
                                            <Link
                                                href={route(
                                                    "posts.show",
                                                    relatedPost.id
                                                )}
                                                className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                                            >
                                                Baca Selengkapnya
                                                <svg
                                                    className="w-4 h-4 ml-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
