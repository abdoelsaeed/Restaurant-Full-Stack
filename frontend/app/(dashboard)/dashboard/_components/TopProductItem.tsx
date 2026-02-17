/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TopProductItem({product ,i}:any) {
    return (
      <div className="flex items-center justify-between mt-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white">
            {i + 1}
          </span>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {product.productName}
            </span>
            <span className="text-xs text-white/60">
              {product.totalQuantity} sold
            </span>
          </div>
        </div>

        {/* Right Side */}
        <span className="text-sm font-semibold text-green-500">
          ${product.totalRevenue.toLocaleString()}
        </span>
      </div>
    );
};
