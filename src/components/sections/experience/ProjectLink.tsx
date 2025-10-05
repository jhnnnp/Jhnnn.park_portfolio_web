import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { GRADIENT_BUTTON } from './styles';

interface ProjectLinkProps {
  projectName: string;
  linkText: string;
  onViewProject: () => void;
}

export const ProjectLink = ({ projectName, linkText, onViewProject }: ProjectLinkProps) => {
  return (
    <div className="pt-4 sm:pt-6 border-t border-gradient-to-r from-apple-gray-100/50 to-transparent relative z-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ x: 3 }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-sky-300 to-blue-400 rounded-full flex-shrink-0" />
          <span className="text-xs sm:text-sm text-apple-gray-600 font-medium truncate">
            {projectName}
          </span>
        </motion.div>

        <motion.button
          onClick={onViewProject}
          className="group/link relative px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-blue-500 hover:text-white transition-all duration-300 font-semibold flex items-center gap-1.5 sm:gap-2 rounded-full overflow-hidden touch-manipulation w-full sm:w-auto justify-center sm:justify-start"
          style={GRADIENT_BUTTON}
          whileHover={{
            scale: 1.05,
            x: 5,
            background: 'linear-gradient(135deg, #7DD3FC 0%, #60A5FA 100%)',
            boxShadow: '0 8px 25px rgba(125, 211, 252, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">{linkText}</span>
          <motion.div
            className="w-3 h-3 sm:w-4 sm:h-4 relative z-10 flex-shrink-0"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight size={14} className="sm:w-4 sm:h-4" />
          </motion.div>
          {/* Hover background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-300 to-blue-400 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>
    </div>
  );
};

