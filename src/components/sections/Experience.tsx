import { motion } from 'framer-motion';
import { useState } from 'react';
import { Download } from 'lucide-react';
import { EXPERIENCE_EN, EXPERIENCE_KO, PROJECTS } from '../../lib/constants';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';
import { TimelineDot } from './experience/TimelineDot';
import { ExperienceCard } from './experience/ExperienceCard';
import { GRADIENT_RESUME_BUTTON } from './experience/styles';
import { ProjectDetailModal } from '../ui/project-detail-modal';
import type { Project } from '../../types';

export const Experience = () => {
    const staggerRef = useStaggerAnimation(0.2);
    const { language } = useLanguage();
    const t = translations[language];

    // Select experience data based on language
    const EXPERIENCE = language === 'en' ? EXPERIENCE_EN : EXPERIENCE_KO;

    // Track card heights for syncing
    const [cardHeights, setCardHeights] = useState<number[]>([]);

    // Project modal states
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
    const [showProjectSelector, setShowProjectSelector] = useState(false);

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

    // Get related projects for each experience
    const getRelatedProjects = (experienceId: number): Project[] => {
        const projectMapping: Record<number, string[]> = {
            1: ['1', '2'], // K-Digital: TIBO Backend, TIBO Frontend
            2: ['3'],      // Capstone: TUK Navi
            3: ['4']       // Personal: MIMO Homecam
        };

        const projectIds = projectMapping[experienceId] || [];
        return PROJECTS.filter(project => projectIds.includes(project.id));
    };

    const handleViewProject = (experienceId: number) => {
        const related = getRelatedProjects(experienceId);

        if (related.length === 1) {
            // Single project - open directly
            setSelectedProject(related[0]);
            setIsModalOpen(true);
        } else if (related.length > 1) {
            // Multiple projects - show selector
            setRelatedProjects(related);
            setShowProjectSelector(true);
        }
    };

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project);
        setShowProjectSelector(false);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const handleCloseProjectSelector = () => {
        setShowProjectSelector(false);
        setRelatedProjects([]);
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
        <section id="experience" className="section-padding bg-apple-gray-50">
            <div className="container-apple">
                {/* 구분선 - 모바일에서만 표시 */}
                <div className="block sm:hidden mb-8">
                    <div className="flex items-center justify-center px-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-apple-gray-300 to-transparent"></div>
                        <div className="mx-4 px-3 py-1 bg-apple-gray-100 rounded-full">
                            <span className="text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                                {t.experience.title}
                            </span>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-apple-gray-300 to-transparent"></div>
                    </div>
                </div>

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
                        {/* Enhanced Timeline Line with Animated Gradient - Hidden on mobile */}
                        <div className="hidden sm:block absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 transform -translate-x-1/2">
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
                                        onViewProject={() => handleViewProject(experience.id)}
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
                            <motion.button
                                onClick={downloadResume}
                                className="group/resume relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-white text-sm sm:text-base font-semibold rounded-full overflow-hidden cursor-pointer"
                                style={GRADIENT_RESUME_BUTTON}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 12px 40px rgba(125, 211, 252, 0.5)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                                    {t.experience.downloadResume}
                                    <Download size={18} className="sm:w-5 sm:h-5 group-hover/resume:rotate-12 transition-transform duration-300" />
                                </span>
                                {/* Animated background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 opacity-0 group-hover/resume:opacity-100 transition-opacity duration-500" />
                                {/* Subtle glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-300/30 to-blue-400/30 blur-xl opacity-0 group-hover/resume:opacity-100 transition-opacity duration-500" />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Project Detail Modal */}
            {selectedProject && (
                <ProjectDetailModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}

            {/* Project Selector Modal */}
            {showProjectSelector && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-white/8 backdrop-blur-lg"
                        onClick={handleCloseProjectSelector}
                    />
                    <motion.div
                        className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/20"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-apple-black">관련 프로젝트</h2>
                                    <p className="text-apple-gray-600 text-lg">프로젝트를 선택해주세요</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCloseProjectSelector}
                                className="p-2 hover:bg-apple-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6 text-apple-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Project Cards */}
                        <div className="grid gap-4 md:grid-cols-2">
                            {relatedProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    className="group relative p-6 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}
                                    onClick={() => handleProjectSelect(project)}
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-lg">{project.id}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-apple-black mb-2">{project.title}</h3>
                                            <p className="text-apple-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech.name}
                                                        className="px-2 py-1 bg-white/60 backdrop-blur-sm text-apple-gray-700 text-xs font-medium rounded-lg border border-white/30"
                                                    >
                                                        {tech.name}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="px-2 py-1 bg-white/60 backdrop-blur-sm text-apple-gray-700 text-xs font-medium rounded-lg border border-white/30">
                                                        +{project.technologies.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Close Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleCloseProjectSelector}
                                className="px-6 py-3 bg-gradient-to-r from-apple-gray-100 to-apple-gray-200 hover:from-apple-gray-200 hover:to-apple-gray-300 text-apple-gray-700 font-medium rounded-xl transition-all duration-200"
                            >
                                닫기
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

