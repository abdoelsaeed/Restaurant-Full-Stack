"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";

type ImageSliderProps = {
  images: string[];
};

export function ImageSlider({ images }: ImageSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  // احترم إعدادات المستخدم (Accessibility)
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);

    const handler = () => setReduceMotion(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <div className="relative w-full px-3 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-6 sm:mt-8 md:mt-10">
      <div className="mx-auto w-full max-w-5xl xl:max-w-6xl">
        <Swiper
          modules={[FreeMode, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          autoplay={
            reduceMotion
              ? false
              : {
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          speed={6000}
          spaceBetween={8}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1.5, spaceBetween: 6 },
            375: { slidesPerView: 2, spaceBetween: 8 },
            480: { slidesPerView: 2.5, spaceBetween: 8 },
            640: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 3.5, spaceBetween: 12 },
            1024: { slidesPerView: 4, spaceBetween: 12 },
            1280: { slidesPerView: 4.5, spaceBetween: 14 },
            1536: { slidesPerView: 5, spaceBetween: 16 },
          }}
          className="overflow-visible"
        >
          {images.map((img, index) => (
            <SwiperSlide key={img + index}>
              <div className="mx-auto aspect-square w-full max-w-[180px] xs:max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-xl object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Fade يوحي إن في محتوى */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-8
                        bg-gradient-to-l from-white to-transparent"
        />
      </div>
    </div>
  );
}
