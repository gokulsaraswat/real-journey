import { LoaderSlot } from "@/components/ui/loader-slot";

export default function Loading() {
  return (
    <div className="page-shell flex min-h-[70vh] items-center justify-center py-16">
      <LoaderSlot
        title="Loading Real Journey"
        description="Patch 1 uses a clean fallback loader until your final GIF is added."
      />
    </div>
  );
}
