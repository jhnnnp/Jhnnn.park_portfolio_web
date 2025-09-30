import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../lib/constants';
import { useScrollY } from '../../hooks/useScrollY';
import { useScrollProgress } from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

export const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const scrollY = useScrollY();
    const scrollProgress = useScrollProgress();
    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        const handleScroll = () => {
            const sections = NAVIGATION_ITEMS.map(item => item.href.replace('#', ''));
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (!element) return false;
                const rect = element.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const isScrolled = scrollY > 50;

    // Mobile menu a11y: focus trap and ESC to close
    const menuRef = useRef<HTMLDivElement | null>(null);
    const firstFocusableRef = useRef<HTMLAnchorElement | null>(null);
    const lastFocusableRef = useRef<HTMLAnchorElement | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isMenuOpen) return;
        if (e.key === 'Escape') {
            setIsMenuOpen(false);
            return;
        }
        if (e.key === 'Tab' && menuRef.current) {
            const focusable = menuRef.current.querySelectorAll<HTMLElement>('a, button');
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    (last as HTMLElement).focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    (first as HTMLElement).focus();
                }
            }
        }
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Focus first focusable element in menu
            setTimeout(() => {
                firstFocusableRef.current?.focus();
            }, 0);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMenuOpen, handleKeyDown]);

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 z-50 h-1 bg-apple-blue origin-left"
                style={{ scaleX: scrollProgress / 100 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: scrollProgress / 100 }}
                transition={{ duration: 0.1 }}
            />

            {/* Desktop Navigation */}
            <motion.nav
                className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                    ? 'bg-background-glass backdrop-blur-md border-b border-white/20 shadow-apple'
                    : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                role="navigation"
                aria-label="Primary"
            >
                <div className="container-apple">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            className="text-xl font-bold text-apple-black"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            Jhnnn.Park
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {NAVIGATION_ITEMS.map((item) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                                    className={`nav-link text-sm font-medium transition-colors duration-200 ${activeSection === item.href.replace('#', '')
                                        ? 'text-apple-blue'
                                        : 'text-apple-gray-600 hover:text-apple-gray-900'
                                        }`}
                                    aria-current={activeSection === item.href.replace('#', '') ? 'page' : undefined}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {t.navigation[item.name.toLowerCase() as keyof typeof t.navigation]}
                                </motion.a>
                            ))}

                            {/* Language Toggle */}
                            <motion.button
                                onClick={toggleLanguage}
                                className="px-3 py-1.5 text-sm font-medium text-apple-gray-600 hover:text-apple-blue transition-colors duration-200 border border-apple-gray-200 rounded-full hover:border-apple-blue"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {language === 'en' ? '한국어' : 'EN'}
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 rounded-apple hover:bg-apple-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsMenuOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="absolute top-16 left-0 right-0 glass backdrop-blur-md"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            ref={menuRef}
                        >
                            <div className="container-apple py-6">
                                <div className="flex flex-col space-y-4">
                                    {NAVIGATION_ITEMS.map((item, idx) => (
                                        <motion.a
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                                            className={`text-left text-lg font-medium py-3 px-4 rounded-apple transition-colors ${activeSection === item.href.replace('#', '')
                                                ? 'text-apple-blue bg-apple-blue/10'
                                                : 'text-apple-black hover:bg-apple-gray-100'
                                                }`}
                                            whileHover={{ x: 10 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-current={activeSection === item.href.replace('#', '') ? 'page' : undefined}
                                            ref={idx === 0 ? firstFocusableRef : (idx === NAVIGATION_ITEMS.length - 1 ? lastFocusableRef : undefined)}
                                        >
                                            {t.navigation[item.name.toLowerCase() as keyof typeof t.navigation]}
                                        </motion.a>
                                    ))}

                                    {/* Mobile Language Toggle */}
                                    <motion.button
                                        onClick={toggleLanguage}
                                        className="text-left text-lg font-medium py-3 px-4 rounded-apple transition-colors text-apple-black hover:bg-apple-gray-100 border-t border-apple-gray-200 mt-4 pt-4"
                                        whileHover={{ x: 10 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {language === 'en' ? '한국어로 전환' : 'Switch to English'}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}; 