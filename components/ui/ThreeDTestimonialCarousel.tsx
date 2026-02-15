"use client";
import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import Image from "next/image" // Assuming you use Next/Image for logos
import {
    AnimatePresence,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from "framer-motion"
import { useCallback } from "react"; 


export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
    defaultValue?: boolean
    initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
    query: string,
    {
        defaultValue = false,
        initializeWithValue = true,
    }: UseMediaQueryOptions = {}
): boolean {
    const getMatches = (query: string): boolean => {
        if (IS_SERVER) {
            return defaultValue
        }
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState<boolean>(() => {
        if (initializeWithValue) {
            return getMatches(query)
        }
        return defaultValue
    })

    const handleChange = () => {
        setMatches(getMatches(query))
    }

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query)
        handleChange()

        matchMedia.addEventListener("change", handleChange)

        return () => {
            matchMedia.removeEventListener("change", handleChange)
        }
    }, [query])

    return matches
}

interface TestimonialData {
    quote: string;
    name: string;
    role: string;
    // ✨ Updated to use local image paths for hospitals
    companyLogoPath: string; 
    companyName: string;
}

const testimonials: TestimonialData[] = [
    {
        quote: "Neurogati has revolutionized Parkinson's diagnostics to under 10 mins! This rapid, objective tool is invaluable for our clinical practice.",
        name: "Dr. Lakshmi Narasimhan",
        role: "Head of Neurology, SRMC",
        companyLogoPath: "/images/srmc-logo.png", 
        companyName: "SRMC Hospital",
    },
    {
        quote: "With Neurogati's cRGS platform, stroke rehabilitation is engaging and fun. Our patients show better adherence and improved motor outcomes.",
        name: "Dr. Rithvik",
        role: "Neurologist, SRMC",
        companyLogoPath: "/images/srmc-logo.png",
        companyName: "SRMC Hospital",
    },
    {
        quote: "The AI-driven insights from Neurogati have transformed how we approach disease management. It's a much needed game-changer for our protocol at Apollo.",
        name: "Dr. Vijayashankar Paramanandam",
        role: "Neurologist, Apollo Hospitals",
        companyLogoPath: "/images/apollo.png", 
        companyName: "Apollo Hospitals",
    },
];

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialData }) => (
    <div className="flex flex-col h-full justify-between items-center text-center p-6 bg-card dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700" style={{ backfaceVisibility: 'hidden' }}>
        
        <p className="text-base text-gray-200 italic mt-3 mb-6 leading-relaxed"> 
            "{testimonial.quote}"
        </p>

        <div className="mt-auto pt-3 w-full border-t border-zinc-100 dark:border-zinc-700">
            <Image
                width={100} 
                height={40} 
                src={testimonial.companyLogoPath}
                alt={`${testimonial.companyName} Logo`}
                className="mx-auto h-[30px] w-auto object-contain mb-3" 
            />
            <h4 className="text-md font-bold text-foreground"> 
                {testimonial.name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
                {testimonial.role}
            </span>
        </div>
    </div>
);


const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] } 

const Carousel = memo(
    ({
        controls,
        isCarouselActive,
        onRotationInit, 
    }: {
        controls: any
        isCarouselActive: boolean
        onRotationInit: (rotation: any) => void 
    }) => {
        const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
        const cylinderWidth = isScreenSizeSm ? 800 : 1200 
        const faceCount = testimonials.length
        const faceWidth = cylinderWidth / faceCount
        const radius = cylinderWidth / (2 * Math.PI)
        const rotation = useMotionValue(0)
        
        const onRotationInitCallback = useCallback((rotation: any) => {
            onRotationInit(rotation);
        }, [onRotationInit]);

        useEffect(() => {
            onRotationInitCallback(rotation);
        }, [onRotationInitCallback, rotation]); 

        const transform = useTransform(
            rotation,
            (value) => `rotate3d(0, 1, 0, ${value}deg)`
        )

        const onDragEnd = useCallback((_, info: any) => {
            if (isCarouselActive) {
                controls.start({
                    rotateY: rotation.get() + info.velocity.x * 0.03,
                    transition: {
                        type: "spring",
                        stiffness: 80, 
                        damping: 25,
                        mass: 0.1,
                    },
                });
            }
        }, [isCarouselActive, controls, rotation]);

        return (
            <div
                className="flex h-full items-center justify-center"
                style={{
                    perspective: "1800px", 
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                <motion.div
                    drag={isCarouselActive ? "x" : false}
                    className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
                    style={{
                        transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    onDrag={(_, info) =>
                        isCarouselActive &&
                        rotation.set(rotation.get() + info.offset.x * 0.05)
                    }
                    onDragEnd={onDragEnd}
                    animate={controls}
                >
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={`testimonial-${i}`}
                            className="absolute flex h-full origin-center items-center justify-center p-2 flex-col"   // -stretch justify-center p-2"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${
                                    i * (360 / faceCount)
                                }deg) translateZ(${radius}px)`,
                                maxWidth: isScreenSizeSm ? '280px' : '350px', 
                                minWidth: isScreenSizeSm ? '280px' : '350px',
                            }}
                        >
                            <motion.div
                                className="w-full h-[80%]"
                                layout="position"
                                initial={{ opacity: 0.5, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={transition}
                                whileHover={{ scale: 1.05 }} 
                            >
                                <TestimonialCard testimonial={testimonial} />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        )
    }
)


export function ThreeDTestimonialCarousel() {
    const [isCarouselActive, setIsCarouselActive] = useState(true)
    const controls = useAnimation()

    const rotationMotionValue = useRef<any>(null); 
    const handleRotationInit = useCallback((rotation: any) => {
        rotationMotionValue.current = rotation;
    }, []);

    useEffect(() => {
        if (isCarouselActive) {
            const spin = () => {
                if (!rotationMotionValue.current) return; 
                const currentRotation = rotationMotionValue.current.get(); 

                controls.start({
                    rotateY: currentRotation + 360, 
                    transition: {
                        duration: 60, 
                        ease: "linear",
                        repeat: Infinity,
                    }
                });
            };
            spin();
        } else {
            controls.stop();
        }
    }, [isCarouselActive, controls]);

    return (
    <motion.div layout className="relative">
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          controls={controls}
          isCarouselActive={isCarouselActive}
          onRotationInit={handleRotationInit} 
        />
      </div>
    </motion.div>
  )
}