import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Code, Award, Target, Lightbulb, Clock, Users as UsersIcon } from 'lucide-react';
import { Modal } from './modal';
import { ImageGallery } from './image-gallery';
import type { Project } from '../../types';

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
            transition: { duration: 0.3, ease: 'easeOut' }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={project.title}
            size="xl"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-6 py-6 md:px-8 md:py-8 space-y-8"
            >
                {/* 프로젝트 헤더 */}
                <motion.div variants={itemVariants} className="space-y-6">
                    {/* 프로젝트 설명 */}
                    <div className="relative">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium tracking-tight">
                            {project.description}
                        </p>
                        <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </div>

                    {/* 메타 정보 배지들 */}
                    <div className="flex flex-wrap items-center gap-3">
                        <motion.div
                            className="group relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 rounded-xl backdrop-blur-sm shadow-sm group-hover:shadow-md transition-all duration-300">
                                <Calendar size={16} className="text-slate-600" />
                                <span className="font-semibold text-slate-700 text-sm">{project.year}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="group relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/60 rounded-xl backdrop-blur-sm shadow-sm group-hover:shadow-md transition-all duration-300">
                                <Code size={16} className="text-blue-600" />
                                <span className="font-semibold text-blue-700 text-sm capitalize">{project.category}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="group relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-green-50 to-green-100 border border-green-200/60 rounded-xl backdrop-blur-sm shadow-sm group-hover:shadow-md transition-all duration-300">
                                <Clock size={16} className="text-green-600" />
                                <span className="font-semibold text-green-700 text-sm capitalize">{project.status.replace('-', ' ')}</span>
                            </div>
                        </motion.div>

                        {project.award && (
                            <motion.div
                                className="group relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-100 border border-amber-300/60 rounded-xl backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <Award size={16} className="text-amber-700" />
                                    <span className="font-bold text-amber-800 text-sm">{project.award}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Github size={20} className="relative z-10" />
                                <span className="relative z-10">GitHub</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </motion.a>
                        )}
                        {project.live && (
                            <motion.a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ExternalLink size={20} className="relative z-10" />
                                <span className="relative z-10">Live Demo</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </motion.a>
                        )}
                    </div>
                </motion.div>

                {/* 이미지 갤러리 */}
                {project.detailImages && project.detailImages.length > 0 && (
                    <motion.div variants={itemVariants}>
                        <ImageGallery
                            images={project.detailImages}
                            title="프로젝트 스크린샷"
                        />
                    </motion.div>
                )}

                {/* 상세 설명 */}
                {project.longDescription && (
                    <motion.div variants={itemVariants} className="space-y-3">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Target size={20} className="text-blue-600" />
                            프로젝트 개요
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base pl-7">
                            {project.longDescription}
                        </p>
                    </motion.div>
                )}

                {/* 기술 스택 */}
                <motion.div variants={itemVariants} className="space-y-3">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Code size={20} className="text-purple-600" />
                        기술 스택
                    </h3>
                    <div className="flex flex-wrap gap-2 pl-7">
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
                {project.metrics && (
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Lightbulb size={20} className="text-amber-600" />
                            프로젝트 정보
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-7">
                            {project.metrics.duration && (
                                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock size={16} className="text-green-700" />
                                        <h4 className="font-semibold text-green-900 text-sm">개발 기간</h4>
                                    </div>
                                    <p className="text-green-800 text-sm">{project.metrics.duration}</p>
                                </div>
                            )}
                            {project.metrics.team && (
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <UsersIcon size={16} className="text-purple-700" />
                                        <h4 className="font-semibold text-purple-900 text-sm">팀 구성</h4>
                                    </div>
                                    <p className="text-purple-800 text-sm">{project.metrics.team}</p>
                                </div>
                            )}
                            {project.metrics.note && (
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl md:col-span-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target size={16} className="text-blue-700" />
                                        <h4 className="font-semibold text-blue-900 text-sm">프로젝트 배경</h4>
                                    </div>
                                    <p className="text-blue-800 text-sm leading-relaxed">{project.metrics.note}</p>
                                </div>
                            )}
                            {project.metrics.role && (
                                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl md:col-span-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Code size={16} className="text-orange-700" />
                                        <h4 className="font-semibold text-orange-900 text-sm">담당 역할</h4>
                                    </div>
                                    <p className="text-orange-800 text-sm leading-relaxed">{project.metrics.role}</p>
                                </div>
                            )}
                            {project.metrics.award && (
                                <div className="p-4 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 border border-amber-200 rounded-xl md:col-span-2 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award size={16} className="text-amber-700" />
                                        <h4 className="font-semibold text-amber-900 text-sm">수상 내역</h4>
                                    </div>
                                    <p className="text-amber-800 text-sm font-medium leading-relaxed">{project.metrics.award}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </Modal>
    );
};