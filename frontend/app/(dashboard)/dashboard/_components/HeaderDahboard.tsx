import { Search } from "lucide-react";
import Image from "next/image";

export default function HeaderDahboard({name}:{name:string}) {
  return(
    <div className="flex justify-between items-center ">
      <div className="relative w-full max-w-sm h-[45px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full rounded-lg bg-[#42474A] pl-10 pr-3"
        />
      </div>

      <div className="flex justify-between items-center gap-3">
        <div className="relative w-[45px] h-[45px]">
            <Image src='/AdminPhoto.png' alt="admin photo" fill quality={100}/>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white">A</span>
        </div>
        <p className="text-[#C4C4C4] text-xl">{name}</p>
        <div className="relative w-[22px] h-[27px] ml-10">
            <Image src='/bell.png' alt="admin photo" fill/>
        </div>
      </div>      
    </div>
  )
};
