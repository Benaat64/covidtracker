import React from "react";
import { getSummonerSpellImageUrl, sortItems } from "../utils/utils";

type PlayerInfoProps = {
  player: any;
  getChampionImageUrl: (championName: string) => string;
  getItemImageUrl: (itemId: number) => string;
  spellData: any; // Données des sorts d'invocateur
  className?: string;
  isSelected?: boolean; // Prop pour indiquer si le joueur est sélectionné
};

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  player,
  getChampionImageUrl,
  getItemImageUrl,
  spellData,
  className = "",
  isSelected = false, // Par défaut à `false`
}) => {
  if (!player) {
    console.error("Player data is undefined or null in PlayerInfo");
    return (
      <div className="text-red-500">Erreur: Données de joueur non valides.</div>
    );
  }

  // Trier les items pour avoir les slots vides à la fin
  const sortedItems = sortItems([
    player.item0,
    player.item1,
    player.item2,
    player.item3,
    player.item4,
    player.item5,
    player.item6,
  ]);

  return (
    <li
      className={`flex items-center justify-between p-1 rounded-md ${
        isSelected ? "bg-yellow-100 bg-opacity-50" : ""
      } ${className}`}
    >
      {/* Image du champion et sorts d'invocateur */}
      <div className="flex items-center space-x-1">
        <img
          src={getChampionImageUrl(player.championName)}
          alt={`Champion ${player.championName}`}
          className="w-10 h-10" // Réduire légèrement la taille des images de champion pour compacter le tout
        />
        {/* Sorts d'invocateur */}
        <div className="flex flex-col space-y-1">
          <img
            src={getSummonerSpellImageUrl(player.summoner1Id, spellData)}
            alt="Sort d'invocateur 1"
            className="w-6 h-6" // Réduire la taille des images des sorts
          />
          <img
            src={getSummonerSpellImageUrl(player.summoner2Id, spellData)}
            alt="Sort d'invocateur 2"
            className="w-6 h-6" // Réduire la taille des images des sorts
          />
        </div>
      </div>

      {/* KDA (Kills/Deaths/Assists) */}
      <p className="text-sm text-center mx-2 w-20">
        {" "}
        {/* Réduire la largeur à w-20 */}
        {player.kills} / {player.deaths} / {player.assists}
      </p>

      {/* Items */}
      <div className="flex items-center gap-1">
        {sortedItems.map((itemId, index) =>
          itemId ? (
            <img
              key={index}
              src={getItemImageUrl(itemId)}
              alt={`Item ${itemId}`}
              className="w-8 h-8" // Ajuster la taille des images des items
            />
          ) : (
            <div
              key={index}
              className="w-8 h-8 bg-gray-800 flex items-center justify-center"
            ></div>
          )
        )}
      </div>
    </li>
  );
};

export default PlayerInfo;
