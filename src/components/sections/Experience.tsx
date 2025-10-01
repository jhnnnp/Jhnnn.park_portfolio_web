import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { EXPERIENCE_EN, EXPERIENCE_KO } from '../../lib/constants';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';
import { TimelineDot } from './experience/TimelineDot';
import { ExperienceCard } from './experience/ExperienceCard';
import { GRADIENT_RESUME_BUTTON } from './experience/styles';

export const Experience = () => {
    const staggerRef = useStaggerAnimation(0.2);
    const { language } = useLanguage();
    const t = translations[language];

    // Select experience data based on language
    const EXPERIENCE = language === 'en' ? EXPERIENCE_EN : EXPERIENCE_KO;

    // Track card heights for syncing
    const [cardHeights, setCardHeights] = useState<number[]>([]);

    const handleHeightMeasured = (index: number, height: number) => {
        setCardHeights(prev => {
            const newHeights = [...prev];
            newHeights[index] = height;
            return newHeights;
        });
    };

    const getProjectTypeText = (id: number) => {
        if (id === 1) return t.experience.projectTypes.kDigital;
        if (id === 2) return t.experience.projectTypes.capstone;
        return t.experience.projectTypes.personal;
    };

    const getProjectNameText = (id: number) => {
        if (id === 1) return t.experience.projectNames.tibo;
        if (id === 2) return t.experience.projectNames.tuk;
        return t.experience.projectNames.mimo;
    };

    const getImageTitle = (id: number) => {
        if (id === 1) return 'TIBO App';
        if (id === 2) return 'TUK Navi';
        return 'MIMO Homecam';
    };

    const getImageLayout = (id: number): 'horizontal' | 'vertical' => {
        return id === 2 ? 'horizontal' : 'vertical';
    };

    return (
        <section id="experience" className="section-padding bg-apple-gray-50">
            <div className="container-apple">
                <div ref={staggerRef} className="space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-3 sm:space-y-4 px-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-apple-black">
                            {t.experience.title}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-apple-gray-600">
                            {t.experience.subtitle}
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="relative max-w-6xl mx-auto px-4">
                        {/* Enhanced Timeline Line with Animated Gradient */}
                        <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 transform -translate-x-1/2">
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
                        <div className="space-y-12 sm:space-y-16 md:space-y-20">
                            {EXPERIENCE.map((experience, index) => (
                                <div key={experience.id} className="relative">
                                    {/* Timeline Dot */}
                                    <TimelineDot
                                        index={index}
                                        isAwardWinner={experience.id === 1}
                                    />

                                    {/* Experience Card */}
                                    <ExperienceCard
                                        experience={experience}
                                        index={index}
                                        cardHeights={cardHeights}
                                        onHeightMeasured={handleHeightMeasured}
                                        projectTypeText={getProjectTypeText(experience.id)}
                                        projectNameText={getProjectNameText(experience.id)}
                                        viewProjectText={t.experience.viewProject}
                                        technologiesText={t.experience.technologies}
                                        keyAchievementsText={t.experience.keyAchievements}
                                        awardText={experience.id === 1 ? t.experience.award : undefined}
                                        imageTitle={getImageTitle(experience.id)}
                                        imageLayout={getImageLayout(experience.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Call to Action */}
                    <div className="text-center pt-8 sm:pt-12 px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/resume relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-white text-sm sm:text-base font-semibold rounded-full overflow-hidden"
                                style={GRADIENT_RESUME_BUTTON}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 12px 40px rgba(125, 211, 252, 0.5)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                                    {t.experience.downloadResume}
                                    <ExternalLink size={18} className="sm:w-5 sm:h-5 group-hover/resume:rotate-12 transition-transform duration-300" />
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

