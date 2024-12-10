import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import ProfileInfo from "./Profile/ProfileInfo";
import MatchInfo from "./Match/MatchInfo";
import { getChampionData } from "./utils/utils";

type FormData = {
  username: string;
  region: string;
};

const FormSummoners = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [profileData, setProfileData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [championData, setChampionData] = useState<any>(null);

  useEffect(() => {
    const fetchChampionData = async () => {
      const data = await getChampionData();
      setChampionData(data);
    };

    fetchChampionData();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.get("http://localhost:3000/player", {
        params: {
          gameName: data.username,
          tagLine: data.region,
        },
      });

      console.log("Données reçues de l'API:", response.data);
      setProfileData(response.data);
      setErrorMessage(null);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setErrorMessage("Erreur lors de la recherche du profil");
      setProfileData(null);
    }
  };

  const getItemImageUrl = (itemId: number) => {
    return `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/item/${itemId}.png`;
  };

  const getChampionImageUrl = (championName: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${championName}.png`;
  };

  return (
    <div className="container max-w-full p-10 bg-white rounded-lg shadow-lg max-w-6xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Input
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
              className="w-full p-4 border border-gray-300 rounded text-lg"
            />
            {errors.username && (
              <span className="text-red-500 mt-2 block">
                Username is required
              </span>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Region"
              id="region"
              {...register("region", { required: true })}
              className="w-full p-4 border border-gray-300 rounded text-lg"
            />
            {errors.region && (
              <span className="text-red-500 mt-2 block">
                Region is required
              </span>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          type="submit"
          className="w-full md:w-auto bg-blue-500 text-white py-4 px-8 rounded-lg hover:bg-blue-600 transition-all duration-200 text-lg"
        >
          Envoyer
        </Button>
      </form>

      {profileData && (
        <div className="mt-10">
          <ProfileInfo profileData={profileData} />
          <MatchInfo
            profileData={profileData}
            searchedPuuid={profileData.summoner.puuid}
            getChampionImageUrl={getChampionImageUrl}
            getItemImageUrl={getItemImageUrl}
            championData={championData}
          />
        </div>
      )}

      {errorMessage && (
        <p className="text-red-500 mt-6 text-lg">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormSummoners;
