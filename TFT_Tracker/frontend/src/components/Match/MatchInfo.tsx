import React, { useEffect, useState } from "react";
import TeamInfo from "./TeamInfo";
import PlayerInfo from "./PlayerInfo";
import BansList from "./BansList";
import Badge from "../ui/Badge";
import {
  getChampionData,
  getSummonerSpellData,
  getChampionNameByKey,
  getQueueDescription,
  timeSinceGameEnded,
  getItemImageUrl,
  getChampionImageUrl,
} from "../utils/utils";

type MatchInfoProps = {
  profileData: any;
  searchedPuuid: string;
};

const MatchInfo: React.FC<MatchInfoProps> = ({
  profileData,
  searchedPuuid,
}) => {
  const [championIdToNameMap, setChampionIdToNameMap] = useState<{
    [key: number]: string;
  }>({});
  const [spellData, setSpellData] = useState<any>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("LOL");
  const [displayedMatchesCount, setDisplayedMatchesCount] = useState(5);

  useEffect(() => {
    const loadChampionData = async () => {
      const championData = await getChampionData();
      if (championData) {
        const idToNameMap = {};
        Object.values(championData).forEach((champion) => {
          idToNameMap[parseInt(champion.key)] = champion.id;
        });
        setChampionIdToNameMap(idToNameMap);
        console.log("Données des champions chargées:", idToNameMap);
        setIsDataLoaded(true);
      } else {
        console.error("Erreur lors du chargement des données des champions");
      }
    };

    const loadSpellData = async () => {
      const spells = await getSummonerSpellData();
      setSpellData(spells);
    };

    loadChampionData();
    loadSpellData();
  }, []);

  if (!profileData || typeof profileData !== "object") {
    console.error(
      "Erreur: profileData est invalide ou non défini",
      profileData
    );
    return (
      <div className="text-red-500">Erreur: Données de profil non valides.</div>
    );
  }

  if (!profileData.matches || !Array.isArray(profileData.matches)) {
    console.error(
      "Erreur: profileData.matches est invalide ou non défini",
      profileData
    );
    return (
      <div className="text-red-500">
        Erreur: Les matchs du profil sont non valides.
      </div>
    );
  }

  const filteredMatches =
    selectedTab === "LOL" ? profileData.matches : profileData.tftMatches || [];

  const handleLoadMore = () => {
    setDisplayedMatchesCount((prevCount) => prevCount + 5);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 rounded ${
            selectedTab === "LOL" ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setSelectedTab("LOL")}
        >
          LOL
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${
            selectedTab === "TFT" ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setSelectedTab("TFT")}
        >
          TFT
        </button>
      </div>

      {filteredMatches.slice(0, displayedMatchesCount).map((match, index) => {
        if (
          !match.info ||
          !match.info.participants ||
          !Array.isArray(match.info.participants)
        ) {
          console.error(
            "Erreur: Les participants du match sont non valides",
            match
          );
          return (
            <div key={index} className="text-red-500">
              Erreur: Participants non valides.
            </div>
          );
        }

        const gameType = getQueueDescription(match.info.queueId);
        const elapsedTime = timeSinceGameEnded(match.info.gameEndTimestamp);

        const blueTeam = match.info.participants.filter(
          (player) => player.teamId === 100
        );
        const redTeam = match.info.participants.filter(
          (player) => player.teamId === 200
        );

        const blueTeamData = match.info.teams.find(
          (team) => team.teamId === 100
        );
        const redTeamData = match.info.teams.find(
          (team) => team.teamId === 200
        );

        const blueTeamBans = (blueTeamData?.bans || []).filter(
          (ban) => ban.championId > 0
        );
        const redTeamBans = (redTeamData?.bans || []).filter(
          (ban) => ban.championId > 0
        );

        if (!isDataLoaded) {
          return (
            <div key={index} className="text-gray-500">
              Chargement des données...
            </div>
          );
        }

        const selectedPlayer = match.info.participants.find(
          (participant) => participant.puuid === searchedPuuid
        );

        const isVictory = selectedPlayer?.win;

        return (
          <details key={index} className="mb-4">
            <summary className="cursor-pointer bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition flex items-center justify-between">
              <PlayerInfo
                player={selectedPlayer}
                getChampionImageUrl={getChampionImageUrl}
                getItemImageUrl={getItemImageUrl}
                spellData={spellData}
              />
              {/* Centrer le type de partie et le temps écoulé */}
              <div className="flex flex-col items-center justify-center w-1/3 text-center">
                <p className="text-xl font-bold">{gameType}</p>
                <p className="text-sm text-gray-400">{elapsedTime}</p>
              </div>
              <Badge isVictory={isVictory} />
            </summary>
            <div className="p-4 bg-gray-900 rounded-lg mt-2">
              <div className="flex justify-between mb-4">
                <BansList
                  teamName="Bleue"
                  bans={blueTeamBans}
                  getChampionImageUrl={getChampionImageUrl}
                  championData={championIdToNameMap}
                />
                <BansList
                  teamName="Rouge"
                  bans={redTeamBans}
                  getChampionImageUrl={getChampionImageUrl}
                  championData={championIdToNameMap}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900 p-4 rounded-md">
                  <p className="text-lg font-bold text-center mb-2">
                    Équipe Bleue
                  </p>
                  <ul>
                    {blueTeam.map((player) => (
                      <PlayerInfo
                        key={player.puuid}
                        player={player}
                        getChampionImageUrl={getChampionImageUrl}
                        getItemImageUrl={getItemImageUrl}
                        spellData={spellData}
                        className={
                          player.puuid === searchedPuuid ? "bg-amber-500" : ""
                        }
                      />
                    ))}
                  </ul>
                </div>
                <div className="bg-red-900 p-4 rounded-md">
                  <p className="text-lg font-bold text-center mb-2">
                    Équipe Rouge
                  </p>
                  <ul>
                    {redTeam.map((player) => (
                      <PlayerInfo
                        key={player.puuid}
                        player={player}
                        getChampionImageUrl={getChampionImageUrl}
                        getItemImageUrl={getItemImageUrl}
                        spellData={spellData}
                        className={
                          player.puuid === searchedPuuid ? "bg-amber-500" : ""
                        }
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </details>
        );
      })}

      {/* Bouton Voir Plus */}
      {displayedMatchesCount < filteredMatches.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Voir plus
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchInfo;
