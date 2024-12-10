import React from "react";

// Définir une interface pour typer les props si vous utilisez TypeScript
interface ProfileInfoProps {
  profileData: {
    account: {
      gameName: string;
      tagLine: string;
    };
    summoner: {
      profileIconId: number;
      summonerLevel: number;
    };
    league: {
      queueType: string;
      tier: string;
      rank: string;
      leaguePoints: number;
      wins: number;
      losses: number;
    }[];
    tftLeague?: {
      queueType: string;
      tier: string;
      rank: string;
      leaguePoints: number;
      wins: number;
      losses: number;
    }[];
  };
}

function ProfileInfo({ profileData }: ProfileInfoProps) {
  const { account, summoner, league, tftLeague } = profileData;

  // Fonction pour obtenir l'URL de l'image de rang
  const getRankImageUrl = (tier: string): string => {
    const tierFormatted = tier.toLowerCase();
    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tierFormatted}.png`;
  };

  // Fonction pour calculer le pourcentage de victoires
  const calculateWinPercentage = (wins: number, losses: number): string => {
    const totalGames = wins + losses;
    return totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) : "0";
  };

  // Fonction pour rendre la section League
  const renderLeagueInfo = () => {
    return league
      .filter((leagueInfo) => leagueInfo.queueType === "RANKED_SOLO_5x5")
      .map((leagueInfo, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center border border-gray-300 py-6 px-6 bg-gray-100 rounded-lg shadow-md mb-8"
        >
          <img
            src={getRankImageUrl(leagueInfo.tier)}
            alt={`Rank ${leagueInfo.tier}`}
            className="w-100 h-100 mb-4" // Agrandir l'image à 128x128 pixels
          />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">
              {leagueInfo.tier} {leagueInfo.rank}
            </p>
            <p className="text-lg text-gray-600">
              {leagueInfo.queueType.replace(/_/g, " ")}
            </p>
            <p className="text-xl font-semibold text-blue-700 mt-4">
              {leagueInfo.leaguePoints} LP
            </p>
            <div className="text-md mt-2">
              <span className="text-green-600">{leagueInfo.wins}W</span> /{" "}
              <span className="text-red-600">{leagueInfo.losses}L</span>
            </div>
            <p className="text-md text-purple-600 font-medium mt-1">
              Win Rate:{" "}
              {calculateWinPercentage(leagueInfo.wins, leagueInfo.losses)}%
            </p>
          </div>
        </div>
      ));
  };

  // Fonction pour rendre la section TFT League
  const renderTFTLeagueInfo = () => {
    if (!tftLeague || tftLeague.length === 0) {
      return (
        <div className="text-center text-gray-500">
          Aucune donnée de rang TFT disponible.
        </div>
      );
    }

    return tftLeague
      .filter((leagueInfo) => leagueInfo.queueType === "RANKED_TFT") // Filtrer uniquement les données Ranked TFT
      .map((leagueInfo, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center border border-gray-300 py-6 px-6 bg-gray-100 rounded-lg shadow-md mb-8"
        >
          <img
            src={getRankImageUrl(leagueInfo.tier)}
            alt={`Rank ${leagueInfo.tier}`}
            className="w-100 h-100 mb-4" // Agrandir l'image à 128x128 pixels
          />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">
              {leagueInfo.tier} {leagueInfo.rank}
            </p>
            <p className="text-lg text-gray-600">
              TFT {leagueInfo.queueType.replace(/_/g, " ")}
            </p>
            <p className="text-xl font-semibold text-blue-700 mt-4">
              {leagueInfo.leaguePoints} LP
            </p>
            <div className="text-md mt-2">
              <span className="text-green-600">{leagueInfo.wins}W</span> /{" "}
              <span className="text-red-600">{leagueInfo.losses}L</span>
            </div>
            <p className="text-md text-purple-600 font-medium mt-1">
              Win Rate:{" "}
              {calculateWinPercentage(leagueInfo.wins, leagueInfo.losses)}%
            </p>
          </div>
        </div>
      ));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto mt-8">
      <div className="flex items-center mb-10">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/profileicon/${summoner.profileIconId}.png`}
          alt="Profile Icon"
          className="w-24 h-24 rounded-full mr-6 border-2 border-blue-500"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {account.gameName}#{account.tagLine}
          </h1>
          <p className="text-lg text-gray-600">
            Level {summoner.summonerLevel}
          </p>
        </div>
      </div>

      <h3 className="text-3xl font-semibold text-gray-800 mb-8">League Info</h3>
      <div className="grid grid-cols-2 gap-8">
        {renderLeagueInfo()}
        {renderTFTLeagueInfo()}
      </div>
    </div>
  );
}

export default ProfileInfo;
