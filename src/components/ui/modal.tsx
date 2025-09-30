import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-7xl'
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        rotateX: -15
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        rotateX: -15,
        transition: {
            duration: 0.3
        }
    }
};

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    size = 'lg'
}) => {
    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 perspective-1000">
                    {/* 배경 오버레이 */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* 모달 컨텐츠 */}
                    <motion.div
                        className={`relative w-full ${sizeClasses[size]} max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform-gpu`}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {/* 글래스모피즘 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

                        {/* 헤더 */}
                        {title && (
                            <div className="relative flex items-center justify-between p-8 border-b border-gray-200/30 bg-white/50 backdrop-blur-sm">
                                <div className="flex items-center space-x-4">
                                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full shadow-sm" />
                                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
                                </div>
                                <motion.button
                                    onClick={onClose}
                                    className="p-3 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-gray-200/50"
                                    aria-label="Close modal"
                                    whileHover={{ scale: 1.05, rotate: 90 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>
                        )}

                        {/* 컨텐츠 */}
                        <div className="relative overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            <div className="p-8">
                                {children}
                            </div>
                        </div>

                        {/* 하단 그라데이션 페이드 */}
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
