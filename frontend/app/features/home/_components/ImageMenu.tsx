import Image from "next/image";
import img from "@/public/image_specials_1.png";
import { Button } from "@/components/ui/button";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";

export default function ImageMenu() {
  return (
    <div>
      <div className=" relative w-screen max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[489px] aspect-[489/615] mx-auto lg:mx-0">
        <Image
          src={img}
          alt="image_specials_1"
          fill
          className="object-contain"
        />
      </div>
      <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[489px] mx-auto lg:mx-0">
        <Button className="w-full rounded-none px-7 py-9">
          <Link
            href="/menu"
            className="flex items-center justify-between w-full"
          >
            <h1 className="px-15 text-[35px]">VIEW ALL MENU</h1>
            <CircleArrowRight
              size={120}
              className="mr-2"
              style={{ width: "40px", height: "120px" }}
            />
          </Link>
        </Button>
      </div>
    </div>
  );
}
