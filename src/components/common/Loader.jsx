import { Clapperboard } from 'lucide-react';

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <Clapperboard size={28} className="text-gold animate-pulse" />
      <p className="text-sm font-mono">{label}</p>
    </div>
  );
}

export function CardSkeleton({ className = 'w-full' }) {
  return (
    <div className={className}>
      <div className="aspect-[2/3] rounded-lg bg-surface animate-pulse" />
      <div className="mt-2 h-3 w-3/4 bg-surface rounded animate-pulse" />
    </div>
  );
}

export function RowSkeleton({ count = 6 }) {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} className="shrink-0 w-[160px] sm:w-[180px]" />
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 18 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
