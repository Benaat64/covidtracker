import React from "react";
import { getChampionNameByKey } from "../utils/utils";

type BansListProps = {
  teamName: string;
  bans: Array<{ championId: number }>;
  getChampionImageUrl: (championName: string) => string;
  championData: any;
};

const BansList: React.FC<BansListProps> = ({
  teamName,
  bans,
  getChampionImageUrl,
  championData,
}) => {
  if (!championData) {
    console.error("Champion data is undefined or null in BansList");
    return (
      <div className="text-red-500">
        Erreur: Données de champions non valides.
      </div>
    );
  }

  console.log("Champion Data in BansList:", championData); // Debugging

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">Bans {teamName}</h3>
      <ul className="flex gap-2">
        {bans.map((ban, index) => {
          const championName = getChampionNameByKey(
            ban.championId, // Utilisation de championId qui est la 'key'
            championData
          );

          if (championName === "Unknown Champion") {
            console.error(`Champion Key ${ban.championId} not found.`);
            return null;
          }

          const imageUrl = getChampionImageUrl(championName);
          console.log(
            `Image URL for champion Key ${ban.championId}: ${imageUrl}`
          );

          return (
            <li key={index}>
              <img
                src={imageUrl}
                alt={`Ban ${championName}`}
                className="w-10 h-10"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BansList;
