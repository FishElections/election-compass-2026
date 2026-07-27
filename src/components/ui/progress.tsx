"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryProvider";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const { dir } = useDictionary();
  // The indicator is always full-width and only ever translated, clipped by
  // the track's overflow-hidden — so the fill grows from the reading-start
  // edge (right in RTL, left in LTR) as `value` increases.
  const empty = 100 - (value || 0);
  const offsetPercent = dir === "rtl" ? empty : -empty;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-gray",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 rounded-full from-sapphire to-success transition-transform duration-500 ease-out",
          dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"
        )}
        style={{ transform: `translateX(${offsetPercent}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
