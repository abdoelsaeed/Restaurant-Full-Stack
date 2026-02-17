import { Button } from "@/components/ui/button";
import { CircleCheck, Wrench } from "lucide-react";

export default function OrderDetails({status}:{status:string}) {
    const color = status==='paid'?'#149D3B':"#BD8414";
    const boolean = status==='paid'?true:false;
    return(
        <div className="flex justify-between items-center px-4 py-0.5">
            <div>
                <p className="text-[#888888] font-semibold">X 2 items</p>
                <p className="font-semibold">$12.5</p>
            </div>
            <Button color={color} size='lg' style={{ backgroundColor: color }} className={`font-semibold text-xl bg-[${color}] hover:bg-[${color}] flex justify-between items-center`}><span>{status}</span>{boolean?<CircleCheck className="mt-1 size-5"/>: <Wrench className="mt-1 size-5"/>}</Button>
        </div>
    )
};
