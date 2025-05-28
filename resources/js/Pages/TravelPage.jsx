import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
    initial: {
        opacity: 0,
        y: 60,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
            ease: "easeOut",
        },
    },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const popOut = {
    initial: {
        scale: 0.8,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
        },
    },
};

// Reusable Components
const PackageCard = ({ title, features, price, delay = 0 }) => (
    <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay }}
        className="bg-white p-[17px] rounded-lg shadow-lg flex flex-col justify-between"
        whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
    >
        <div>
            <h3 className="text-3xl bebas-neue-regular font-extrabold text-[#145B89] mb-6 text-center">
                {title}
            </h3>
            <ul className="space-y-[10px] mb-6 text-[14px] sm:text-[14px] leading-tight text-[#264653]">
                {features.map((feature, index) => (
                    <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        viewport={{ once: true }}
                    >
                        <span className="mr-2 text-[rgb(27,134,162)]">•</span>
                        <span>{feature}</span>
                    </motion.li>
                ))}
            </ul>
        </div>
        <motion.div
            className="flex rounded-lg justify-between overflow-hidden shadow-lg bg-[#1B86A2]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className=" text-white px-4 flex items-center">
                <span className="text-lg font-extrabold montserrat">
                    ${price}
                </span>
            </div>
            <div className="bg-[#093450] text-white px-4 rounded-lg flex items-center">
                <span className="text-base py-2">/Person</span>
            </div>
        </motion.div>
    </motion.div>
);

const ContactItem = ({ icon, text, delay = 0 }) => (
    <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay }}
        className="flex items-center justify-start gap-3 text-[1.1rem]"
        whileHover={{ x: 10, transition: { duration: 0.2 } }}
    >
        <span className="text-[#F4A261]">{icon}</span>
        <span>{text}</span>
    </motion.div>
);

