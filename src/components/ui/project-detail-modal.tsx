import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Users, Award, Code, Target, Lightbulb } from 'lucide-react';
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
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={project.title}
            size="xl"
        >
            <div className="p-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* 프로젝트 헤더 */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {project.title}
                                </h1>
                                <p className="text-lg text-gray-600 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>{project.year}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Code size={16} />
                                        <span className="capitalize">{project.category}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users size={16} />
                                        <span className="capitalize">{project.status.replace('-', ' ')}</span>
                                    </div>
                                    {project.award && (
                                        <div className="flex items-center gap-1 text-amber-600">
                                            <Award size={16} />
                                            <span>{project.award}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 액션 버튼들 */}
                            <div className="flex gap-2">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                                    >
                                        <Github size={20} />
                                        <span>GitHub</span>
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                        <ExternalLink size={20} />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
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
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Target size={20} />
                                프로젝트 개요
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {project.longDescription}
                            </p>
                        </motion.div>
                    )}

                    {/* 기술 스택 */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Code size={20} />
                            사용 기술
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium"
                                    style={{ backgroundColor: tech.color ? `${tech.color}20` : undefined }}
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* 기타 정보 */}
                    {project.metrics && (
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Lightbulb size={20} />
                                프로젝트 정보
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.metrics.note && (
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-medium text-blue-900 mb-2">프로젝트 배경</h4>
                                        <p className="text-blue-800 text-sm">{project.metrics.note}</p>
                                    </div>
                                )}
                                {project.metrics.duration && (
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <h4 className="font-medium text-green-900 mb-2">개발 기간</h4>
                                        <p className="text-green-800 text-sm">{project.metrics.duration}</p>
                                    </div>
                                )}
                                {project.metrics.team && (
                                    <div className="p-4 bg-purple-50 rounded-lg">
                                        <h4 className="font-medium text-purple-900 mb-2">팀 구성</h4>
                                        <p className="text-purple-800 text-sm">{project.metrics.team}</p>
                                    </div>
                                )}
                                {project.metrics.role && (
                                    <div className="p-4 bg-orange-50 rounded-lg">
                                        <h4 className="font-medium text-orange-900 mb-2">담당 역할</h4>
                                        <p className="text-orange-800 text-sm">{project.metrics.role}</p>
                                    </div>
                                )}
                                {project.metrics.award && (
                                    <div className="p-4 bg-amber-50 rounded-lg md:col-span-2">
                                        <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
                                            <Award size={16} />
                                            수상 내역
                                        </h4>
                                        <p className="text-amber-800 text-sm">{project.metrics.award}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </Modal>
    );
};

