import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { DOT_PULSING_ANIMATION } from './animations';

interface TimelineDotProps {
  index: number;
  isAwardWinner?: boolean;
}

export const TimelineDot = ({ index, isAwardWinner }: TimelineDotProps) => {
  return (
    <motion.div
      className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 z-10"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.3 }}
    >
      {/* Outer ring with pulsing effect */}
      <motion.div
        className="absolute inset-0 w-6 h-6 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full border-4 border-white shadow-2xl"
        {...DOT_PULSING_ANIMATION}
      />
      
      {/* Inner core */}
      <div className="absolute inset-1 bg-white rounded-full shadow-inner" />
      
      {/* Award indicator for first experience */}
      {isAwardWinner && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-300 to-sky-400 rounded-full flex items-center justify-center shadow-lg"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Star size={10} className="text-white fill-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

