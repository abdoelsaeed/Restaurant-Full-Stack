"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  image: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    rating: 5,
    comment:
      "Amazing food quality and fast delivery. Everything was fresh and delicious!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Sarah ",
    rating: 4,
    comment:
      "Great experience overall. The pizza was incredible and very tasty.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Omar ",
    rating: 5,
    comment:
      "Best restaurant in town! Highly recommend the burgers and desserts.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: "41",
    name: "Lina Youssef",
    rating: 4,
    comment: "Nice atmosphere and friendly staff. Will definitely come again.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "0",
    name: "Ahmed Hassan",
    rating: 5,
    comment:
      "Amazing food quality and fast delivery. Everything was fresh and delicious!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "9",
    name: "Sarah Mohamed",
    rating: 4,
    comment:
      "Great experience overall. The pizza was incredible and very tasty.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "7",
    name: " Ali",
    rating: 5,
    comment:
      "Best restaurant in town! Highly recommend the burgers and desserts.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: "8",
    name: " Youssef",
    rating: 4,
    comment: "Nice atmosphere and friendly staff. Will definitely come again.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default function ReviewSection() {
  return (
    <section className="px-4 sm:px-6 md:px-10 py-16 bg-third">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-primary font-bold text-[28px] sm:text-[34px]">
            What Our Customers Say
          </h2>
          <p className="text-secondary mt-3 max-w-xl mx-auto">
            Real feedback from people who love our food and service.
          </p>
        </div>

        {/* Auto Scroll Swiper */}
        <Swiper
          modules={[Autoplay]}
          loop
          speed={6000} // سرعة الحركة (كل ما كبرت أبطأ)
          autoplay={{
            delay: 0, // مهم جدًا للحركة المستمرة
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // يوقف لما الماوس يدخل
          }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
          className="overflow-hidden"
        >
          {reviews.concat(reviews).map((review, index) => (
            <SwiperSlide key={`${review.id}-${index}`}>
              <div
                className="
                  bg-white rounded-xl p-6 h-full
                  shadow-sm hover:shadow-md transition
                "
              >
                {/* User */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">
                      {review.name}
                    </h4>
                    <RatingStars rating={review.rating} />
                  </div>
                </div>

                {/* Comment */}
                <p className="text-secondary text-sm leading-relaxed">
                  “{review.comment}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
