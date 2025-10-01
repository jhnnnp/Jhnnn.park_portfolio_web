import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PULSING_ANIMATION } from './animations';

interface TechnologyBadgesProps {
  technologies: readonly string[] | string[];
  title: string;
}

export const TechnologyBadges = ({ technologies, title }: TechnologyBadgesProps) => {
  return (
    <div className="space-y-3 sm:space-y-4 relative z-10 pt-3 sm:pt-4">
      <motion.h4
        className="text-sm sm:text-base font-bold text-apple-black flex items-center gap-2 sm:gap-3"
        whileHover={{ x: 5 }}
      >
        <motion.div
          className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full shadow-sm flex-shrink-0"
          {...PULSING_ANIMATION}
        />
        <span className="flex items-center gap-1.5 sm:gap-2">
          <Sparkles size={14} className="sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
          <span className="truncate">{title}</span>
        </span>
      </motion.h4>

      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {technologies.map((tech, techIndex) => (
          <motion.div
            key={tech}
            className="relative group/tech"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: techIndex * 0.08 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="px-3 sm:px-4 py-1.5 sm:py-2.5 bg-gradient-to-r from-sky-200/20 via-blue-100/40 to-cyan-100/20 text-blue-600 text-xs sm:text-sm font-medium rounded-lg border border-sky-300/25 backdrop-blur-sm transition-all duration-300 group-hover/tech:from-sky-200/30 group-hover/tech:to-blue-100/60 group-hover/tech:border-blue-300/40 group-hover/tech:shadow-lg">
              {tech}
            </div>
            {/* Hover glow effect */}
            <div className="absolute inset-0 px-3 sm:px-4 py-1.5 sm:py-2.5 bg-gradient-to-r from-sky-200/10 to-blue-100/20 rounded-lg blur-sm opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

