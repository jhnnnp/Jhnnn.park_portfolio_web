import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import { SITE_CONFIG, SKILLS } from '../../lib/constants';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

export const About = () => {
    const staggerRef = useStaggerAnimation(0.1);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const { language } = useLanguage();
    const t = translations[language];

    const handleMouseEnter = (category: string) => {
        setHoveredCategory(category);
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null);
    };

    return (
        <section id="about" className="section-padding bg-apple-gray-50">
            <div className="container-apple">
                <div ref={staggerRef} className="max-w-4xl mx-auto px-4">
                    {/* Content Section */}
                    <div className="space-y-8 sm:space-y-12">
                        {/* Header */}
                        <div className="text-center space-y-4 sm:space-y-6">
                            <div className="space-y-3 sm:space-y-4">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-apple-black">
                                    {SITE_CONFIG.name}
                                </h2>
                                <h3 className="text-xl sm:text-2xl md:text-3xl text-apple-blue font-semibold">
                                    {t.about.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-base sm:text-lg md:text-xl text-apple-gray-600 leading-relaxed max-w-3xl mx-auto">
                                {t.about.description}
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="space-y-6 sm:space-y-8">
                            <h4 className="text-xl sm:text-2xl font-semibold text-apple-black text-center">{t.about.skills}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {Object.entries(SKILLS).map(([category, skills], index) => (
                                    <motion.div
                                        key={category}
                                        className="relative"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        {/* Folder Icon */}
                                        <motion.div
                                            className="w-full group cursor-pointer"
                                            onMouseEnter={() => handleMouseEnter(category)}
                                            onMouseLeave={handleMouseLeave}
                                            onTouchStart={() => handleMouseEnter(category)}
                                            whileHover={{
                                                scale: 1.08,
                                                y: -8,
                                                rotateY: 5,
                                                rotateX: 5
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <div className="relative perspective-1000">
                                                {/* Folder Shadow */}
                                                <div className="absolute top-2 left-1 w-24 sm:w-28 h-20 sm:h-22 bg-black/10 rounded-t-3xl rounded-b-xl blur-sm transform rotate-1"></div>

                                                {/* Folder Shape */}
                                                <div className="relative w-24 sm:w-28 h-20 sm:h-22 mx-auto bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 rounded-t-2xl sm:rounded-t-3xl rounded-b-xl shadow-2xl border border-sky-200/50 group-hover:shadow-sky-200/50 group-hover:shadow-3xl transition-all duration-500 transform-gpu">
                                                    {/* Folder Tab */}
                                                    <div className="absolute -top-1 sm:-top-1.5 left-2 sm:left-3 w-8 sm:w-10 h-3 sm:h-4 bg-gradient-to-br from-sky-200 via-sky-100 to-blue-200 rounded-t-lg sm:rounded-t-xl border-l border-r border-t border-sky-200/50 shadow-sm"></div>

                                                    {/* Folder Inner Shadow */}
                                                    <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-t-xl sm:rounded-t-2xl rounded-b-lg"></div>

                                                    {/* Category Icon Container */}
                                                    <div className="relative flex items-center justify-center h-full">
                                                        <motion.div
                                                            className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-sky-300 via-sky-400 to-blue-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border border-sky-300/30"
                                                            whileHover={{
                                                                scale: 1.1,
                                                                rotate: [0, -5, 5, 0],
                                                                boxShadow: "0 20px 40px rgba(125, 211, 252, 0.4)"
                                                            }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <span className="text-white text-lg sm:text-xl font-bold drop-shadow-sm">
                                                                {category.charAt(0).toUpperCase()}
                                                            </span>
                                                        </motion.div>
                                                    </div>

                                                    {/* Folder Highlight */}
                                                    <div className="absolute top-1 left-1 right-1 h-2 bg-gradient-to-r from-white/60 via-white/30 to-transparent rounded-t-2xl"></div>

                                                    {/* Hover State Indicator */}
                                                    <AnimatePresence>
                                                        {hoveredCategory === category && (
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-br from-sky-300/20 to-blue-400/20 rounded-t-3xl rounded-b-xl border-2 border-sky-300/50"
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.8 }}
                                                                transition={{ duration: 0.2 }}
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                {/* Category Label */}
                                                <motion.div
                                                    className="mt-3 sm:mt-4 text-center"
                                                    whileHover={{ y: -2 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <span className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider drop-shadow-sm group-hover:text-sky-600 transition-colors duration-300 block px-1">
                                                        {t.about.categories[category as keyof typeof t.about.categories]}
                                                    </span>
                                                    <div className="mt-1 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        {/* Hover Content */}
                                        <AnimatePresence>
                                            {hoveredCategory === category && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: -20,
                                                        scale: 0.9,
                                                        rotateX: -15
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1,
                                                        rotateX: 0
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -20,
                                                        scale: 0.9,
                                                        rotateX: -15
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 25,
                                                        duration: 0.4
                                                    }}
                                                    className="fixed sm:absolute top-1/2 sm:top-full left-1/2 transform -translate-x-1/2 sm:-translate-x-1/2 -translate-y-1/2 sm:translate-y-0 sm:mt-6 z-50 w-[90vw] sm:w-auto"
                                                    onMouseEnter={() => handleMouseEnter(category)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onTouchEnd={(e) => {
                                                        e.stopPropagation();
                                                        handleMouseLeave();
                                                    }}
                                                >
                                                    {/* Backdrop for mobile */}
                                                    <div className="fixed inset-0 bg-black/50 sm:hidden -z-10" onClick={handleMouseLeave} />

                                                    {/* Arrow Pointer - hidden on mobile */}
                                                    <div className="hidden sm:block absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-sky-200/50 rotate-45 shadow-lg"></div>

                                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-sky-200/50 p-4 sm:p-5 min-w-[280px] sm:min-w-[320px] max-w-[400px]">
                                                        {/* Header */}
                                                        <div className="mb-4 pb-3 border-b border-sky-100">
                                                            <h6 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                                                                {t.about.categories[category as keyof typeof t.about.categories]} {t.about.skills}
                                                            </h6>
                                                        </div>

                                                        {/* Skills Grid */}
                                                        <div className="grid grid-cols-2 gap-3">
                                                            {skills.map((skill, skillIndex) => (
                                                                <motion.div
                                                                    key={skill.name}
                                                                    className="group flex items-center space-x-2 p-3 rounded-xl hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition-all duration-300 cursor-pointer"
                                                                    initial={{
                                                                        opacity: 0,
                                                                        y: 20,
                                                                        scale: 0.8
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        y: 0,
                                                                        scale: 1
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.3,
                                                                        delay: skillIndex * 0.06,
                                                                        type: "spring",
                                                                        stiffness: 300
                                                                    }}
                                                                    whileHover={{
                                                                        scale: 1.03,
                                                                        y: -2
                                                                    }}
                                                                >
                                                                    <div className="flex-1 min-w-0">
                                                                        <span className="text-sm font-semibold text-gray-800 group-hover:text-sky-600 transition-colors duration-200 truncate block">
                                                                            {skill.name}
                                                                        </span>
                                                                    </div>
                                                                    <motion.div
                                                                        className="w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 flex-shrink-0 shadow-sm"
                                                                        initial={{ scale: 0 }}
                                                                        whileHover={{ scale: 1.2 }}
                                                                        transition={{ duration: 0.2 }}
                                                                    />
                                                                </motion.div>
                                                            ))}
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="mt-4 pt-3 border-t border-sky-100 text-center">
                                                            <span className="text-xs text-gray-500 font-medium">
                                                                {skills.length} {t.about.skillsCount}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4 sm:space-y-6 text-center">
                            <h4 className="text-xl sm:text-2xl font-semibold text-apple-black">{t.about.connect}</h4>
                            <div className="flex justify-center space-x-4 sm:space-x-6">
                                <motion.a
                                    href={SITE_CONFIG.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 sm:p-4 bg-white rounded-apple shadow-apple border border-apple-gray-100 hover:shadow-apple-lg transition-all duration-300 touch-manipulation"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="GitHub"
                                >
                                    <Github size={20} className="sm:w-6 sm:h-6" />
                                </motion.a>
                                <motion.a
                                    href={`mailto:${SITE_CONFIG.email}`}
                                    className="p-3 sm:p-4 bg-white rounded-apple shadow-apple border border-apple-gray-100 hover:shadow-apple-lg transition-all duration-300 touch-manipulation"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Email"
                                >
                                    <Mail size={20} className="sm:w-6 sm:h-6" />
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}; 