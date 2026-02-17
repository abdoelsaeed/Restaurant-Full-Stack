export default function NotFound() {
    return(
    <div className="px-5 py-3">
        <div className="flex min-h-[60vh] items-center justify-center text-center">
          <div>
            <h2 className="text-lg font-semibold text-neutral-300">
              No orders found
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              Try changing the status filter or check back later.
            </p>
          </div>
        </div>
      </div>
    )
};
