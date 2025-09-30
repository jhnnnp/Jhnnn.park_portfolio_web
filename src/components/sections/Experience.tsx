import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Award, Calendar } from 'lucide-react';
import { EXPERIENCE } from '../../lib/constants';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

export const Experience = () => {
    const staggerRef = useStaggerAnimation(0.2);
    const { language } = useLanguage();
    const t = translations[language];

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
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-apple-blue via-apple-blue/60 to-apple-blue transform -translate-x-1/2" />

                        {/* Experience Items */}
                        <div className="space-y-16">
                            {EXPERIENCE.map((experience, index) => (
                                <motion.div
                                    key={experience.id}
                                    className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                >
                                    {/* Timeline Dot */}
                                    <motion.div
                                        className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-apple-blue to-blue-600 rounded-full border-4 border-white shadow-xl z-10"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                                        whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                                    />

                                    {/* Content Card */}
                                    <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                                        }`}>
                                        <motion.div
                                            className="card-apple p-8 space-y-6 relative overflow-hidden group"
                                            whileHover={{ y: -8, scale: 1.02 }}
                                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        >
                                            {/* Card Background Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            {/* Header */}
                                            <div className="space-y-4 relative z-10">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="text-2xl font-bold text-apple-black mb-2 group-hover:text-apple-blue transition-colors duration-300">
                                                        {experience.position}
                                                    </h3>
                                                        <div className="flex items-center space-x-2 text-apple-gray-600">
                                                            <MapPin size={18} className="text-apple-blue" />
                                                            <span className="font-semibold text-lg">{experience.company}</span>
                                                        </div>
                                                    </div>
                                                    <motion.span
                                                        className="px-4 py-2 bg-gradient-to-r from-apple-blue/10 to-blue-100 text-apple-blue text-sm rounded-full font-semibold border border-apple-blue/20"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {experience.period}
                                                    </motion.span>
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
                                                        <div className="flex items-center space-x-1 text-amber-600">
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

                                            {/* Technologies */}
                                            <div className="space-y-3 relative z-10">
                                                <h4 className="text-base font-bold text-apple-black flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-apple-blue rounded-full"></div>
                                                    {t.experience.technologies}
                                                </h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {experience.technologies.map((tech, techIndex) => (
                                                        <motion.span
                                                            key={tech}
                                                            className="px-3 py-2 bg-gradient-to-r from-apple-blue/10 to-blue-100 text-apple-blue text-sm font-medium rounded-full border border-apple-blue/20 hover:from-apple-blue/20 hover:to-blue-200 transition-all duration-300"
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: techIndex * 0.1 }}
                                                            whileHover={{ scale: 1.05, y: -2 }}
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Achievements */}
                                            <div className="space-y-5 relative z-10">
                                                <h4 className="text-lg font-bold text-apple-black flex items-center gap-3">
                                                    <div className="w-3 h-3 bg-gradient-to-r from-apple-blue to-blue-500 rounded-full shadow-sm"></div>
                                                    {t.experience.keyAchievements}
                                                </h4>
                                                <div className="grid gap-4">
                                                    {experience.achievements.map((achievement, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            className="group relative p-5 bg-white rounded-2xl border border-apple-gray-100 transition-all duration-300 overflow-hidden cursor-pointer"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            whileHover={{
                                                                y: -8,
                                                                scale: 1.02,
                                                                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)"
                                                            }}
                                                            whileTap={{
                                                                y: -2,
                                                                scale: 0.98,
                                                                boxShadow: "0 8px 16px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.2)"
                                                            }}
                                                        >
                                                            {/* Pressed effect background */}
                                                            <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/8 via-blue-50/20 to-apple-blue/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                            {/* Animated border gradient */}
                                                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-apple-blue/20 via-blue-100/30 to-apple-blue/20 p-[1px]">
                                                                    <div className="w-full h-full bg-white rounded-2xl"></div>
                                                                </div>
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex items-start space-x-4 relative z-10">
                                                                <motion.div
                                                                    className="w-2 h-2 bg-gradient-to-r from-apple-blue to-blue-500 rounded-full mt-2 flex-shrink-0 shadow-sm"
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                                                                    whileHover={{
                                                                        scale: 1.5,
                                                                        boxShadow: "0 0 12px rgba(59, 130, 246, 0.6)",
                                                                        filter: "brightness(1.2)"
                                                                    }}
                                                                />
                                                                <div className="flex-1">
                                                                    <motion.p
                                                                        className="text-apple-gray-700 leading-relaxed font-medium text-base transition-all duration-300"
                                                                        whileHover={{
                                                                            color: "#1e40af",
                                                                            fontWeight: 600
                                                                        }}
                                                                    >
                                                                {achievement}
                                                                    </motion.p>
                                                                </div>
                                                            </div>

                                                            {/* Ripple effect on click */}
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-apple-blue/10 to-blue-100/20 rounded-2xl"
                                                                initial={{ scale: 0, opacity: 0 }}
                                                                whileTap={{
                                                                    scale: 1,
                                                                    opacity: [0, 0.3, 0],
                                                                    transition: { duration: 0.4 }
                                                                }}
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Project Links */}
                                            <div className="pt-4 border-t border-gradient-to-r from-apple-gray-100 to-transparent relative z-10">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-apple-gray-500 font-medium">
                                                        {experience.id === 1 ? t.experience.projectNames.tibo :
                                                            experience.id === 2 ? t.experience.projectNames.tuk :
                                                                t.experience.projectNames.mimo}
                                                    </span>
                                                    <motion.a
                                                        href="#projects"
                                                        className="text-sm text-apple-blue hover:text-apple-blue/80 transition-colors font-semibold flex items-center gap-1 group"
                                                        whileHover={{ scale: 1.05, x: 5 }}
                                                    >
                                                        {t.experience.viewProject}
                                                        <motion.div
                                                            className="w-4 h-4"
                                                            animate={{ x: [0, 3, 0] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        >
                                                            →
                                                        </motion.div>
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center pt-8">
                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-apple-blue text-white rounded-apple font-medium hover:bg-apple-blue/90 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>{t.experience.downloadResume}</span>
                            <ExternalLink size={20} className="ml-2" />
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    );
}; 