import { OTPForm } from "@/components/otp-form";
interface PageProps {
  searchParams: Promise<{ email?: string }>; // ✅ Promise
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams; 
  const email = params.email as string;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <OTPForm email={email} />
      </div>
    </div>
  );
}
