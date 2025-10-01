import { motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';
import { GLASSMORPHISM_ACHIEVEMENT } from './styles';
import { ACHIEVEMENT_HOVER_ANIMATION } from './animations';

interface AchievementsListProps {
  achievements: readonly string[] | string[];
  title: string;
}

export const AchievementsList = ({ achievements, title }: AchievementsListProps) => {
  return (
    <div className="space-y-3 sm:space-y-4 relative z-10 pt-4 sm:pt-6">
      <motion.h4
        className="text-base sm:text-lg font-bold text-apple-black flex items-center gap-2 sm:gap-3"
        whileHover={{ x: 5 }}
      >
        <motion.div
          className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-gradient-to-br from-sky-300 via-blue-300 to-cyan-300 rounded-full shadow-sm flex items-center justify-center flex-shrink-0"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full" />
        </motion.div>
        <span className="flex items-center gap-1.5 sm:gap-2">
          <Award size={16} className="sm:w-[18px] sm:h-[18px] text-blue-400 flex-shrink-0" />
          <span className="truncate">{title}</span>
        </span>
      </motion.h4>

      <div className="grid gap-2.5 sm:gap-3">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={idx}
            className="group/achievement relative px-4 sm:px-5 py-3 sm:py-4 overflow-hidden cursor-pointer"
            style={GLASSMORPHISM_ACHIEVEMENT}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            {...ACHIEVEMENT_HOVER_ANIMATION}
          >
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-200/15 via-blue-100/25 to-cyan-100/10 rounded-2xl opacity-0 group-hover/achievement:opacity-100 transition-all duration-500" />

            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover/achievement:opacity-100 transition-opacity duration-500"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-300/20 via-blue-200/30 to-cyan-200/20 p-[1px]">
                <div className="w-full h-full bg-white/90 rounded-2xl backdrop-blur-sm" />
              </div>
            </motion.div>

            {/* Enhanced Content */}
            <div className="flex items-start space-x-2 sm:space-x-3 relative z-10">
              <motion.div
                className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gradient-to-br from-sky-300 via-blue-300 to-cyan-300 rounded-full mt-1 sm:mt-1.5 flex-shrink-0 shadow-sm flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.3,
                  rotate: 180,
                  boxShadow: "0 0 15px rgba(125, 211, 252, 0.7)",
                  filter: "brightness(1.3)"
                }}
              >
                <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white rounded-full" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.p
                  className="text-apple-gray-700 leading-relaxed font-medium text-xs sm:text-sm transition-all duration-300 group-hover/achievement:text-blue-500"
                  whileHover={{
                    x: 5,
                    fontWeight: 600
                  }}
                >
                  {achievement}
                </motion.p>
              </div>

              <motion.div
                className="hidden sm:block opacity-0 group-hover/achievement:opacity-100 transition-opacity duration-300 flex-shrink-0"
                whileHover={{ x: 3 }}
              >
                <ChevronRight size={14} className="text-blue-400" />
              </motion.div>
            </div>

            {/* Enhanced ripple effect on click */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-sky-200/15 via-blue-100/20 to-cyan-100/15 rounded-2xl"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{
                scale: 1,
                opacity: [0, 0.4, 0],
                transition: { duration: 0.5 }
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

