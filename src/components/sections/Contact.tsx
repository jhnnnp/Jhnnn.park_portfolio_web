import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Github } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/constants';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { useEmailForm } from '../../hooks/useEmailForm';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

export const Contact = () => {
    const staggerRef = useStaggerAnimation(0.1);
    const { register, handleSubmit, errors, isSubmitting, isSubmitted, error } = useEmailForm();
    const { language } = useLanguage();
    const t = translations[language];

    const contactInfo = [
        {
            icon: Mail,
            title: t.contact.contactInfo.email,
            value: SITE_CONFIG.email,
            href: `mailto:${SITE_CONFIG.email}`
        },
        {
            icon: Phone,
            title: t.contact.contactInfo.phone,
            value: t.contact.contactInfo.phoneValue,
            href: '#'
        },
        {
            icon: MapPin,
            title: t.contact.contactInfo.location,
            value: 'Seoul, South Korea',
            href: '#'
        }
    ];

    const socialLinks = [
        {
            icon: Github,
            href: SITE_CONFIG.github,
            label: 'GitHub'
        },
        {
            icon: Mail,
            href: `mailto:${SITE_CONFIG.email}`,
            label: 'Email'
        }
    ];

    return (
        <section id="contact" className="section-padding bg-white">
            <div className="container-apple">
                <div ref={staggerRef} className="space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-apple-black">{t.contact.title}</h2>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto text-apple-gray-600">
                            {t.contact.subtitle}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-semibold text-apple-black mb-6">
                                    {t.contact.workTogether}
                                </h3>
                                <p className="text-lg text-apple-gray-600 mb-8">
                                    {t.contact.workDescription}
                                </p>
                            </div>

                            {/* Contact Info Cards */}
                            <div className="space-y-4">
                                {contactInfo.map((info) => (
                                    <motion.a
                                        key={info.title}
                                        href={info.href}
                                        className="flex items-center space-x-4 p-4 rounded-apple hover:bg-apple-gray-50 transition-colors duration-300"
                                        whileHover={{ x: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="w-12 h-12 bg-apple-blue/10 rounded-apple-lg flex items-center justify-center">
                                            <info.icon size={24} className="text-apple-blue" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-apple-black">{info.title}</h4>
                                            <p className="text-apple-gray-600">{info.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="pt-8">
                                <h4 className="text-lg font-semibold text-apple-black mb-4">{t.contact.followMe}</h4>
                                <div className="flex space-x-4">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-apple-gray-100 rounded-apple-lg flex items-center justify-center hover:bg-apple-blue hover:text-white transition-all duration-300"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <social.icon size={20} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-6" aria-describedby={error ? 'contact-error' : undefined}>
                                {error && (
                                    <div id="contact-error" role="alert" className="p-4 bg-apple-red/10 border border-apple-red/20 rounded-apple text-apple-red">
                                        {error}
                                    </div>
                                )}

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
                                    rows={5}
                                />

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full group"
                                    size="lg"
                                    aria-live="polite"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>{t.contact.form.sending}</span>
                                        </>
                                    ) : isSubmitted ? (
                                        <>
                                            <CheckCircle size={20} />
                                            <span>{t.contact.form.messageSent}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            <span>{t.contact.form.sendMessage}</span>
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}; 