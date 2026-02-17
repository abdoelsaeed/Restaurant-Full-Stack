import { getMe } from "@/app/services/auth/auth.server";
import { redirect } from "next/navigation";
import HeaderDahboard from "./_components/HeaderDahboard";
import Sidebar from "./_components/Sidebar";

//bg-gradient-to-r from-[#383D46] to-[#6C7076]
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  if (!user) redirect("/auth/login");
  if (user.role !== "Admin") redirect("/");

  return (
    <div className="flex min-h-screen bg-[#212429]">
      <Sidebar/>
      <main className="flex-1 p-6 bg-[#2F3337] text-white px-5 py-3">
        <div className="px-5 py-3">
          <HeaderDahboard name={user.name || "Admin"} />
        </div>
        {children}
      </main>
    </div>
  );
}
