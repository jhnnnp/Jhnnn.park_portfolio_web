import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
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

  useEffect(() => {
    if (contentRef.current) {
      const computedStyle = window.getComputedStyle(contentRef.current);
      const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
      const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
      const height = contentRef.current.offsetHeight + paddingTop + paddingBottom;
      onHeightMeasured(index, height);
    }
  }, [index, onHeightMeasured]);

  return (
    <motion.div
      className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Content Card */}
      <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
        <motion.div
          className="relative p-8 space-y-6 overflow-hidden group cursor-pointer"
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
            <div className="space-y-3 relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <motion.h3
                    className="text-xl font-bold text-apple-black mb-2 group-hover:text-blue-500 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {experience.position}
                  </motion.h3>
                  <div className="flex items-center space-x-2 text-apple-gray-600">
                    <motion.div
                      className="p-1.5 bg-gradient-to-br from-sky-200/30 to-blue-100/50 rounded-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <MapPin size={14} className="text-blue-400" />
                    </motion.div>
                    <span className="font-semibold text-base">{experience.company}</span>
                  </div>
                </div>
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="px-4 py-2 bg-gradient-to-r from-sky-200/30 via-blue-100/50 to-cyan-100/30 text-blue-600 text-xs rounded-full font-semibold border border-sky-300/30 backdrop-blur-sm whitespace-nowrap">
                    {experience.period}
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-200/20 to-blue-100/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              {/* Project Type Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1 text-apple-gray-500">
                  <Calendar size={13} />
                  <span className="text-xs">{projectTypeText}</span>
                </div>
                {experience.id === 1 && awardText && (
                  <div className="flex items-center space-x-1 text-blue-500">
                    <Award size={13} />
                    <span className="text-xs font-medium">{awardText}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="relative z-10">
              <p className="text-apple-gray-600 leading-relaxed text-sm">
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

      {/* Project Images - Alternating Side */}
      <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
        >
          {/* Carousel/Gallery using ImageGallery - height synced to left card */}
          <div
            style={{
              height: cardHeights[index] || 600,
              minHeight: cardHeights[index] || 600
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

