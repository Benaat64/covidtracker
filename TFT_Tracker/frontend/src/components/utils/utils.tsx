import axios from "axios";

// Récupérer les données des champions
export const getChampionData = async () => {
  try {
    const response = await axios.get(
      "https://ddragon.leagueoflegends.com/cdn/14.17.1/data/en_US/champion.json"
    );
    return response.data.data; // Retourne uniquement l'objet des champions
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données des champions:",
      error
    );
    return null;
  }
};

// Mapper les keys des champions aux noms
export const mapChampionKeyToName = (championData: any) => {
  if (!championData) {
    console.error("Champion data is undefined or null");
    return {}; // Retourne un objet vide si les données des champions ne sont pas disponibles
  }

  const championKeyToNameMap: { [key: string]: string } = {}; // Utiliser des clés de type string

  // Utilise `key` pour mapper à `id` pour obtenir le nom du champion
  Object.entries(championData).forEach(([key, champion]: [string, any]) => {
    championKeyToNameMap[key] = champion; // Assurez-vous d'utiliser les clés comme des chaînes
  });

  return championKeyToNameMap;
};

// Obtenir le nom du champion par son key
export const getChampionNameByKey = (
  championKey: number,
  championData: any
): string => {
  if (!championData) {
    console.error("Champion data is undefined or null");
    return "Unknown Champion";
  }

  const championMap = mapChampionKeyToName(championData);

  // Convertir championKey en chaîne
  const keyString = championKey.toString();

  if (!championMap[keyString]) {
    console.error(`Champion Key ${keyString} not found in champion data.`);
    return "Unknown Champion";
  }

  return championMap[keyString];
};

// Obtenir l'URL de l'image d'un champion par son nom
export const getChampionImageUrl = (championName: string): string => {
  return `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${championName}.png`;
};

// Fonctions pour les Sorts d'Invocateur

// Récupérer les données des sorts d'invocateur
export const getSummonerSpellData = async () => {
  try {
    const response = await axios.get(
      "https://ddragon.leagueoflegends.com/cdn/14.17.1/data/en_US/summoner.json"
    );
    return response.data.data; // Retourne l'objet des sorts d'invocateur
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données des sorts d'invocateur:",
      error
    );
    return null;
  }
};

// Obtenir l'URL de l'image d'un sort d'invocateur
export const getSummonerSpellImageUrl = (
  spellId: number,
  spellData: any
): string => {
  if (!spellData) {
    console.error("Les données des sorts d'invocateur sont manquantes");
    return "";
  }

  const spell = Object.values(spellData).find(
    (spell: any) => parseInt(spell.key) === spellId
  );

  return spell
    ? `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/spell/${spell.image.full}`
    : "";
};

// Fonctions pour les Objets (Items)

// Trier les objets des joueurs
export const sortItems = (items: (number | null)[]): (number | null)[] => {
  const validItems = items.filter((item) => item && item > 0); // Filtre les items valides
  const emptySlots = items.filter((item) => !item || item <= 0); // Récupère les slots vides ou non valides
  return [...validItems, ...emptySlots]; // Concatène les items valides et vides
};

// Obtenir l'URL de l'image d'un item par son ID
export const getItemImageUrl = (itemId: number): string => {
  return `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/item/${itemId}.png`;
};

// Fonctions pour les Partis de Jeu

// Obtenir la description de la file d'attente de jeu
export const getQueueDescription = (queueId: number): string => {
  const queueMap: { [key: number]: string } = {
    420: "Ranked Solo",
    440: "Ranked Flex",
    450: "ARAM",
    430: "Normal Blind Pick",
    400: "Normal Draft Pick",
  };

  return queueMap[queueId] || "Unknown";
};

// Calculer le temps écoulé depuis la fin du jeu
export const timeSinceGameEnded = (gameEndTimestamp: number): string => {
  const now = Date.now();
  const timeDifference = now - gameEndTimestamp;

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else if (hours < 24) {
    return `il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  } else {
    return `il y a ${days} jour${days > 1 ? "s" : ""}`;
  }
};

// Fonction Générique pour Fetcher les Données
export const fetchData = async (url: string, params?: object) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
