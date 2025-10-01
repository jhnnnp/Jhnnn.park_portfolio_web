import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PULSING_ANIMATION } from './animations';

interface TechnologyBadgesProps {
  technologies: readonly string[] | string[];
  title: string;
}

export const TechnologyBadges = ({ technologies, title }: TechnologyBadgesProps) => {
  return (
    <div className="space-y-4 relative z-10 pt-4">
      <motion.h4
        className="text-base font-bold text-apple-black flex items-center gap-3"
        whileHover={{ x: 5 }}
      >
        <motion.div
          className="w-3 h-3 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full shadow-sm"
          {...PULSING_ANIMATION}
        />
        <span className="flex items-center gap-2">
          <Sparkles size={16} className="text-blue-400" />
          {title}
        </span>
      </motion.h4>

      <div className="flex flex-wrap gap-2.5">
        {technologies.map((tech, techIndex) => (
          <motion.div
            key={tech}
            className="relative group/tech"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: techIndex * 0.08 }}
            whileHover={{ y: -3 }}
          >
            <div className="px-4 py-2.5 bg-gradient-to-r from-sky-200/20 via-blue-100/40 to-cyan-100/20 text-blue-600 text-sm font-medium rounded-lg border border-sky-300/25 backdrop-blur-sm transition-all duration-300 group-hover/tech:from-sky-200/30 group-hover/tech:to-blue-100/60 group-hover/tech:border-blue-300/40 group-hover/tech:shadow-lg">
              {tech}
            </div>
            {/* Hover glow effect */}
            <div className="absolute inset-0 px-4 py-2.5 bg-gradient-to-r from-sky-200/10 to-blue-100/20 rounded-lg blur-sm opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

