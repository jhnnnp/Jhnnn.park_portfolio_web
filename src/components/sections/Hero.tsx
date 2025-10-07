// components/Hero.tsx
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/constants';
import { Button } from '../ui/button';
import { useFadeInAnimation } from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

export const Hero = () => {
    const fadeInRef = useFadeInAnimation(0.2);
    const { language } = useLanguage();
    const t = translations[language];

    const scrollToProjects = () => {
        const element = document.querySelector('#projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Jinhan_Park_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden heroSection px-4">
            {/* Background */}
            <div className="absolute inset-0 gradient-hero opacity-50" />

            {/* Animated Background Elements */}
            <motion.div
                className="absolute top-10 sm:top-20 left-5 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-pastel-accent rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-32 sm:w-40 h-32 sm:h-40 bg-pastel-muted rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Content */}
            <div className="container-apple relative z-10 text-center" ref={fadeInRef}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6 sm:space-y-8"
                >
                    {/* Greeting */}
                    <motion.h2
                        className="text-base sm:text-lg md:text-xl text-pastel-secondary font-medium px-4 sm:px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {t.hero.greeting}
                    </motion.h2>

                    {/* Main Title */}
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-pastel-primary leading-tight px-4 sm:px-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {SITE_CONFIG.name}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.h2
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-pastel-secondary px-4 sm:px-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {t.hero.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-pastel-secondary leading-relaxed px-4 sm:px-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        {t.hero.description}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 px-4 sm:px-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                onClick={scrollToProjects}
                                size="lg"
                                className="group bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl w-full sm:w-auto min-w-[200px] touch-manipulation"
                            >
                                <span>{t.hero.viewWork}</span>
                                <ArrowRight size={18} className="sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                onClick={downloadResume}
                                variant="outline"
                                size="lg"
                                className="group bg-sky-500/20 backdrop-blur-sm border-2 border-sky-400/50 hover:bg-sky-500/30 hover:border-sky-400/70 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl w-full sm:w-auto min-w-[200px] touch-manipulation"
                            >
                                <Download size={18} className="sm:w-5 sm:h-5 mr-2" />
                                <span>{t.hero.downloadResume}</span>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>

            {/* Floating Elements */}
            <motion.div
                className="hidden sm:block absolute top-1/4 right-1/4 w-2 h-2 bg-pastel-accent rounded-full"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="hidden sm:block absolute bottom-1/3 left-1/4 w-3 h-3 bg-pastel-muted rounded-full"
                animate={{
                    y: [0, 15, 0],
                    opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </section>
    );
};

export default Hero;
