import { ImageSlider } from "@/app/_components/ImageSlider";
import HeadingOffer from "./_components/HeadingOffer";
import {HomeFood} from '@/app/types/food'

type OffersSectionProps = {
  offers: HomeFood[]
}
export default function OffersSection({ offers }: OffersSectionProps) {
  
  const images: string[] = offers.map((offer) => offer.image);
  return (
    <div>
      <HeadingOffer />
      <ImageSlider images={images} />
    </div>
  );
}
