const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const RIOT_API_KEY = process.env.RIOT_API_KEY;

router.get("/", async (req, res) => {
  const { gameName, tagLine } = req.query;

  if (!gameName || !tagLine) {
    return res
      .status(400)
      .json({ message: "gameName and tagLine are required" });
  }

  try {
    // Obtenir PUUID
    const accountResponse = await axios.get(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
        gameName
      )}/${encodeURIComponent(tagLine)}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );
    const puuid = accountResponse.data.puuid;

    // Obtenir Summoner ID
    const summonerResponse = await axios.get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );
    const summonerId = summonerResponse.data.id;

    // Obtenir Identifiants de match
    const matchIdsResponse = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );
    const matchIds = matchIdsResponse.data;

    // Obtenir Détails des matchs
    const matchDetailsPromises = matchIds.map((matchId) =>
      axios.get(
        `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        {
          headers: { "X-Riot-Token": RIOT_API_KEY },
        }
      )
    );

    const matchDetailsResponses = await Promise.all(matchDetailsPromises);
    const matchDetails = matchDetailsResponses.map((response) => response.data);

    // Obtenir Informations de Classement (LOL)
    const leagueResponse = await axios.get(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );

    // Obtenir Informations de Classement TFT
    const tftLeagueResponse = await axios.get(
      `https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );

    if (
      leagueResponse.data.length === 0 &&
      tftLeagueResponse.data.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "No league data found for the summoner" });
    }

    res.json({
      account: accountResponse.data,
      summoner: summonerResponse.data,
      league: leagueResponse.data, // Données LOL
      tftLeague: tftLeagueResponse.data, // Données TFT
      matches: matchDetails,
    });
  } catch (error) {
    console.error(
      "Error finding player:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Error finding player" });
  }
});

module.exports = router;
