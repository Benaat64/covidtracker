import PlayerInfo from "./PlayerInfo";

const TeamInfo = ({
  team,
  teamName,
  teamColor,
  searchedPuuid,
  getChampionImageUrl,
  getItemImageUrl,
}) => {
  return (
    <div className={`p-4 rounded-lg ${teamColor}`}>
      <h2 className="text-center text-xl font-bold mb-4">{teamName}</h2>
      <ul className="divide-y divide-gray-700">
        {team.map((player) => (
          <PlayerInfo
            key={player.puuid}
            player={player}
            className={player.puuid === searchedPuuid ? "bg-yellow-50" : ""}
            getChampionImageUrl={getChampionImageUrl}
            getItemImageUrl={getItemImageUrl}
          />
        ))}
      </ul>
    </div>
  );
};

export default TeamInfo;
