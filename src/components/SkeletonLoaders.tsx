
import { Skeleton } from "@/components/ui/skeleton"

export const HeroSkeleton = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="text-center max-w-4xl mx-auto">
      <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
      <Skeleton className="h-6 w-2/3 mx-auto mb-4" />
      <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
      <div className="flex gap-4 justify-center">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="p-6 border rounded-lg">
    <Skeleton className="h-48 w-full mb-4" />
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export const ServicesSkeleton = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <Skeleton className="h-12 w-1/3 mx-auto mb-4" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export const ProjectsSkeleton = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <Skeleton className="h-12 w-1/3 mx-auto mb-4" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export const PartnersSkeleton = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <Skeleton className="h-12 w-1/3 mx-auto mb-4" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <Skeleton className="h-16 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export const EventsSkeleton = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <Skeleton className="h-12 w-1/3 mx-auto mb-4" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-1/3" />
    <div className="space-y-4">
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
    <Skeleton className="h-10 w-32" />
  </div>
);

export const TableSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-4 gap-4 p-4 border-b">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="grid grid-cols-4 gap-4 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    ))}
  </div>
);

export const ProjectSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);
