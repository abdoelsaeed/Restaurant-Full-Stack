import { CalendarComponent } from "@/app/_components/Calendar";

export default function HeaderStatistics() {
    return(
        <div className="flex justify-between items-center">
                <div className="mb-10 mt-10 ">
                  <h1 className="font-bold text-[28px]">TOP RESTO is open 🟢</h1>
                  <p className="text-[12px] text-[#E1E1E1]">
                    22 Mei 2021, 12.21 PM | Los Angeles
                  </p>
                </div>
                <CalendarComponent />
              </div>
    )
};
