import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2, ImageOff } from 'lucide-react';

interface ImageGalleryProps {
    images: readonly string[];
    title?: string;
    layout?: 'vertical' | 'horizontal';
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title, layout = 'vertical' }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
    const horizontalThumbnailRef = useRef<HTMLDivElement>(null);
    const verticalThumbnailRef = useRef<HTMLDivElement>(null);
    const mobileThumbnailRef = useRef<HTMLDivElement>(null);

    const resetLoading = () => {
        setIsLoading(true);
        setHasError(false);
    };

    const nextImage = useCallback(() => {
        setSelectedIndex((prev) => (prev + 1) % images.length);
        resetLoading();
    }, [images.length]);

    const prevImage = useCallback(() => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
        resetLoading();
    }, [images.length]);

    // Preload adjacent images
    useEffect(() => {
        const preload = (src: string) => {
            const img = new Image();
            img.src = src;
        };
        if (images.length > 1) {
            preload(images[(selectedIndex + 1) % images.length]);
            preload(images[(selectedIndex - 1 + images.length) % images.length]);
        }
    }, [selectedIndex, images]);

    // Auto-scroll thumbnail into view for all layouts
    useEffect(() => {
        const scrollThumbnailIntoView = (containerRef: React.RefObject<HTMLDivElement | null>) => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            const thumbnail = container.children[selectedIndex] as HTMLElement;
            if (thumbnail) {
                // More precise scrollIntoView with smooth behavior
                const containerRect = container.getBoundingClientRect();
                const thumbnailRect = thumbnail.getBoundingClientRect();

                // Check if thumbnail is fully visible
                const isVisible =
                    thumbnailRect.left >= containerRect.left &&
                    thumbnailRect.right <= containerRect.right &&
                    thumbnailRect.top >= containerRect.top &&
                    thumbnailRect.bottom <= containerRect.bottom;

                if (!isVisible) {
                    thumbnail.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }
        };

        // Apply to all thumbnail containers
        scrollThumbnailIntoView(horizontalThumbnailRef);
        scrollThumbnailIntoView(verticalThumbnailRef);
        scrollThumbnailIntoView(mobileThumbnailRef);
    }, [selectedIndex]);

    const currentSrc = useMemo(() => images[selectedIndex], [images, selectedIndex]);

    // iOS safari visibility fix: reset loading when src changes, pre-measure image
    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
        const img = new Image();
        img.src = currentSrc;
        img.onload = () => {
            setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
            setIsLoading(false);
        };
        img.onerror = () => {
            setHasError(true);
            setIsLoading(false);
        };
        // cleanup not needed for Image object
    }, [currentSrc]);

    // Swipe handler for mobile
    const handleSwipe = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 80) {
            if (info.offset.x > 0) {
                prevImage();
            } else {
                nextImage();
            }
        }
    }, [nextImage, prevImage]);

    if (images.length === 0) return null;

    return (
        <div className="space-y-3">
            {title && (
                <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{title}</h3>
                    <span className="text-sm text-gray-500 tabular-nums">
                        {selectedIndex + 1} / {images.length}
                    </span>
                </div>
            )}

            {/* Desktop: 레이아웃 분기 */}
            {layout === 'horizontal' ? (
                // 웹 프로젝트: 메인 위 + 썸네일 아래
                <div className="hidden md:block space-y-4 md:pb-6">
                    <div className="relative bg-white rounded-xl overflow-hidden border border-gray-100">
                        <div className="w-full h-[55svh] md:h-[55vh] flex items-center justify-center">
                            {!hasError ? (
                                <motion.img
                                    key={selectedIndex}
                                    src={currentSrc}
                                    alt={`${title || 'Project'} screenshot ${selectedIndex + 1}`}
                                    className="max-w-full max-h-full object-contain select-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    onLoad={() => setIsLoading(false)}
                                    onError={() => { setHasError(true); setIsLoading(false); }}
                                    draggable={false}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <ImageOff className="mb-2" size={32} />
                                    <span className="text-sm">Failed to load</span>
                                </div>
                            )}

                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                                    <Loader2 className="animate-spin text-blue-500" size={28} />
                                </div>
                            )}
                        </div>

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-all backdrop-blur-sm"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-all backdrop-blur-sm"
                                    aria-label="Next"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* 하단 가로 썸네일 (웹용) */}
                    {images.length > 1 && (
                        <div
                            ref={horizontalThumbnailRef}
                            className="flex gap-3 overflow-x-auto pt-2 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scroll-smooth"
                        >
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        setSelectedIndex(index);
                                        resetLoading();
                                        (e.currentTarget as HTMLButtonElement).blur();
                                    }}
                                    className={`flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden border-2 transition-colors snap-center focus:outline-none ${index === selectedIndex
                                        ? 'border-blue-500 shadow-md'
                                        : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-contain bg-white"
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                // 모바일 앱: 좌측 메인 + 우측 세로 썸네일
                <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_200px] md:gap-3">
                    <div className="relative group bg-white rounded-xl overflow-hidden border border-gray-100">
                        <div className="w-full h-[70svh] md:h-[70vh] flex items-center justify-center">
                            {!hasError ? (
                                <motion.img
                                    key={selectedIndex}
                                    src={currentSrc}
                                    alt={`${title || 'Project'} screenshot ${selectedIndex + 1}`}
                                    className="max-w-full max-h-full object-contain select-none"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    onLoad={() => setIsLoading(false)}
                                    onError={() => { setHasError(true); setIsLoading(false); }}
                                    draggable={false}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <ImageOff className="mb-2" size={32} />
                                    <span className="text-sm">Failed to load</span>
                                </div>
                            )}

                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                                    <Loader2 className="animate-spin text-blue-500" size={28} />
                                </div>
                            )}
                        </div>

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                                    aria-label="Next"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* 우측 세로 썸네일 (앱용) */}
                    {images.length > 1 && (
                        <div
                            ref={verticalThumbnailRef}
                            className="h-[70vh] bg-white rounded-xl p-2 overflow-y-auto space-y-2 border border-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scroll-smooth"
                        >
                            {images.map((image, index) => (
                                <motion.button
                                    key={index}
                                    onClick={(e) => {
                                        setSelectedIndex(index);
                                        resetLoading();
                                        (e.currentTarget as HTMLButtonElement).blur();
                                    }}
                                    className={`relative w-full h-28 rounded-lg overflow-hidden border-2 transition-all focus:outline-none ${index === selectedIndex
                                        ? 'border-blue-500 ring-2 ring-blue-200 shadow-md'
                                        : 'border-transparent hover:border-gray-300'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-contain bg-white"
                                        loading="lazy"
                                    />
                                    {index === selectedIndex && (
                                        <div className="absolute inset-0 bg-blue-500/10" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Mobile: 상단 메인 + 하단 가로 썸네일 */}
            <div className="md:hidden space-y-3">
                <motion.div
                    className="relative bg-gray-50 rounded-xl overflow-hidden"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleSwipe}
                >
                    <div className="w-full h-[56svh] sm:h-[50vh] flex items-center justify-center">
                        {!hasError ? (
                            <motion.img
                                key={selectedIndex}
                                src={currentSrc}
                                alt={`${title || 'Project'} screenshot ${selectedIndex + 1}`}
                                className="max-w-full max-h-full object-contain select-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                onLoad={() => setIsLoading(false)}
                                onError={() => { setHasError(true); setIsLoading(false); }}
                                draggable={false}
                            />
                        ) : (
                            <div className="flex flex-col items-center text-gray-400">
                                <ImageOff className="mb-2" />
                                <span className="text-sm">Failed to load</span>
                            </div>
                        )}

                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                                <Loader2 className="animate-spin text-blue-500" />
                            </div>
                        )}

                        {/* Mobile navigation arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-all backdrop-blur-sm touch-manipulation"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-all backdrop-blur-sm touch-manipulation"
                                    aria-label="Next"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>

                {/* 가로 썸네일 */}
                {images.length > 1 && (
                    <div
                        ref={mobileThumbnailRef}
                        className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scroll-smooth"
                    >
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    setSelectedIndex(index);
                                    resetLoading();
                                    (e.currentTarget as HTMLButtonElement).blur();
                                }}
                                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all snap-center focus:outline-none ${index === selectedIndex
                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <img src={image} alt={`Thumb ${index + 1}`} className="w-full h-full object-contain bg-white" loading="lazy" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
