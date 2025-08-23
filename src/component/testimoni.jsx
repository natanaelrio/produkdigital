'use client'
import styles from '@/component/testimoni.module.css'
import { useState, useEffect } from 'react'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Testimoni() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const testimonials = [
        {
            name: "Andi Pratama",
            role: "Digital Entrepreneur",
            content: "Buku digital ini benar-benar mengubah cara saya memandang bisnis online. Materinya lengkap dan mudah dipahami.",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=11"
        },
        {
            name: "Sarah Wijaya",
            role: "Content Creator",
            content: "Sangat membantu dalam mengembangkan skill digital marketing saya. Investasi yang worth it!",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=5"
        },
        {
            name: "Michael Chen",
            role: "Digital Marketer",
            content: "Penjelasan yang detail dan sistematis membuat saya lebih mudah memahami konsep-konsep penting.",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=8"
        },
        {
            name: "Linda Kusuma",
            role: "Online Business Owner",
            content: "Materi yang disajikan sangat aplikatif dan sesuai dengan kebutuhan bisnis digital saat ini.",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=9"
        },
        {
            name: "Budi Santoso",
            role: "Tech Entrepreneur",
            content: "Panduan yang lengkap untuk memulai perjalanan di dunia digital. Sangat recommended!",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=12"
        }
    ]

    useEffect(() => {
        setIsVisible(true)
        
        // Start auto-sliding
        const startAutoSlide = () => {
            return setInterval(() => {
                if (!isPaused) {
                    nextSlide()
                }
            }, 5000)
        }

        const slideInterval = startAutoSlide()

        const handleResize = () => {
            const maxSlide = getMaxSlide()
            if (currentIndex > maxSlide) {
                setCurrentIndex(0)
            }
        }

        // Reset interval when sliding manually
        const resetInterval = () => {
            clearInterval(slideInterval)
            return startAutoSlide()
        }

        window.addEventListener('resize', handleResize)
        
        return () => {
            clearInterval(slideInterval)
            window.removeEventListener('resize', handleResize)
        }
    }, [isPaused, currentIndex])

    const getMaxSlide = () => {
        if (typeof window !== 'undefined') {
            return window.innerWidth <= 768 ? testimonials.length - 1 : testimonials.length - 3;
        }
        return testimonials.length - 3;
    }

    const nextSlide = () => {
        setCurrentIndex(current =>
            current >= getMaxSlide() ? 0 : current + 1
        )
    }

    const prevSlide = () => {
        setCurrentIndex(current =>
            current === 0 ? getMaxSlide() : current - 1
        )
    }

    // Reset position if needed
    useEffect(() => {
        const maxSlide = getMaxSlide()
        if (currentIndex > maxSlide) {
            setCurrentIndex(0)
        }
    }, [currentIndex])

    return (
        <div className={styles.container}>
            <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
                <h2 className={styles.title}>Apa Kata Mereka?</h2>
                <div className={styles.subtitle}>Testimoni dari para pembaca kami</div>

                <div
                    className={styles.testimonialContainer}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        className={styles.testimonialWrapper}
                        style={{ 
                            transform: `translateX(-${currentIndex * (typeof window !== 'undefined' && window.innerWidth <= 768 ? 100 : 100/3)}%)`
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className={styles.testimonialCard}>
                                <div className={styles.quoteIcon}>
                                    <FaQuoteLeft />
                                </div>

                                <div className={styles.testimonialContent}>
                                    <p>{testimonial.content}</p>
                                </div>

                                <div className={styles.userInfo}>
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className={styles.userImage}
                                    />
                                    <div className={styles.userDetails}>
                                        <h3>{testimonial.name}</h3>
                                        <p>{testimonial.role}</p>
                                        <div className={styles.rating}>
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className={`${styles.scrollButton} ${styles.scrollLeft}`}
                        onClick={prevSlide}
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className={`${styles.scrollButton} ${styles.scrollRight}`}
                        onClick={nextSlide}
                    >
                        <FaChevronRight />
                    </button>

                    <div className={styles.indicators}>
                        {[...Array(testimonials.length - 2)].map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
