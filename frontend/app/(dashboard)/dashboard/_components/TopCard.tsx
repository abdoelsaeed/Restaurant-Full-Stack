type TopCardProps = {
  p: string;
  h1: string;
};

export default function TopCard({ p, h1 }: TopCardProps) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-linear-to-b from-[#25262a] via-[#383d45] to-[#32343a] px-4 py-6 text-center shadow-lg shadow-black/2 sm:px-6 sm:py-8 md:px-8 md:py-10">
      <p className="text-sm text-[#E1E1E1] sm:text-base md:text-[17px]">{p}</p>
      <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[35px]">
        {h1}
      </h1>
    </div>
  );
}
