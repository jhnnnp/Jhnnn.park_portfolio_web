import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink, Award, Calendar, ChevronRight, Star, Sparkles } from 'lucide-react';
import { EXPERIENCE } from '../../lib/constants';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';
import { ImageGallery } from '../ui/image-gallery';

export const Experience = () => {
    const staggerRef = useStaggerAnimation(0.2);
    const { language } = useLanguage();
    const t = translations[language];

    // Measure left card heights to sync screenshot panel heights
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [cardHeights, setCardHeights] = useState<number[]>([]);

    useEffect(() => {
        const measure = () => {
            const heights = contentRefs.current.map((el) => {
                if (el) {
                    // 패딩과 마진을 포함한 전체 높이 측정
                    const computedStyle = window.getComputedStyle(el);
                    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
                    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
                    return el.offsetHeight + paddingTop + paddingBottom;
                }
                return 600; // 기본 높이
            });
            setCardHeights(heights);
        };

        // 약간의 지연을 두고 측정 (DOM이 완전히 렌더링된 후)
        const timeoutId = setTimeout(measure, 100);

        window.addEventListener('resize', measure);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', measure);
        };
    }, [language]);

    return (
        <section id="experience" className="section-padding bg-apple-gray-50">
            <div className="container-apple">
                <div ref={staggerRef} className="space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-apple-black">{t.experience.title}</h2>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto text-apple-gray-600">
                            {t.experience.subtitle}
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="relative max-w-6xl mx-auto">
                        {/* Enhanced Timeline Line with Animated Gradient */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
                            <motion.div
                                className="w-full h-full bg-gradient-to-b from-sky-300 via-blue-200 to-cyan-200 rounded-full shadow-lg"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                style={{ transformOrigin: "top" }}
                            />
                            {/* Animated glow effect */}
                            <motion.div
                                className="absolute inset-0 w-full h-full bg-gradient-to-b from-sky-300/30 via-blue-200/30 to-cyan-200/30 rounded-full blur-sm"
                                animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>

                        {/* Experience Items */}
                        <div className="space-y-20">
                            {EXPERIENCE.map((experience, index) => (
                                <motion.div
                                    key={experience.id}
                                    className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                >
                                    {/* Enhanced Timeline Dot */}
                                    <motion.div
                                        className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 z-10"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                                        whileHover={{ scale: 1.3 }}
                                    >
                                        {/* Outer ring with pulsing effect */}
                                        <motion.div
                                            className="absolute inset-0 w-6 h-6 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full border-4 border-white shadow-2xl"
                                            animate={{
                                                boxShadow: [
                                                    "0 0 0 0 rgba(125, 211, 252, 0.7)",
                                                    "0 0 0 10px rgba(125, 211, 252, 0)",
                                                    "0 0 0 0 rgba(125, 211, 252, 0)"
                                                ]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeOut"
                                            }}
                                        />
                                        {/* Inner core */}
                                        <div className="absolute inset-1 bg-white rounded-full shadow-inner" />
                                        {/* Award indicator for first experience */}
                                        {experience.id === 1 && (
                                            <motion.div
                                                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-300 to-sky-400 rounded-full flex items-center justify-center shadow-lg"
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            >
                                                <Star size={10} className="text-white fill-white" />
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    {/* Content Card */}
                                    <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                        <motion.div
                                            className="relative p-8 space-y-6 overflow-hidden group cursor-pointer"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                borderRadius: '20px',
                                                boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05)'
                                            }}
                                            whileHover={{
                                                y: -12,
                                                scale: 1.03,
                                                boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)'
                                            }}
                                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        >
                                            <div ref={(el) => { contentRefs.current[index] = el; }}>
                                                {/* Enhanced Glassmorphism Background */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-sky-50/40 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                                {/* Animated border gradient */}
                                                <motion.div
                                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                >
                                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-300/20 via-blue-200/20 to-cyan-200/20 p-[1px]">
                                                        <div className="w-full h-full bg-white/90 rounded-2xl backdrop-blur-sm"></div>
                                                    </div>
                                                </motion.div>
                                                {/* Header */}
                                                <div className="space-y-4 relative z-10">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <motion.h3
                                                                className="text-2xl font-bold text-apple-black mb-3 group-hover:text-blue-500 transition-colors duration-300"
                                                                whileHover={{ x: 5 }}
                                                            >
                                                                {experience.position}
                                                            </motion.h3>
                                                            <div className="flex items-center space-x-3 text-apple-gray-600">
                                                                <motion.div
                                                                    className="p-1.5 bg-gradient-to-br from-sky-200/30 to-blue-100/50 rounded-lg"
                                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                                >
                                                                    <MapPin size={16} className="text-blue-400" />
                                                                </motion.div>
                                                                <span className="font-semibold text-lg">{experience.company}</span>
                                                            </div>
                                                        </div>
                                                        <motion.div
                                                            className="relative"
                                                            whileHover={{ scale: 1.05 }}
                                                        >
                                                            <div className="px-5 py-2.5 bg-gradient-to-r from-sky-200/30 via-blue-100/50 to-cyan-100/30 text-blue-600 text-sm rounded-full font-semibold border border-sky-300/30 backdrop-blur-sm">
                                                                {experience.period}
                                                            </div>
                                                            {/* Subtle glow effect */}
                                                            <div className="absolute inset-0 px-5 py-2.5 bg-gradient-to-r from-sky-200/20 to-blue-100/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        </motion.div>
                                                    </div>

                                                    {/* Project Type Badge */}
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex items-center space-x-1 text-apple-gray-500">
                                                            <Calendar size={14} />
                                                            <span className="text-xs">
                                                                {experience.id === 1 ? t.experience.projectTypes.kDigital :
                                                                    experience.id === 2 ? t.experience.projectTypes.capstone :
                                                                        t.experience.projectTypes.personal}
                                                            </span>
                                                        </div>
                                                        {experience.id === 1 && (
                                                            <div className="flex items-center space-x-1 text-blue-500">
                                                                <Award size={14} />
                                                                <span className="text-xs font-medium">{t.experience.award}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <div className="relative z-10">
                                                    <p className="text-apple-gray-600 leading-relaxed text-lg">
                                                        {experience.description}
                                                    </p>
                                                </div>

                                                {/* Enhanced Technologies Section */}
                                                <div className="space-y-4 relative z-10">
                                                    <motion.h4
                                                        className="text-base font-bold text-apple-black flex items-center gap-3"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <motion.div
                                                            className="w-3 h-3 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full shadow-sm"
                                                            animate={{
                                                                scale: [1, 1.2, 1],
                                                                boxShadow: [
                                                                    "0 0 0 0 rgba(125, 211, 252, 0.4)",
                                                                    "0 0 0 4px rgba(125, 211, 252, 0)",
                                                                    "0 0 0 0 rgba(125, 211, 252, 0)"
                                                                ]
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                ease: "easeOut"
                                                            }}
                                                        />
                                                        <span className="flex items-center gap-2">
                                                            <Sparkles size={16} className="text-blue-400" />
                                                            {t.experience.technologies}
                                                        </span>
                                                    </motion.h4>
                                                    <div className="flex flex-wrap gap-2.5">
                                                        {experience.technologies.map((tech, techIndex) => (
                                                            <motion.div
                                                                key={tech}
                                                                className="relative group/tech"
                                                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                transition={{ delay: techIndex * 0.08 }}
                                                                whileHover={{ y: -3 }}
                                                            >
                                                                <div className="px-4 py-2.5 bg-gradient-to-r from-sky-200/20 via-blue-100/40 to-cyan-100/20 text-blue-600 text-sm font-medium rounded-full border border-sky-300/25 backdrop-blur-sm transition-all duration-300 group-hover/tech:from-sky-200/30 group-hover/tech:to-blue-100/60 group-hover/tech:border-blue-300/40 group-hover/tech:shadow-lg">
                                                                    {tech}
                                                                </div>
                                                                {/* Hover glow effect */}
                                                                <div className="absolute inset-0 px-4 py-2.5 bg-gradient-to-r from-sky-200/10 to-blue-100/20 rounded-full blur-sm opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Enhanced Achievements Section */}
                                                <div className="space-y-6 relative z-10">
                                                    <motion.h4
                                                        className="text-lg font-bold text-apple-black flex items-center gap-3"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <motion.div
                                                            className="w-4 h-4 bg-gradient-to-br from-sky-300 via-blue-300 to-cyan-300 rounded-full shadow-sm flex items-center justify-center"
                                                            animate={{
                                                                rotate: [0, 360],
                                                                scale: [1, 1.1, 1]
                                                            }}
                                                            transition={{
                                                                duration: 4,
                                                                repeat: Infinity,
                                                                ease: "linear"
                                                            }}
                                                        >
                                                            <div className="w-2 h-2 bg-white rounded-full" />
                                                        </motion.div>
                                                        <span className="flex items-center gap-2">
                                                            <Award size={18} className="text-blue-400" />
                                                            {t.experience.keyAchievements}
                                                        </span>
                                                    </motion.h4>
                                                    <div className="grid gap-4">
                                                        {experience.achievements.map((achievement, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                className="group/achievement relative p-6 overflow-hidden cursor-pointer"
                                                                style={{
                                                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                                                                    backdropFilter: 'blur(10px)',
                                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                                    borderRadius: '16px',
                                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.05)'
                                                                }}
                                                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                transition={{ delay: idx * 0.1 }}
                                                                whileHover={{
                                                                    y: -8,
                                                                    scale: 1.03,
                                                                    boxShadow: "0 20px 50px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)"
                                                                }}
                                                                whileTap={{
                                                                    y: -2,
                                                                    scale: 0.98,
                                                                    boxShadow: "0 8px 20px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.2)"
                                                                }}
                                                            >
                                                                {/* Enhanced background effects */}
                                                                <div className="absolute inset-0 bg-gradient-to-br from-sky-200/15 via-blue-100/25 to-cyan-100/10 rounded-2xl opacity-0 group-hover/achievement:opacity-100 transition-all duration-500"></div>

                                                                {/* Animated border gradient */}
                                                                <motion.div
                                                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover/achievement:opacity-100 transition-opacity duration-500"
                                                                    initial={{ scale: 0.8 }}
                                                                    whileHover={{ scale: 1 }}
                                                                >
                                                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-300/20 via-blue-200/30 to-cyan-200/20 p-[1px]">
                                                                        <div className="w-full h-full bg-white/90 rounded-2xl backdrop-blur-sm"></div>
                                                                    </div>
                                                                </motion.div>

                                                                {/* Enhanced Content */}
                                                                <div className="flex items-start space-x-4 relative z-10">
                                                                    <motion.div
                                                                        className="w-3 h-3 bg-gradient-to-br from-sky-300 via-blue-300 to-cyan-300 rounded-full mt-1.5 flex-shrink-0 shadow-sm flex items-center justify-center"
                                                                        initial={{ scale: 0, rotate: -180 }}
                                                                        animate={{ scale: 1, rotate: 0 }}
                                                                        transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                                                                        whileHover={{
                                                                            scale: 1.4,
                                                                            rotate: 180,
                                                                            boxShadow: "0 0 15px rgba(125, 211, 252, 0.7)",
                                                                            filter: "brightness(1.3)"
                                                                        }}
                                                                    >
                                                                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                                    </motion.div>
                                                                    <div className="flex-1">
                                                                        <motion.p
                                                                            className="text-apple-gray-700 leading-relaxed font-medium text-base transition-all duration-300 group-hover/achievement:text-blue-500"
                                                                            whileHover={{
                                                                                x: 5,
                                                                                fontWeight: 600
                                                                            }}
                                                                        >
                                                                            {achievement}
                                                                        </motion.p>
                                                                    </div>
                                                                    <motion.div
                                                                        className="opacity-0 group-hover/achievement:opacity-100 transition-opacity duration-300"
                                                                        whileHover={{ x: 3 }}
                                                                    >
                                                                        <ChevronRight size={16} className="text-blue-400" />
                                                                    </motion.div>
                                                                </div>

                                                                {/* Enhanced ripple effect on click */}
                                                                <motion.div
                                                                    className="absolute inset-0 bg-gradient-to-r from-sky-200/15 via-blue-100/20 to-cyan-100/15 rounded-2xl"
                                                                    initial={{ scale: 0, opacity: 0 }}
                                                                    whileTap={{
                                                                        scale: 1,
                                                                        opacity: [0, 0.4, 0],
                                                                        transition: { duration: 0.5 }
                                                                    }}
                                                                />
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Enhanced Project Links */}
                                                <div className="pt-6 border-t border-gradient-to-r from-apple-gray-100/50 to-transparent relative z-10">
                                                    <div className="flex items-center justify-between">
                                                        <motion.div
                                                            className="flex items-center gap-2"
                                                            whileHover={{ x: 3 }}
                                                        >
                                                            <div className="w-2 h-2 bg-gradient-to-r from-sky-300 to-blue-400 rounded-full" />
                                                            <span className="text-sm text-apple-gray-600 font-medium">
                                                                {experience.id === 1 ? t.experience.projectNames.tibo :
                                                                    experience.id === 2 ? t.experience.projectNames.tuk :
                                                                        t.experience.projectNames.mimo}
                                                            </span>
                                                        </motion.div>
                                                        <motion.a
                                                            href="#projects"
                                                            className="group/link relative px-4 py-2 text-sm text-blue-500 hover:text-white transition-all duration-300 font-semibold flex items-center gap-2 rounded-full overflow-hidden"
                                                            style={{
                                                                background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.2) 0%, rgba(96, 165, 250, 0.2) 100%)',
                                                                border: '1px solid rgba(125, 211, 252, 0.3)'
                                                            }}
                                                            whileHover={{
                                                                scale: 1.05,
                                                                x: 5,
                                                                background: 'linear-gradient(135deg, #7DD3FC 0%, #60A5FA 100%)',
                                                                boxShadow: '0 8px 25px rgba(125, 211, 252, 0.4)'
                                                            }}
                                                        >
                                                            <span className="relative z-10">{t.experience.viewProject}</span>
                                                            <motion.div
                                                                className="w-4 h-4 relative z-10"
                                                                animate={{ x: [0, 3, 0] }}
                                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                            >
                                                                <ChevronRight size={16} />
                                                            </motion.div>
                                                            {/* Hover background effect */}
                                                            <div className="absolute inset-0 bg-gradient-to-r from-sky-300 to-blue-400 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                                                        </motion.a>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Project Images - Alternating Side */}
                                    <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                                        <motion.div
                                            className="relative group"
                                            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                                        >
                                            {/* Carousel/Gallery using ImageGallery - height synced to left card */}
                                            <div
                                                style={{
                                                    height: cardHeights[index] || 600,
                                                    minHeight: cardHeights[index] || 600
                                                }}
                                                className="flex flex-col md:pb-4"
                                            >
                                                <ImageGallery
                                                    images={experience.images as unknown as string[]}
                                                    title={experience.id === 1 ? 'TIBO App' : experience.id === 2 ? 'TUK Navi' : 'MIMO Homecam'}
                                                    layout={experience.id === 2 ? 'horizontal' : 'vertical'}
                                                />
                                            </div>

                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Call to Action */}
                    <div className="text-center pt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/resume relative inline-flex items-center px-8 py-4 text-white font-semibold rounded-full overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, #7DD3FC 0%, #60A5FA 50%, #38BDF8 100%)',
                                    boxShadow: '0 8px 30px rgba(125, 211, 252, 0.4)'
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 12px 40px rgba(125, 211, 252, 0.5)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {t.experience.downloadResume}
                                    <ExternalLink size={20} className="group-hover/resume:rotate-12 transition-transform duration-300" />
                                </span>
                                {/* Animated background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 opacity-0 group-hover/resume:opacity-100 transition-opacity duration-500" />
                                {/* Subtle glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-300/30 to-blue-400/30 blur-xl opacity-0 group-hover/resume:opacity-100 transition-opacity duration-500" />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
