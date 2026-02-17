import { ItemOrder } from "@/app/types/dashboard"
import ItemCard from "./ItemCard"
import { format } from "date-fns";
import OrderDetails from "./OrderDetails";

type CardOrderProps={
    amount:number,
    status:string,
    items:ItemOrder[],
    email:string,
    updatedAt:string,
    i:number;
}
export default function CardOrder({amount,status,items,email,updatedAt,i}:CardOrderProps) {
    const date = format(new Date(updatedAt), "dd MMM yyyy, hh:mm a");

    return(
        <div className="bg-linear-to-b from-[#212429] via-[#4A4F56] to-[#212429] mt-10 rounded-2xl shadow-2xl h-[370px] w-[270px] pt-3">
            <div className="text-center">
                <h1 className="font-semibold text-white text-[16px] ">Order  #{i+1}</h1>
                <p className="text-neutral-200">{date}</p>
                <ItemCard items={items}/>
            </div>
                <OrderDetails status={status}/>

        </div>
    )
};
