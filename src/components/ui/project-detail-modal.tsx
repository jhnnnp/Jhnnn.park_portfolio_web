import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Code, Award, Target, Lightbulb, Clock, Users as UsersIcon } from 'lucide-react';
import { Modal } from './modal';
import { ImageGallery } from './image-gallery';
import type { Project } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

interface ProjectDetailModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
    project,
    isOpen,
    onClose
}) => {
    if (!project) return null;

    const { language } = useLanguage();
    const t = translations[language];
    const localized = useMemo(() => {
        const loc = project.translations?.[language];
        return {
            title: loc?.title || project.title,
            description: loc?.description || project.description,
            longDescription: loc?.longDescription || project.longDescription,
            metrics: {
                note: loc?.metrics?.note || project.metrics?.note,
                duration: loc?.metrics?.duration || project.metrics?.duration,
                team: loc?.metrics?.team || project.metrics?.team,
                role: loc?.metrics?.role || project.metrics?.role,
                award: loc?.metrics?.award || project.metrics?.award,
            }
        } as const;
    }, [language, project]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel={localized.title}
            size="xl"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 space-y-4 sm:space-y-6 md:space-y-8"
            >
                {/* 프로젝트 헤더 - 프로페셔널 디자인 */}
                <motion.div variants={itemVariants} className="relative">
                    {/* 헤더 배경 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 rounded-t-2xl -mx-3 sm:-mx-6 md:-mx-8 -mt-3 sm:-mt-6 md:-mt-8 pt-3 sm:pt-6 md:pt-8" />

                    {/* 헤더 콘텐츠 */}
                    <div className="relative z-10 space-y-6">
                        {/* 프로젝트 제목과 설명 */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                                    {localized.title}
                                </h1>
                                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                            </div>

                            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium max-w-4xl">
                                {localized.description}
                            </p>
                        </div>

                        {/* 메타 정보 배지들 */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <motion.div
                                className="group relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-lg sm:rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                                    <Calendar size={14} className="sm:w-4 sm:h-4 text-slate-600" />
                                    <span className="font-semibold text-slate-700 text-xs sm:text-sm">{project.year}</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="group relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/90 backdrop-blur-sm border border-blue-200/60 rounded-lg sm:rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                                    <Code size={14} className="sm:w-4 sm:h-4 text-blue-600" />
                                    <span className="font-semibold text-blue-700 text-xs sm:text-sm capitalize">{project.category}</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="group relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/90 backdrop-blur-sm border border-green-200/60 rounded-lg sm:rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                                    <Clock size={14} className="sm:w-4 sm:h-4 text-green-600" />
                                    <span className="font-semibold text-green-700 text-xs sm:text-sm capitalize">{t.projects.statusLabels?.[project.status] ?? project.status.replace('-', ' ')}</span>
                                </div>
                            </motion.div>

                            {project.award && (
                                <motion.div
                                    className="group relative overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-100 border border-amber-300/60 rounded-lg sm:rounded-xl backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300">
                                        <Award size={14} className="sm:w-4 sm:h-4 text-amber-700" />
                                        <span className="font-bold text-amber-800 text-xs sm:text-sm">{project.award}</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* 액션 버튼들 */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                            {project.github && (
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden touch-manipulation"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Github size={16} className="sm:w-5 sm:h-5 relative z-10" />
                                    <span className="relative z-10">{t.modal.github}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </motion.a>
                            )}
                            {project.live && (
                                <motion.a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden touch-manipulation"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <ExternalLink size={16} className="sm:w-5 sm:h-5 relative z-10" />
                                    <span className="relative z-10">{t.modal.liveDemo}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </motion.a>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* 데모 영상 */}
                {project.demoVideo && (
                    <motion.div variants={itemVariants} className="space-y-2 sm:space-y-3">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                            <span className="text-sm sm:text-base md:text-lg pl-1">{t.modal.demoVideo}</span>
                        </h3>
                        <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-900 to-gray-800" style={{ aspectRatio: '16 / 9' }}>
                            <video
                                controls
                                preload="metadata"
                                className="w-full h-full object-contain"
                                poster={project.detailImages?.[0] || project.image}
                            >
                                <source src={project.demoVideo} type="video/mp4" />
                                {t.modal.videoUnsupported}
                            </video>
                        </div>
                    </motion.div>
                )}

                {/* 이미지 갤러리 */}
                {project.detailImages && project.detailImages.length > 0 && (
                    <motion.div variants={itemVariants}>
                        <ImageGallery
                            images={project.detailImages}
                            title={t.modal.projectScreenshots}
                        />
                    </motion.div>
                )}

                {/* 상세 설명 */}
                {localized.longDescription && (
                    <motion.div variants={itemVariants} className="space-y-3">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Target size={20} className="text-blue-600" />
                            {t.modal.overview}
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base pl-2 sm:pl-7">
                            {localized.longDescription}
                        </p>
                    </motion.div>
                )}

                {/* 기술 스택 */}
                <motion.div variants={itemVariants} className="space-y-3">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Code size={20} className="text-purple-600" />
                        {t.modal.techStack}
                    </h3>
                    <div className="flex flex-wrap gap-2 pl-2 sm:pl-7">
                        {project.technologies.map((tech, index) => (
                            <motion.span
                                key={index}
                                className="px-3 py-1.5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-gray-800 rounded-lg text-xs md:text-sm font-medium shadow-sm"
                                style={{
                                    backgroundColor: tech.color ? `${tech.color}15` : undefined,
                                    borderColor: tech.color ? `${tech.color}30` : undefined
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                                {tech.name}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* 프로젝트 상세 정보 */}
                {(localized.metrics.note || localized.metrics.duration || localized.metrics.team || localized.metrics.role || localized.metrics.award) && (
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Lightbulb size={20} className="text-amber-600" />
                            {t.modal.projectInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2 sm:pl-7">
                            {localized.metrics.duration && (
                                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock size={16} className="text-green-700" />
                                        <h4 className="font-semibold text-green-900 text-sm">{t.modal.developmentPeriod}</h4>
                                    </div>
                                    <p className="text-green-800 text-sm">{localized.metrics.duration}</p>
                                </div>
                            )}
                            {localized.metrics.team && (
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <UsersIcon size={16} className="text-purple-700" />
                                        <h4 className="font-semibold text-purple-900 text-sm">{t.modal.team}</h4>
                                    </div>
                                    <p className="text-purple-800 text-sm">{localized.metrics.team}</p>
                                </div>
                            )}
                            {localized.metrics.note && (
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl md:col-span-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target size={16} className="text-blue-700" />
                                        <h4 className="font-semibold text-blue-900 text-sm">{t.modal.background}</h4>
                                    </div>
                                    <p className="text-blue-800 text-sm leading-relaxed">{localized.metrics.note}</p>
                                </div>
                            )}
                            {localized.metrics.role && (
                                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl md:col-span-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Code size={16} className="text-orange-700" />
                                        <h4 className="font-semibold text-orange-900 text-sm">{t.modal.role}</h4>
                                    </div>
                                    <p className="text-orange-800 text-sm leading-relaxed">{localized.metrics.role}</p>
                                </div>
                            )}
                            {localized.metrics.award && (
                                <div className="p-4 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 border border-amber-200 rounded-xl md:col-span-2 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award size={16} className="text-amber-700" />
                                        <h4 className="font-semibold text-amber-900 text-sm">{t.modal.awards}</h4>
                                    </div>
                                    <p className="text-amber-800 text-sm font-medium leading-relaxed">{localized.metrics.award}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </Modal>
    );
};