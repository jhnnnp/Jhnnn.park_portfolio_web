import { motion } from 'framer-motion';
import { ArrowUp, Github, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

export const Footer = () => {
    const { language } = useLanguage();
    const t = translations[language];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gray-900 text-white relative z-10 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12">
                    {/* Main Footer Content */}
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {/* Brand */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">{SITE_CONFIG.name}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t.footer.description}
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold">{t.footer.quickLinks}</h4>
                            <ul className="space-y-2">
                                {t.footer.links.map((link) => (
                                    <li key={link.name}>
                                        <motion.a
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {link.name}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact & Social */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold">{t.footer.contact}</h4>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Mail size={16} className="text-blue-400" />
                                    <a
                                        href={`mailto:${SITE_CONFIG.email}`}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {SITE_CONFIG.email}
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Github size={16} className="text-blue-400" />
                                    <a
                                        href={SITE_CONFIG.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        GitHub
                                    </a>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Seoul, South Korea
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-700 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            {/* Copyright */}
                            <div className="flex items-center">
                                <span className="text-sm text-gray-400">{t.footer.copyright}</span>
                            </div>

                            {/* Back to Top */}
                            <motion.button
                                onClick={scrollToTop}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-600 hover:border-gray-500 bg-gray-800/50"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>{t.footer.backToTop}</span>
                                <ArrowUp size={16} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}; 