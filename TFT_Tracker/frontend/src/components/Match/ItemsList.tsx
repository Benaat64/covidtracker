import React from "react";

interface ItemsListProps {
  items: number[]; // Tableau des IDs des items
  getItemImageUrl: (itemId: number) => string; // Fonction pour obtenir l'URL de l'image de l'item
}

const ItemsList: React.FC<ItemsListProps> = ({ items, getItemImageUrl }) => {
  // Filtrer les items valides (non null et non négatifs)
  const validItems = items.filter((itemId) => itemId && itemId > 0);

  // Calculer le nombre d'espaces vides à ajouter
  const emptySlotsCount = 7 - validItems.length;

  return (
    <div className="flex items-center space-x-1">
      {/* Afficher les images des items valides */}
      {validItems.map((itemId, idx) => (
        <img
          key={idx}
          src={getItemImageUrl(itemId)}
          alt={`Item ${itemId}`}
          className="w-6 h-6"
        />
      ))}
      {/* Ajouter des espaces vides à la fin */}
      {Array.from({ length: emptySlotsCount }).map((_, idx) => (
        <div key={`empty-${idx}`} className="w-6 h-6 bg-gray-700" />
      ))}
    </div>
  );
};

export default ItemsList;
