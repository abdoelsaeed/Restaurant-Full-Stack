import { Button } from "@/components/ui/button";

export default function OrderButton() {
    return (
      <Button
        variant="outline"
        className="bg-primary text-pureWhite hover:bg-primary/90 hover:text-pureWhite w-[200px] xl:w-[220px] h-[65px] text-[35px] rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Order Now
      </Button>
    );
};
