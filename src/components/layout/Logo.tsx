import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showTagline?: boolean;
}

export function Logo({ size = "md", variant = "dark", showTagline = false }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-xl", tagline: "text-xs" },
    md: { icon: 32, text: "text-2xl", tagline: "text-sm" },
    lg: { icon: 48, text: "text-4xl", tagline: "text-base" },
  };

  const colors = {
    light: {
      icon: "text-white",
      text: "text-white",
      tagline: "text-white/80",
    },
    dark: {
      icon: "text-primary",
      text: "text-primary",
      tagline: "text-muted-foreground",
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className={`relative ${colors[variant].icon}`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Eye size={sizes[size].icon} strokeWidth={1.5} />
          <motion.div
            className="absolute inset-0 bg-secondary/20 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        <div className="flex flex-col">
          <span className={`font-bold ${sizes[size].text} ${colors[variant].text} font-arabic`}>
            بصيرة
          </span>
          <span className={`font-english ${colors[variant].text} opacity-70 text-sm tracking-wide`}>
            BASEERA
          </span>
        </div>
      </div>
      {showTagline && (
        <motion.p
          className={`${sizes[size].tagline} ${colors[variant].tagline} font-arabic`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          رؤية قبل القرار
        </motion.p>
      )}
    </motion.div>
  );
}
