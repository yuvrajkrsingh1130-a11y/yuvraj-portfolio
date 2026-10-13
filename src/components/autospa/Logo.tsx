import logoOriginal from "../../assets/logo-original.png";
import { cn } from "../../utils/cn";

/**
 * The original Auto Spa America logo artwork (oval badge: car silhouette,
 * red "Auto" / blue "Spa" script, "AMERICA" + three red stars).
 * Rendered as the real image — pass an h-* class to size it.
 */
export function AutoSpaLogo({ className }: { className?: string }) {
  return (
    <img
      src={logoOriginal}
      alt="Auto Spa America"
      className={cn(
        "w-auto object-contain [filter:drop-shadow(0_6px_22px_rgba(56,189,248,0.28))]",
        className
      )}
      draggable={false}
    />
  );
}
