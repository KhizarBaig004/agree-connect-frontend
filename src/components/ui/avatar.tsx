import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name = "", size = "md", ...props }, ref) => {
    const getInitials = (name: string) => {
      if (!name) return "?";
      const parts = name.trim().split(" ");
      if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
      }
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const initials = getInitials(name);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold cursor-pointer",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {initials}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };

