import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { GRADIENT_BUTTON } from './styles';

interface ProjectLinkProps {
  projectName: string;
  linkText: string;
}

export const ProjectLink = ({ projectName, linkText }: ProjectLinkProps) => {
  return (
    <div className="pt-6 border-t border-gradient-to-r from-apple-gray-100/50 to-transparent relative z-10">
      <div className="flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ x: 3 }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-sky-300 to-blue-400 rounded-full" />
          <span className="text-sm text-apple-gray-600 font-medium">
            {projectName}
          </span>
        </motion.div>
        
        <motion.a
          href="#projects"
          className="group/link relative px-4 py-2 text-sm text-blue-500 hover:text-white transition-all duration-300 font-semibold flex items-center gap-2 rounded-full overflow-hidden"
          style={GRADIENT_BUTTON}
          whileHover={{
            scale: 1.05,
            x: 5,
            background: 'linear-gradient(135deg, #7DD3FC 0%, #60A5FA 100%)',
            boxShadow: '0 8px 25px rgba(125, 211, 252, 0.4)'
          }}
        >
          <span className="relative z-10">{linkText}</span>
          <motion.div
            className="w-4 h-4 relative z-10"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight size={16} />
          </motion.div>
          {/* Hover background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-300 to-blue-400 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
        </motion.a>
      </div>
    </div>
  );
};

