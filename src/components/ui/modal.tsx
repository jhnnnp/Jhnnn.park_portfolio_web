import React, { useEffect, useRef, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlayClick?: boolean;
    ariaLabel?: string;
    ariaDescribedBy?: string;
}

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw]',
};

// 접근성 및 포커스 관리 커스텀 훅
const useModalAccessibility = (
    isOpen: boolean,
    onClose: () => void,
    options?: { closeOnOverlayClick: boolean }
) => {
    const modalContentRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedRef = useRef<Element | null>(null);
    const { closeOnOverlayClick = true } = options || {};

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            previouslyFocusedRef.current = document.activeElement;
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';

            // 스크롤바 너비만큼 padding 추가
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }

            // 100ms 후에 모달 내부로 포커스 이동
            setTimeout(() => modalContentRef.current?.focus(), 100);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';

            if (previouslyFocusedRef.current instanceof HTMLElement) {
                previouslyFocusedRef.current.focus();
            }
        };
    }, [isOpen, onClose]);

    // 포커스 트랩: 모달 내부에서 탭 키 이동 무한루프 유지
    useEffect(() => {
        if (!isOpen) return;

        const root = modalContentRef.current;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !root) return;

            const focusableElements = root.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements.length === 0) return;

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
    }, [isOpen]);

    // 오버레이 클릭 시 모달 닫기 (옵션)
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!closeOnOverlayClick) return;
        if (e.target === e.currentTarget) onClose();
    };

    return { modalContentRef, handleOverlayClick };
};

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    size = 'lg',
    closeOnOverlayClick = true,
    ariaLabel,
    ariaDescribedBy,
}) => {
    const reduceMotion = useReducedMotion();
    const modalTitleId = useId();
    const { modalContentRef, handleOverlayClick } = useModalAccessibility(isOpen, onClose, { closeOnOverlayClick });
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Open 시 스크롤을 항상 상단으로 이동 (모바일에서 이전 위치 유지되는 현상 방지)
    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                scrollAreaRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            });
        }
    }, [isOpen]);

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = reduceMotion
        ? {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 },
        }
        : {
            hidden: { opacity: 0, scale: 0.95, y: 20 },
            visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
            },
            exit: { opacity: 0, scale: 0.95, y: 10 },
        };

    const content = (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex sm:items-center items-start sm:justify-center justify-center sm:p-4 pt-12 pb-2 px-3 overscroll-none"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? modalTitleId : undefined}
                    aria-label={ariaLabel ?? (title ? undefined : 'Modal Window')}
                    aria-describedby={ariaDescribedBy}
                    onClick={handleOverlayClick}
                >
                    {/* 배경 오버레이 */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    />

                    {/* 모달 컨텐츠 */}
                    <motion.div
                        className={`relative w-full sm:${sizeClasses[size]} bg-white/95 backdrop-blur-sm sm:rounded-3xl rounded-3xl shadow-2xl border border-gray-200 ring-1 ring-black/5 flex flex-col sm:max-h-[90vh] max-h-[92svh] outline-none overflow-hidden`}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        tabIndex={-1}
                        ref={modalContentRef}
                        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                    >
                        {/* 헤더 */}
                        {title && (
                            <div
                                className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200/70 bg-gradient-to-b from-white/90 to-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm relative"
                                style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.25rem)' }}
                            >
                                {/* iOS-style grabber */}
                                <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-12 h-1.5 rounded-full bg-gray-300/70" />
                                <div className="min-w-0 flex-1 pr-4 flex flex-col justify-center pt-4">
                                    <h2 id={modalTitleId} className="text-lg sm:text-xl font-bold text-gray-900 leading-tight break-words">
                                        {title}
                                    </h2>
                                    {/* accent underline */}
                                    <div className="mt-1 w-16 h-0.5 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 rounded-full" />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 sm:p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 touch-manipulation"
                                    aria-label="Close modal"
                                >
                                    <X size={18} className="sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        )}

                        {/* 항상 보이는 플로팅 닫기 버튼 */}
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 touch-manipulation z-20"
                            aria-label="Close modal"
                            style={{ top: 'calc(env(safe-area-inset-top) + 0.25rem)' }}
                        >
                            <X size={18} className="sm:w-5 sm:h-5" />
                        </button>

                        {/* 컨텐츠 영역 */}
                        <div
                            ref={scrollAreaRef}
                            className="flex-1 overflow-y-auto"
                            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            {children}
                        </div>
                        {/* 하단 스크롤 힌트 그라데이션 */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/95 to-transparent" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(content, document.body);
};
