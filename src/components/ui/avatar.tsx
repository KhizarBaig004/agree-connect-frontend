import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  size?: "sm" | "md" | "lg";
  imageUrl?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-20 w-20 text-2xl",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name = "", size = "md", imageUrl, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    const getInitials = (name: string) => {
      if (!name) return "?";
      const parts = name.trim().split(" ");
      if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
      }
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const initials = getInitials(name);
    const showImage = imageUrl && !imageError;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-full overflow-hidden cursor-pointer",
          !showImage && "bg-primary text-primary-foreground font-semibold",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={imageUrl}
            alt={name || "Profile"}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };

