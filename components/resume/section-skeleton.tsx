import { cn } from "@/lib/cn";

interface SectionSkeletonProps {
  className?: string;
  lines?: number;
}

export function SectionSkeleton({ className, lines = 3 }: SectionSkeletonProps) {
  return (
    <output className={cn("space-y-4", className)} aria-label="Loading section">
      <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
      <div className="space-y-2">
        {[...Array(lines)].map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton content doesn't reorder
            key={`skeleton-line-${i}`}
            className={cn("h-4 animate-pulse rounded bg-gray-200", i === lines - 1 ? "w-3/4" : "w-full")}
          />
        ))}
      </div>
      <span className="sr-only">Loading content...</span>
    </output>
  );
}
