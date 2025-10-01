import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Github, ArrowUpRight, Sparkles, MessageCircle, Smartphone, Navigation } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/constants';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { useEmailForm } from '../../hooks/useEmailForm';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

export const Contact = () => {
    const staggerRef = useStaggerAnimation(0.1);
    const { register, handleSubmit, errors, isSubmitting, isSubmitted, error } = useEmailForm();
    const { language } = useLanguage();
    const t = translations[language];

    const contactInfo = [
        {
            icon: MessageCircle,
            title: t.contact.contactInfo.email,
            value: SITE_CONFIG.email,
            href: `mailto:${SITE_CONFIG.email}`,
            color: 'from-sky-400 to-blue-500'
        },
        {
            icon: Smartphone,
            title: t.contact.contactInfo.phone,
            value: '010-3283-9307',
            href: 'tel:010-3283-9307',
            color: 'from-emerald-400 to-green-500'
        },
        {
            icon: Navigation,
            title: t.contact.contactInfo.location,
            value: 'Seoul, South Korea',
            href: 'https://maps.google.com/?q=Seoul,South+Korea',
            color: 'from-violet-400 to-purple-500'
        }
    ];

    const socialLinks = [
        {
            icon: Github,
            href: SITE_CONFIG.github,
            label: 'GitHub',
            color: 'hover:bg-gray-900'
        },
        {
            icon: Mail,
            href: `mailto:${SITE_CONFIG.email}`,
            label: 'Email',
            color: 'hover:bg-red-500'
        }
    ];

    return (
        <section id="contact" className="relative section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full blur-3xl" />
            </div>

            <div className="container-apple relative z-10 px-4">
                <div ref={staggerRef} className="space-y-12 sm:space-y-16">
                    {/* Header */}
                    <motion.div
                        className="text-center space-y-4 sm:space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full">
                            <Sparkles size={14} className="sm:w-4 sm:h-4 text-blue-600" />
                            <span className="text-xs sm:text-sm font-semibold text-blue-700">Contact Me</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                            {t.contact.title}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-600 leading-relaxed px-4">
                            {t.contact.subtitle}
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
                        {/* Contact Information - 2 columns */}
                        <motion.div
                            className="lg:col-span-2 space-y-6 sm:space-y-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {/* Intro */}
                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {t.contact.workTogether}
                                </h3>
                                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                    {t.contact.workDescription}
                                </p>
                            </div>

                            {/* Contact Info Cards */}
                            <div className="space-y-4 sm:space-y-5">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={info.title}
                                        href={info.href}
                                        target={info.href.startsWith('http') ? '_blank' : undefined}
                                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="group relative flex items-center gap-4 sm:gap-5 p-5 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100/50 transition-all duration-500 overflow-hidden touch-manipulation hover:scale-[1.02] hover:-translate-y-1"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 8 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* 배경 그라데이션 효과 */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* 아이콘 컨테이너 */}
                                        <div className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${info.color} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl flex-shrink-0 transition-all duration-300 group-hover:scale-105 overflow-hidden`}>
                                            <info.icon size={22} className="sm:w-6 sm:h-6 text-white relative z-10 drop-shadow-sm" />
                                            {/* 미묘한 내부 하이라이트 */}
                                            <div className="absolute top-1 left-1 right-1 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl sm:rounded-t-3xl" />
                                            {/* 호버 시 반짝임 효과 */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        {/* 텍스트 정보 */}
                                        <div className="flex-1 min-w-0 relative z-10">
                                            <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 group-hover:text-gray-800 transition-colors duration-300">{info.title}</h4>
                                            <p className="text-gray-600 text-sm sm:text-base font-medium truncate group-hover:text-gray-700 transition-colors duration-300">{info.value}</p>
                                        </div>

                                        {/* 액션 아이콘 */}
                                        <div className="relative z-10 flex-shrink-0">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                                <ArrowUpRight size={20} className="sm:w-6 sm:h-6 text-gray-500 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                            </div>
                                        </div>

                                        {/* 호버 시 나타나는 미묘한 테두리 */}
                                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-blue-200/50 transition-colors duration-500" />
                                    </motion.a>
                                ))}
                            </div>

                            {/* Social Links */}
                            <motion.div
                                className="pt-4 sm:pt-6 border-t border-gray-200"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">{t.contact.followMe}</h4>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group relative w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 ${social.color} hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden touch-manipulation`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -4, scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={social.label}
                                        >
                                            <social.icon size={20} className="sm:w-[22px] sm:h-[22px] relative z-10" />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form - 3 columns */}
                        <motion.div
                            className="lg:col-span-3"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative bg-gradient-to-br from-white via-white to-blue-50/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/60 p-6 sm:p-8 md:p-12 overflow-hidden">
                                {/* 배경 패턴 */}
                                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

                                {/* 폼 헤더 */}
                                <div className="relative mb-6 sm:mb-8">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                        {t.contact.form.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        {t.contact.form.description}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="relative space-y-5 sm:space-y-7" aria-describedby={error ? 'contact-error' : undefined}>
                                    {/* Success/Error Messages */}
                                    {isSubmitted && (
                                        <motion.div
                                            className="p-4 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <CheckCircle size={20} className="sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                                            <p className="text-sm sm:text-base text-green-800 font-medium">메시지가 성공적으로 전송되었습니다!</p>
                                        </motion.div>
                                    )}

                                    {error && (
                                        <motion.div
                                            id="contact-error"
                                            role="alert"
                                            className="p-4 sm:p-5 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl sm:rounded-2xl"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <p className="text-sm sm:text-base text-red-800 font-medium">{error}</p>
                                        </motion.div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                        <Input
                                            id="contact-name"
                                            label={t.contact.form.name}
                                            {...register('name')}
                                            error={errors.name?.message}
                                            placeholder={t.contact.form.namePlaceholder}
                                        />

                                        <Input
                                            id="contact-email"
                                            label={t.contact.form.email}
                                            type="email"
                                            {...register('email')}
                                            error={errors.email?.message}
                                            placeholder={t.contact.form.emailPlaceholder}
                                        />
                                    </div>

                                    <Input
                                        id="contact-subject"
                                        label={t.contact.form.subject}
                                        {...register('subject')}
                                        error={errors.subject?.message}
                                        placeholder={t.contact.form.subjectPlaceholder}
                                    />

                                    <Textarea
                                        id="contact-message"
                                        label={t.contact.form.message}
                                        {...register('message')}
                                        error={errors.message?.message}
                                        placeholder={t.contact.form.messagePlaceholder}
                                        rows={6}
                                    />

                                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || isSubmitted}
                                            className={`
                                                w-full group relative overflow-hidden 
                                                h-14 sm:h-16 rounded-xl sm:rounded-2xl
                                                font-bold text-base sm:text-lg
                                                transition-all duration-500
                                                ${isSubmitted
                                                    ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 shadow-lg shadow-green-500/30'
                                                    : 'bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 hover:from-sky-400 hover:via-blue-400 hover:to-indigo-400 shadow-xl shadow-blue-300/40 hover:shadow-2xl hover:shadow-blue-400/50'
                                                }
                                                disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none
                                                text-blue-800 hover:text-blue-900
                                                transform hover:-translate-y-0.5
                                                touch-manipulation
                                            `}
                                            aria-live="polite"
                                        >
                                            {/* 반짝이는 효과 */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                            {/* 버튼 내용 */}
                                            <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="relative">
                                                            <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-blue-400/30 border-t-blue-600 rounded-full animate-spin" />
                                                        </div>
                                                        <span className="font-semibold text-sm sm:text-base">{t.contact.form.sending}</span>
                                                    </>
                                                ) : isSubmitted ? (
                                                    <>
                                                        <CheckCircle size={20} className="sm:w-6 sm:h-6 animate-bounce" />
                                                        <span className="font-semibold text-sm sm:text-base">{t.contact.form.messageSent}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={20} className="sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                                                        <span className="font-semibold tracking-wide text-sm sm:text-base">{t.contact.form.sendMessage}</span>
                                                        <ArrowUpRight size={18} className="sm:w-[22px] sm:h-[22px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                                    </>
                                                )}
                                            </div>

                                            {/* 하단 그라데이션 */}
                                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                                        </button>
                                    </motion.div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}; 