const TravelPage = () => {
    // Package Data
    const packages = [
        {
            title: "SINGLE PACKAGE",
            features: [
                "7 Days Trip",
                "Transportation within Caribbean Islands",
                "Experienced Trip Guide",
                "Daily Lunch & Dinner included",
            ],
            price: "1500",
        },
        {
            title: "COUPLE PACKAGE",
            features: [
                "10 Days Trip",
                "Transportation between Rome, Paris, and Barcelona",
                "Expert Local Guides",
                "Meals included",
            ],
            price: "2500",
        },
        {
            title: "FAMILY PACKAGE",
            features: [
                "5 Days Trip",
                "Transportation included",
                "Experienced Trip Guide",
                "Daily Meals provided",
                "Family-Friendly Activities",
                "Nature Walks",
            ],
            price: "1000",
        },
    ];

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

            <div className="min-h-screen bg-[rgb(27,134,162)]">
                <div className="max-w-[840px] mx-auto px-4 sm:px-6">
                    {/* Hero Section */}
                    <div className="relative mb-32 sm:mb-24">
                        {/* Background Image with Brushes */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="overflow-hidden h-[200px] sm:h-[400px] relative"
                        >
                            <img
                                src="https://balifuntravel.my.canva.site/sample-3/_assets/media/3f3a0172c55147a5bdc372d075191403.jpg"
                                alt="Mountain Lake"
                                className="w-full h-full object-cover"
                            />
                            {/* Top Right White Brush */}
                            <div className="absolute top-0 -right-[170px] rotate-[25deg]">
                                <img
                                    src="/putih-top-rightBrush.png"
                                    alt="Top Right Brush"
                                    className="w-[300px] h-auto"
                                />
                            </div>
                            {/* Bottom Left White Brush */}
                            <div className="absolute -bottom-[20px] -left-[130px] rotate-[170deg] scale-y-[-1]">
                                <img
                                    src="/putih-left-bottomBrush.png"
                                    alt="Bottom Left Brush"
                                    className="w-[190px] h-auto"
                                />
                            </div>
                        </motion.div>

                        {/* Logo Section */}
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.5,
                            }}
                            className="absolute top-6 sm:top-10 left-0 right-0 -translate-x-1/2 w-full max-w-[320px] mx-auto"
                        >
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 w-full h-[80px] flex items-center justify-center">
                                    <img
                                        src="/brushWhiteFull.svg"
                                        alt="brush stroke"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="relative z-10 py-[22px] w-full text-center">
                                    <h1
                                        style={{ fontFamily: "Kaushan Script" }}
                                        className="text-xl sm:text-[36px] text-[#145B89] mr-4"
                                    >
                                        Fauget Travel
                                    </h1>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Text */}
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="absolute top-[35%] left-1/2 transform -translate-x-1/2 text-center text-white w-full px-4"
                        >
                            <motion.h2
                                variants={fadeInUp}
                                className="text-6xl montserrat font-semibold mb-6 sm:mb-8 leading-[1.1] tracking-wide [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]"
                            >
                                EXPLORE THE
                                <br />
                                WORLD WITH US
                            </motion.h2>
                        </motion.div>

                        {/* Photo Collage */}
                        <div className="absolute -bottom-24 sm:-bottom-28 left-1/2 transform -translate-x-1/2 w-full">
                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className="relative max-w-[900px] px-4"
                            >
                                <div className="flex justify-center items-center">
                                    {/* Left photo */}
                                    <motion.div
                                        initial={{
                                            scale: 0.1,
                                            opacity: 0,
                                            rotate: -15,
                                            y: 50,
                                        }}
                                        whileInView={{
                                            scale: 1,
                                            opacity: 1,
                                            rotate: -5,
                                            y: -37,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                            duration: 0.3,
                                            bounce: 2,
                                        }}
                                        viewport={{ once: true }}
                                        className="relative z-30 hidden sm:block mr-2"
                                    >
                                        {/* Orange Dot */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1.2 }}
                                            transition={{
                                                duration: 0.2,
                                                delay: 0.3,
                                                type: "spring",
                                                stiffness: 400,
                                            }}
                                            className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-40"
                                        >
                                            <img
                                                src="/dotOrange.svg"
                                                alt="Orange Dot"
                                                className="w-[20px] h-[20px]"
                                            />
                                        </motion.div>
                                        <img
                                            src="https://balifuntravel.my.canva.site/sample-3/_assets/media/1b775b3214505c047d68c3366f6ef558.jpg"
                                            alt="Friends"
                                            className="w-[180px] sm:w-[220px] h-[140px] sm:h-[160px] object-cover border-[7px] border-white shadow-xl"
                                        />
                                        <motion.img
                                            initial={{
                                                opacity: 0,
                                                scale: 0.5,
                                                rotate: -20,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 10,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.2,
                                            }}
                                            src="/orangeBrush.svg"
                                            alt="Orange Brush"
                                            className="absolute -bottom-10 -left-10 w-[170px] h-auto z-[-1]"
                                        />
                                    </motion.div>

                                    {/* Center photo */}
                                    <motion.div
                                        initial={{
                                            scale: 0.1,
                                            opacity: 0,
                                            y: 100,
                                        }}
                                        whileInView={{
                                            scale: 1,
                                            opacity: 1,
                                            y: -11,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                            duration: 0.3,
                                            delay: 0.1,
                                            bounce: 0.4,
                                        }}
                                        viewport={{ once: true }}
                                        className="relative z-20 -mx-0 sm:-mx-4"
                                    >
                                        {/* Orange Dot */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1.2 }}
                                            transition={{
                                                duration: 0.2,
                                                delay: 0.4,
                                                type: "spring",
                                                stiffness: 400,
                                            }}
                                            className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-40"
                                        >
                                            <img
                                                src="/dotOrange.svg"
                                                alt="Orange Dot"
                                                className="w-[20px] h-[20px]"
                                            />
                                        </motion.div>
                                        <img
                                            src="https://balifuntravel.my.canva.site/sample-3/_assets/media/300be5a419b7386b06bff38b4b10a6bc.jpg"
                                            alt="Traveler"
                                            className="w-[240px] sm:w-[230px] h-[170px] sm:h-[170px] object-cover border-[7px] border-white shadow-xl"
                                        />
                                    </motion.div>

                                    {/* Right photo */}
                                    <motion.div
                                        initial={{
                                            scale: 1.5,
                                            opacity: 0,
                                            rotate: 15,
                                            y: 100,
                                        }}
                                        whileInView={{
                                            scale: 1,
                                            opacity: 1,
                                            rotate: 7,
                                            y: -40,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                            duration: 0.3,
                                            delay: 0.2,
                                            bounce: 0.4,
                                        }}
                                        viewport={{ once: true }}
                                        className="relative z-10 hidden sm:block ml-2"
                                    >
                                        {/* Orange Dot */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1.2 }}
                                            transition={{
                                                duration: 0.2,
                                                delay: 0.5,
                                                type: "spring",
                                                stiffness: 400,
                                            }}
                                            className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-40"
                                        >
                                            <img
                                                src="/dotOrange.svg"
                                                alt="Orange Dot"
                                                className="w-[20px] h-[20px]"
                                            />
                                        </motion.div>
                                        <img
                                            src="https://balifuntravel.my.canva.site/sample-3/_assets/media/c5fee4ba747bff16d348c2943d830574.jpg"
                                            alt="Beach"
                                            className="w-[180px] sm:w-[220px] h-[140px] sm:h-[160px] object-cover border-[7px] border-white shadow-xl"
                                        />
                                        <motion.img
                                            initial={{
                                                opacity: 0,
                                                scale: 0.5,
                                                rotate: 20,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.3,
                                            }}
                                            src="/orange-2Brush.svg"
                                            alt="Orange Brush"
                                            className="absolute -bottom-[30px] -right-14 w-[180px] h-auto z-[-1] scale-x-[-1]"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Tagline */}
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-center text-white text-xl sm:text-xl font-light mt-[8rem] mb-[2rem] px-4"
                    >
                        Discover, Experience, and Cherish Memories That Last a
                        Lifetime!
                    </motion.div>

                    {/* Package Cards */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="max-w-[710px] mx-auto relative z-10 px-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mb-[-100px]">
                            {packages.map((pkg, index) => (
                                <PackageCard
                                    key={index}
                                    {...pkg}
                                    delay={index * 0.2}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Blue Brush Above Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full flex justify-between"
                    >
                        {/* Left Brush */}
                        <div className="relative w-1/2">
                            <img
                                src="/blueBrush.svg"
                                alt="Blue Brush Left"
                                className="absolute -left-[1px] -top-[20px] w-[100%] h-auto transform rotate-180 scale-x-[-1]"
                            />
                        </div>
                        {/* Right Brush */}
                        <div className="relative w-1/2">
                            <img
                                src="/blueBrush.svg"
                                alt="Blue Brush Right"
                                className="absolute -right-[2px] -top-[40px] w-[100%] h-auto transform rotate-180"
                            />
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <div className="bg-[#145B89] p-10 pt-32 text-white">
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row justify-between items-center max-w-[840px] mx-auto mt-5"
                        >
                            <motion.div
                                variants={fadeInUp}
                                className="mb-6 md:mb-0"
                            >
                                <div className="relative ml-10">
                                    <img
                                        src="/roundedOrangeBrush.png"
                                        alt="Orange Brush"
                                        className="absolute top-7 left-4 -translate-x-1/2 -translate-y-1/2 w-[80px] h-auto rotate-[90deg]"
                                    />
                                    <h3 className="relative z-10 text-5xl montserrat font-extrabold leading-[1.1] text-white">
                                        ADVENTURE
                                        <br />
                                        AWAITS!
                                    </h3>
                                </div>
                            </motion.div>

                            <div className="text-right">
                                <div className="space-y-3">
                                    <ContactItem
                                        icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        }
                                        text="+123-456-7890"
                                        delay={0.2}
                                    />
                                    <ContactItem
                                        icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                            </svg>
                                        }
                                        text="hello@reallygreatsite.com"
                                        delay={0.4}
                                    />
                                    <ContactItem
                                        icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                            </svg>
                                        }
                                        text="123 Anywhere St., Any City"
                                        delay={0.6}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TravelPage;
