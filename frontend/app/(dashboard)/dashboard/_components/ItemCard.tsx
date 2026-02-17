import { ItemOrder } from "@/app/types/dashboard";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type ItemCardProps={
    items:ItemOrder[]
}
export default function ItemCard({items}:ItemCardProps) {
    return(
        <div className="mt-5 max-h-[225px] overflow-y-auto px-3  space-y-3 border-b-1 border-[#414448]">
            {items?.map((item,i) => (
                <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-white/5 p-2 hover:bg-white/10 transition"
                >
                {/* Avatar */}
                <div className="relative h-12 w-12 shrink-0 rounded-full bg-neutral-700">
                    <Avatar className="absolute inset-0 m-auto h-10 w-10">
                    <AvatarImage
                        src={item.image?.trim()}
                        alt={item.productName}
                    />
                    </Avatar>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                    {item.productName}
                    </p>
                    <p className="text-xs text-neutral-400">
                    Qty: {item.quantity} · ${item.price / 100}
                    </p>
                </div>
                </div>
            ))}
        </div>
    )
};
