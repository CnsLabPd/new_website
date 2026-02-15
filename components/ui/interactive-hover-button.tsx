import React from "react";
// Removed: import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "button" , className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      
      className={cn(
        "group relative w-fit cursor-pointer overflow-hidden rounded-full border-2 border-gray-300 py-2 px-8 text-center font-semibold bg-transparent transition-colors duration-100",
        className,
      )}
      {...props}
    >
      
    
      <span className="relative z-20 whitespace-nowrap transition-colors duration-100 group-hover:text-primary-foreground">
        {text}
      </span>
      
    
      <div className="absolute inset-0 z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-0 w-0 bg-primary transition-all duration-300 group-hover:h-full group-hover:w-full"></div>
      </div>

    </button> 
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };