const EventCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between animate-pulse">
      <div>
        {/* Title Skeleton */}
        <div className="h-7 bg-slate-200 rounded-md w-3/4 mb-4"></div>
        
        {/* Description Skeleton (2 lines) */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-slate-100 rounded w-full"></div>
          <div className="h-4 bg-slate-100 rounded w-5/6"></div>
        </div>

        {/* Info Rows Skeleton */}
        <div className="space-y-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-4 h-4 bg-slate-200 rounded-full mr-3"></div>
              <div className="h-4 bg-slate-100 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="w-full bg-slate-200 h-12 rounded-xl"></div>
    </div>
  );
};

export { EventCardSkeleton };