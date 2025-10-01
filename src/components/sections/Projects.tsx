import React, { useState, useCallback, memo, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ExternalLink, Github, Eye, Star, Filter, Search, ChevronDown, Info, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { ProjectDetailModal } from '../ui/project-detail-modal';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { PROJECTS, SKILLS } from '../../lib/constants';
import type { Project, ProjectsProps } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

// 프로젝트 카드 컴포넌트
const ProjectCard = memo<{
    project: Project;
    index: number;
    onProjectSelect: (project: Project) => void;
}>(({ project, index, onProjectSelect }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [showAllTechnologies, setShowAllTechnologies] = useState(false);
    const { language } = useLanguage();
    const t = translations[language];

    // 애니메이션 variants
    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.95,
            transition: { duration: 0.3 }
        }
    };

    const hoverVariants: Variants = {
        hover: {
            y: -12,
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    // 프로젝트 이미지 또는 플레이스홀더
    const ProjectImage = useCallback(() => {
        // icon이 있으면 icon을 우선적으로 표시 (전체 크기로)
        if (project.icon) {
            // MIMO와 K-Digital 프로젝트는 아이콘 크기를 살짝 줄임
            const iconPadding = ['3', '4', '5', '6'].includes(project.id) ? 'p-8' : 'p-6';

            return (
                <div className={`absolute inset-0 flex items-center justify-center bg-pastel-gradient ${iconPadding}`}>
                    <img
                        src={project.icon}
                        alt={`${project.title} icon`}
                        className="w-full h-full object-contain rounded-3xl"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                    />
                </div>
            );
        }

        // icon이 없고 image가 있으면 image 표시
        if (project.image && !imageError) {
            return (
                <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                />
            );
        }

        // icon도 없고 image도 없거나 에러나면 기본 플레이스홀더
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-pastel-gradient">
                <div className="text-center">
                    <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl border border-white/20">
                        <span className="text-pastel-primary font-bold text-2xl">
                            {project.title.charAt(0)}
                        </span>
                    </div>
                    <p className="text-pastel-secondary text-sm font-medium">{project.category.toUpperCase()}</p>
                </div>
            </div>
        );
    }, [project.image, project.icon, project.title, project.category, imageLoaded, imageError]);

    // 상태 배지 색상
    const getStatusColor = (status: Project['status']) => {
        const colors = {
            completed: 'bg-green-100 text-green-800',
            'in-progress': 'bg-blue-100 text-blue-800',
            maintenance: 'bg-yellow-100 text-yellow-800'
        };
        return colors[status];
    };

    return (
        <motion.div
            className="group relative"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            layout
        >
            <motion.article
                className={`card-pastel overflow-hidden h-full ${project.award
                    ? 'ring-4 ring-blue-300 shadow-2xl shadow-blue-300/25 border-4 border-blue-300'
                    : ''
                    }`}
                variants={hoverVariants}
                role="article"
                aria-labelledby={`project-title-${project.id}`}
                aria-describedby={`project-desc-${project.id}`}
            >
                {/* 프로젝트 이미지 */}
                <div className="relative aspect-video bg-pastel-muted overflow-hidden">
                    <ProjectImage />

                    {/* 배지들 */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2 max-w-[calc(100%-1rem)] sm:max-w-none">
                        {project.award && (
                            <motion.span
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-amber-300 to-amber-400 text-amber-900 text-[10px] sm:text-xs font-bold rounded-full flex items-center gap-1 sm:gap-1.5 shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                aria-label="Award winning project"
                            >
                                <Award size={12} className="sm:w-[14px] sm:h-[14px]" />
                                <span className="hidden sm:inline">{project.award}</span>
                            </motion.span>
                        )}
                        {project.featured && (
                            <motion.span
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-pastel-accent text-pastel-primary text-[10px] sm:text-xs font-semibold rounded-full flex items-center gap-1 sm:gap-1.5 shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                aria-label="Featured project"
                            >
                                <Star size={10} className="sm:w-3 sm:h-3" />
                                <span className="hidden sm:inline">{t.projects.featured}</span>
                            </motion.span>
                        )}
                        <span className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                            {project.status.replace('-', ' ')}
                        </span>
                    </div>

                    {/* 오버레이 액션 */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center touch-none pointer-events-none group-hover:pointer-events-auto">
                        <div className="flex gap-2 sm:gap-3">
                            {/* 포트폴리오 웹사이트가 아닌 경우에만 Info 버튼 표시 */}
                            {project.id !== '7' && (
                                <motion.button
                                    className="p-2.5 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors touch-manipulation"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={`View ${project.title} details`}
                                    onClick={() => onProjectSelect(project)}
                                >
                                    <Info size={18} className="sm:w-5 sm:h-5 text-gray-900" />
                                </motion.button>
                            )}
                            {project.github && (
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors touch-manipulation"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={`View ${project.title} source code on GitHub`}
                                >
                                    <Github size={18} className="sm:w-5 sm:h-5 text-gray-900" />
                                </motion.a>
                            )}
                            {/* 포트폴리오 웹사이트가 아닌 경우에만 Live Demo 버튼 표시 */}
                            {project.live && project.id !== '7' && (
                                <motion.a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors touch-manipulation"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={`View ${project.title} live demo`}
                                >
                                    <Eye size={18} className="sm:w-5 sm:h-5 text-gray-900" />
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>

                {/* 프로젝트 내용 */}
                <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                    <div>
                        <div className="flex items-start justify-between mb-2 gap-2">
                            <h3
                                id={`project-title-${project.id}`}
                                className="text-lg sm:text-xl font-bold text-pastel-primary group-hover:text-blue-600 transition-colors flex-1 min-w-0 break-words"
                            >
                                {project.title}
                            </h3>
                            <span className="text-xs sm:text-sm text-pastel-secondary font-medium flex-shrink-0">{project.year}</span>
                        </div>
                        <p
                            id={`project-desc-${project.id}`}
                            className="text-pastel-secondary text-xs sm:text-sm leading-relaxed"
                        >
                            {project.description}
                        </p>
                    </div>

                    {/* 기술 스택 */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {(showAllTechnologies ? project.technologies : project.technologies.slice(0, 4)).map((tech, idx) => (
                            <span
                                key={`${tech.name}-${idx}`}
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-pastel-muted text-pastel-primary text-[10px] sm:text-xs font-medium rounded-full hover:bg-pastel-accent transition-colors"
                                style={{ backgroundColor: tech.color ? `${tech.color}20` : undefined }}
                            >
                                {tech.name}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <motion.button
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-pastel-muted text-pastel-primary text-[10px] sm:text-xs font-medium rounded-full hover:bg-pastel-accent transition-colors cursor-pointer touch-manipulation"
                                onClick={() => setShowAllTechnologies(!showAllTechnologies)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {showAllTechnologies
                                    ? t.projects.showLess
                                    : `+${project.technologies.length - 4} ${t.projects.more}`
                                }
                            </motion.button>
                        )}
                    </div>

                    {/* 기타 사항 (있는 경우) */}
                    {project.metrics && (
                        <div className="pt-3 sm:pt-4 border-t border-pastel-muted">
                            <div className="text-[10px] sm:text-xs text-pastel-secondary space-y-1">
                                {project.metrics.note && (
                                    <p className="leading-relaxed">{project.metrics.note}</p>
                                )}
                                {project.metrics.duration && (
                                    <p><span className="font-medium">{t.projects.metrics.duration}:</span> {project.metrics.duration}</p>
                                )}
                                {project.metrics.team && (
                                    <p><span className="font-medium">{t.projects.metrics.team}:</span> {project.metrics.team}</p>
                                )}
                                {project.metrics.role && (
                                    <p className="leading-relaxed"><span className="font-medium">{t.projects.metrics.role}:</span> {project.metrics.role}</p>
                                )}
                                {project.metrics.award && (
                                    <p><span className="font-medium flex items-center gap-1"><Award size={12} className="sm:w-[14px] sm:h-[14px]" /> {t.projects.metrics.award}:</span> {project.metrics.award}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </motion.article>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';

// 메인 Projects 컴포넌트
export const Projects = memo<ProjectsProps>(({
    projects = PROJECTS,
    className = '',
    showFilters = true,
    showSearch = true
}) => {
    // 상태 관리
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedTech, setSelectedTech] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'featured' | 'status'>('status');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const staggerRef = useStaggerAnimation(0.1);
    const { language } = useLanguage();
    const t = translations[language];

    // 카테고리 및 기술 옵션
    const categories = ['all', 'web', 'mobile', 'api'];
    const technologies = useMemo(() => {
        // SKILLS에서 주요 기술들을 우선적으로 사용
        const skillNames = new Set<string>();
        Object.values(SKILLS).forEach(skillArray => {
            skillArray.forEach(skill => skillNames.add(skill.name));
        });

        // 프로젝트에서 사용된 기술들 중 SKILLS에 없는 것들만 추가
        projects.forEach(project => {
            project.technologies.forEach(tech => {
                if (!skillNames.has(tech.name)) {
                    skillNames.add(tech.name);
                }
            });
        });

        // SKILLS에 있는 기술들을 먼저, 그 다음 나머지 기술들을 정렬
        const skillsArray = Object.values(SKILLS).flat().map(skill => skill.name);
        const otherTechs = Array.from(skillNames).filter(tech => !skillsArray.includes(tech as any));

        return ['all', ...skillsArray.sort(), ...otherTechs.sort()];
    }, [projects]);

    // 프로젝트 필터링 및 정렬
    const filteredAndSortedProjects = useMemo(() => {
        let filtered = projects.filter(project => {
            const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
            const matchesTech = selectedTech === 'all' ||
                project.technologies.some(tech => tech.name === selectedTech);
            const matchesSearch = searchQuery === '' ||
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesTech && matchesSearch;
        });

        // 정렬
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => b.year - a.year);
                break;
            case 'oldest':
                filtered.sort((a, b) => a.year - b.year);
                break;
            case 'featured':
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            case 'status':
                // 진행 중인 프로젝트를 먼저, 그 다음 완료된 프로젝트
                filtered.sort((a, b) => {
                    if (a.status === 'in-progress' && b.status !== 'in-progress') return -1;
                    if (a.status !== 'in-progress' && b.status === 'in-progress') return 1;
                    // 같은 상태 내에서는 최신순
                    return b.year - a.year;
                });
                break;
        }

        return filtered;
    }, [projects, selectedCategory, selectedTech, searchQuery, sortBy]);

    // 이벤트 핸들러
    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    const handleTechChange = useCallback((tech: string) => {
        setSelectedTech(tech);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleViewMoreProjects = useCallback(() => {
        window.open('https://github.com/jinhanpark', '_blank', 'noopener,noreferrer');
    }, []);

    // 컨테이너 애니메이션
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    return (
        <section
            id="projects"
            className={`section-padding bg-pastel-gradient ${className}`}
            aria-labelledby="projects-heading"
        >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={staggerRef}
                    className="space-y-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* 헤더 */}
                    <div className="text-center space-y-6 max-w-4xl mx-auto">
                        <motion.h2
                            id="projects-heading"
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-pastel-primary"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {t.projects.title}
                        </motion.h2>
                        <motion.p
                            className="text-lg md:text-xl text-pastel-secondary leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {t.projects.subtitle}
                        </motion.p>
                    </div>

                    {/* 검색 및 필터 */}
                    {(showSearch || showFilters) && (
                        <motion.div
                            className="card-pastel p-4 sm:p-5 md:p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                {/* 검색 */}
                                {showSearch && (
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pastel-secondary pointer-events-none" size={16} />
                                        <input
                                            type="text"
                                            placeholder={t.projects.searchPlaceholder}
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm border border-pastel-muted rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white touch-manipulation"
                                            aria-label="Search projects"
                                        />
                                    </div>
                                )}

                                {/* 카테고리 필터 */}
                                {showFilters && (
                                    <div className="relative">
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => handleCategoryChange(e.target.value)}
                                            className="w-full appearance-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-pastel-muted rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white touch-manipulation"
                                            aria-label="Filter by category"
                                        >
                                            {categories.map(category => (
                                                <option key={category} value={category}>
                                                    {category === 'all' ? t.projects.allCategories : category.charAt(0).toUpperCase() + category.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pastel-secondary pointer-events-none" size={16} />
                                    </div>
                                )}

                                {/* 기술 필터 */}
                                {showFilters && (
                                    <div className="relative">
                                        <select
                                            value={selectedTech}
                                            onChange={(e) => handleTechChange(e.target.value)}
                                            className="w-full appearance-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-pastel-muted rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white touch-manipulation"
                                            aria-label="Filter by technology"
                                        >
                                            {technologies.map(tech => (
                                                <option key={tech} value={tech}>
                                                    {tech === 'all' ? t.projects.allTechnologies : tech}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pastel-secondary pointer-events-none" size={16} />
                                    </div>
                                )}

                                {/* 정렬 */}
                                {showFilters && (
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as any)}
                                            className="w-full appearance-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-pastel-muted rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white touch-manipulation"
                                            aria-label="Sort projects"
                                        >
                                            <option value="status">{t.projects.sortOptions.status}</option>
                                            <option value="newest">{t.projects.sortOptions.newest}</option>
                                            <option value="oldest">{t.projects.sortOptions.oldest}</option>
                                            <option value="featured">{t.projects.sortOptions.featured}</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pastel-secondary pointer-events-none" size={16} />
                                    </div>
                                )}
                            </div>

                            {/* 필터 결과 */}
                            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-pastel-secondary">
                                <span>
                                    {t.projects.showing} {filteredAndSortedProjects.length} {t.projects.of} {projects.length} {t.projects.projects}
                                </span>
                                {(selectedCategory !== 'all' || selectedTech !== 'all' || searchQuery) && (
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setSelectedTech('all');
                                            setSearchQuery('');
                                        }}
                                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors touch-manipulation px-2 py-1 -ml-2 sm:ml-0"
                                    >
                                        {t.projects.clearFilters}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* 프로젝트 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        <AnimatePresence mode="wait">
                            {filteredAndSortedProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onProjectSelect={(project) => {
                                        setSelectedProject(project);
                                        setIsModalOpen(true);
                                    }}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* 빈 상태 */}
                    {filteredAndSortedProjects.length === 0 && (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 bg-pastel-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Filter size={32} className="text-pastel-secondary" />
                                </div>
                                <h3 className="text-xl font-semibold text-pastel-primary mb-2">{t.projects.noProjectsFound}</h3>
                                <p className="text-pastel-secondary mb-6">
                                    {t.projects.noProjectsDescription}
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedTech('all');
                                        setSearchQuery('');
                                    }}
                                    className="btn-pastel"
                                >
                                    {t.projects.clearAllFilters}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* 더 보기 버튼 */}
                    {filteredAndSortedProjects.length > 0 && (
                        <motion.div
                            className="text-center pt-8 sm:pt-12 px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleViewMoreProjects}
                                className="group relative overflow-hidden btn-pastel px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 touch-manipulation"
                            >
                                <span className="relative z-10 font-semibold">{t.projects.exploreAllProjects}</span>
                                <ExternalLink
                                    size={18}
                                    className="sm:w-5 sm:h-5 ml-2 sm:ml-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                                <div className="absolute inset-0 bg-pastel-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* 프로젝트 상세 모달 */}
            <ProjectDetailModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedProject(null);
                }}
            />
        </section>
    );
});

Projects.displayName = 'Projects';

// 에러 바운더리 HOC
export const ProjectsWithErrorBoundary = (props: ProjectsProps) => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <Projects {...props} />
        </Suspense>
    );
};

export default ProjectsWithErrorBoundary;
