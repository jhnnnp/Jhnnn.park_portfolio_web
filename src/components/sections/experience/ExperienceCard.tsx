import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MapPin, Calendar, Award } from 'lucide-react';
import { TechnologyBadges } from './TechnologyBadges';
import { AchievementsList } from './AchievementsList';
import { ProjectLink } from './ProjectLink';
import { GLASSMORPHISM_CARD } from './styles';
import { CARD_HOVER_ANIMATION } from './animations';
import { ImageGallery } from '../../ui/image-gallery';
import type { Experience } from './types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  cardHeights: number[];
  onHeightMeasured: (index: number, height: number) => void;
  projectTypeText: string;
  projectNameText: string;
  viewProjectText: string;
  technologiesText: string;
  keyAchievementsText: string;
  awardText?: string;
  imageTitle: string;
  imageLayout: 'horizontal' | 'vertical';
}

export const ExperienceCard = ({
  experience,
  index,
  cardHeights,
  onHeightMeasured,
  projectTypeText,
  projectNameText,
  viewProjectText,
  technologiesText,
  keyAchievementsText,
  awardText,
  imageTitle,
  imageLayout
}: ExperienceCardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const computedStyle = window.getComputedStyle(contentRef.current);
      const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
      const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
      const height = contentRef.current.offsetHeight + paddingTop + paddingBottom;
      onHeightMeasured(index, height);
    }
  }, [index, onHeightMeasured]);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Content Card */}
      <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} w-full`}>
        <motion.div
          className="relative p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6 overflow-hidden group cursor-pointer"
          style={GLASSMORPHISM_CARD}
          {...CARD_HOVER_ANIMATION}
        >
          <div ref={contentRef}>
            {/* Enhanced Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-sky-50/40 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-all duration-700" />

            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-300/20 via-blue-200/20 to-cyan-200/20 p-[1px]">
                <div className="w-full h-full bg-white/90 rounded-2xl backdrop-blur-sm" />
              </div>
            </motion.div>

            {/* Header */}
            <div className="space-y-2 sm:space-y-3 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <motion.h3
                    className="text-lg sm:text-xl font-bold text-apple-black mb-1.5 sm:mb-2 group-hover:text-blue-500 transition-colors duration-300 break-words"
                    whileHover={{ x: 5 }}
                  >
                    {experience.position}
                  </motion.h3>
                  <div className="flex items-center space-x-2 text-apple-gray-600">
                    <motion.div
                      className="p-1.5 bg-gradient-to-br from-sky-200/30 to-blue-100/50 rounded-lg flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <MapPin size={14} className="text-blue-400" />
                    </motion.div>
                    <span className="font-semibold text-sm sm:text-base truncate">{experience.company}</span>
                  </div>
                </div>
                <motion.div
                  className="relative flex-shrink-0 self-start"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-sky-200/30 via-blue-100/50 to-cyan-100/30 text-blue-600 text-xs rounded-full font-semibold border border-sky-300/30 backdrop-blur-sm">
                    <span className="whitespace-normal sm:whitespace-nowrap text-xs">{experience.period}</span>
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-200/20 to-blue-100/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              {/* Project Type Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1 text-apple-gray-500">
                  <Calendar size={12} className="sm:w-[13px] sm:h-[13px] flex-shrink-0" />
                  <span className="text-xs">{projectTypeText}</span>
                </div>
                {experience.id === 1 && awardText && (
                  <div className="flex items-center space-x-1 text-blue-500">
                    <Award size={12} className="sm:w-[13px] sm:h-[13px] flex-shrink-0" />
                    <span className="text-xs font-medium">{awardText}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="relative z-10">
              <p className="text-apple-gray-600 leading-relaxed text-xs sm:text-sm">
                {experience.description}
              </p>
            </div>

            {/* Technologies Section */}
            <TechnologyBadges
              technologies={experience.technologies}
              title={technologiesText}
            />

            {/* Achievements Section */}
            <AchievementsList
              achievements={experience.achievements}
              title={keyAchievementsText}
            />

            {/* Project Links */}
            <ProjectLink
              projectName={projectNameText}
              linkText={viewProjectText}
            />
          </div>
        </motion.div>
      </div>

      {/* Project Images - Shows on mobile too, below the card */}
      <div className={`w-full md:w-1/2 mt-4 md:mt-0 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
        >
          {/* Carousel/Gallery using ImageGallery - height synced to left card on desktop */}
          <div
            style={{
              height: isDesktop ? (cardHeights[index] || 600) : 'auto',
              minHeight: isDesktop ? (cardHeights[index] || 600) : 'auto'
            }}
            className="flex flex-col md:pb-4"
          >
            <ImageGallery
              images={experience.images as unknown as string[]}
              title={imageTitle}
              layout={imageLayout}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

