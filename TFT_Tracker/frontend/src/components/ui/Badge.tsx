import React from "react";

interface BadgeProps {
  isVictory?: boolean; // Détermine si le badge représente une victoire ou une défaite
  text?: string; // Texte alternatif pour le badge, si vous ne voulez pas utiliser isVictory
  className?: string; // Classes supplémentaires pour personnaliser le style du badge
}

const Badge: React.FC<BadgeProps> = ({ isVictory, text, className = "" }) => {
  const baseStyles =
    "inline-block px-3 py-1 rounded-full text-xs font-semibold";

  // Détermine le style du badge en fonction de isVictory
  const statusStyles = isVictory
    ? "bg-green-500 text-white"
    : "bg-red-500 text-white";

  return (
    <span className={`${baseStyles} ${statusStyles} ${className}`}>
      {text || (isVictory ? "Victoire" : "Défaite")}
    </span>
  );
};

export default Badge;
