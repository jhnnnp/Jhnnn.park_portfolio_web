import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'

// GSAP 플러그인 등록
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export const useScrollAnimation = (options?: {
    trigger?: string
    start?: string
    end?: string
    scrub?: boolean
    markers?: boolean
}) => {
    const elementRef = useRef<HTMLElement>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: options?.start || 'top 80%',
                end: options?.end || 'bottom 20%',
                scrub: options?.scrub || false,
                markers: options?.markers || false,
                onEnter: () => setIsInView(true),
                onLeave: () => setIsInView(false),
                onEnterBack: () => setIsInView(true),
                onLeaveBack: () => setIsInView(false),
            },
        })

        return () => {
            tl.kill()
        }
    }, [options])

    return { elementRef, isInView }
}

export const useFadeInAnimation = (delay: number = 0) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '-50px 0px',
    })

    const elementRef = useRef<HTMLElement | null>(null)

    const setRefs = useCallback((node: HTMLElement | null) => {
        elementRef.current = node
            // react-intersection-observer의 ref 콜백에도 전달
            ; (ref as unknown as (node?: Element | null) => void)(node)
    }, [ref])

    useEffect(() => {
        if (!inView || !elementRef.current) return
        const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) {
            gsap.set(elementRef.current, { opacity: 1, y: 0 })
            return
        }
        gsap.fromTo(
            elementRef.current,
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay,
                ease: 'power2.out',
            }
        )
    }, [inView, delay])

    return setRefs
}

export const useStaggerAnimation = (delay: number = 0.1) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
                        const children = entry.target.children
                        if (reduce) {
                            gsap.set(children, { opacity: 1, y: 0 })
                        } else {
                            gsap.fromTo(
                                children,
                                {
                                    opacity: 0,
                                    y: 30,
                                },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    stagger: delay,
                                    ease: 'power2.out',
                                }
                            )
                        }
                        observer.unobserve(entry.target)
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '-50px 0px'
            }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [delay])

    return ref
}

export const useParallaxAnimation = (speed: number = 0.5) => {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return
        const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        })

        tl.to(element, {
            y: (i, target: any) => { void i; return -target.offsetHeight * speed },
            ease: 'none',
        })

        return () => {
            tl.kill()
        }
    }, [speed])

    return elementRef
}

export const useCounterAnimation = (endValue: number, duration: number = 2) => {
    const [count, setCount] = useState(0)
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    })

    useEffect(() => {
        if (inView) {
            gsap.to({}, {
                duration,
                onUpdate: function () {
                    const progress = this.progress()
                    setCount(Math.floor(endValue * progress))
                },
                ease: 'power2.out',
            })
        }
    }, [inView, endValue, duration])

    return { ref, count }
}

export const useScrollProgress = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.pageYOffset
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollProgress = (scrollTop / docHeight) * 100
            setProgress(scrollProgress)
        }

        window.addEventListener('scroll', updateProgress)
        updateProgress()

        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return progress
}

export const useSmoothScroll = () => {
    useEffect(() => {
        // Lenis가 로드되었는지 확인
        if (typeof window !== 'undefined' && (window as any).Lenis) {
            const lenis = new (window as any).Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            })

            // GSAP ScrollTrigger와 Lenis 연결
            lenis.on('scroll', ScrollTrigger.update)

            function raf(time: number) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }

            requestAnimationFrame(raf)

            return () => {
                lenis.destroy()
            }
        }
    }, [])
} 