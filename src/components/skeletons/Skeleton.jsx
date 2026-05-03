// Primitive skeleton block. Compose into shape-specific skeletons.
export function Skeleton({ className = "", style }) {
  return <div className={`skeleton ${className}`} style={style} aria-hidden />;
}

export function SkeletonCircle({ size = 40, className = "" }) {
  return (
    <Skeleton
      className={`rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function SkeletonText({ width = "100%", height = 12, className = "" }) {
  return (
    <Skeleton
      className={className}
      style={{ width, height }}
    />
  );
}

// ── Domain skeletons ───────────────────────────────────────

// Restaurant card (used in Featured / All / Favourites lists)
export function RestaurantCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <Skeleton className="w-full h-40 lg:h-44 rounded-none" />
      <div className="p-3 space-y-2">
        <SkeletonText width="65%" height={16} />
        <SkeletonText width="80%" height={11} />
        <div className="flex gap-2 mt-2">
          <SkeletonText width={50} height={11} />
          <SkeletonText width={40} height={11} />
          <SkeletonText width={40} height={11} />
        </div>
      </div>
    </div>
  );
}

// Order summary card (OrdersPage / ProfileOrders)
export function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-1.5">
          <SkeletonText width={90} height={11} />
          <SkeletonText width={60} height={10} />
        </div>
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          <SkeletonCircle size={36} />
          <SkeletonCircle size={36} />
          <SkeletonCircle size={36} />
        </div>
        <SkeletonText width={60} height={16} />
      </div>
    </div>
  );
}

// Booking card (Bookings page)
export function BookingCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-1.5">
          <SkeletonText width={140} height={14} />
          <SkeletonText width={70} height={10} />
        </div>
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
      <div className="flex flex-wrap gap-3">
        <SkeletonText width={90} height={12} />
        <SkeletonText width={50} height={12} />
        <SkeletonText width={70} height={12} />
      </div>
    </div>
  );
}

// Stat card (Profile / Admin Dashboard)
export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card p-4 lg:p-5 space-y-2">
      <Skeleton className="w-9 h-9 rounded-xl" />
      <SkeletonText width={50} height={10} />
      <SkeletonText width={40} height={18} />
    </div>
  );
}

// One row in an admin table
export function AdminTableRowSkeleton({ cols = 6 }) {
  return (
    <tr className="border-t border-gray-100">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="p-4">
          <SkeletonText width={i === 0 ? 90 : "70%"} height={12} />
        </td>
      ))}
    </tr>
  );
}

// Card-grid skeletons for restaurant grids in admin
export function AdminCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-1.5 w-full">
          <SkeletonText width="70%" height={14} />
          <SkeletonText width="50%" height={10} />
        </div>
        <Skeleton className="w-12 h-5 rounded-full" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <Skeleton className="w-16 h-5 rounded-full" />
        <SkeletonText width={40} height={11} />
      </div>
    </div>
  );
}
