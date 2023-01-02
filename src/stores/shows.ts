import axios from "axios";
import { reactive } from "vue";
import { defineStore } from "pinia";

import type { ShowResponseConfig, ShowConfig } from "@/instances";

interface ShowStoreConfig {
  shows: ShowConfig[];
  error: string;
}

const BASE_PATH: string = "https://api.tvmaze.com/shows";

export const showsStore = defineStore("shows", () => {
  const showsInfo: ShowStoreConfig = reactive({
    shows: [],
    error: "",
  });

  const getAllShows = async () => {
    await axios
      .get(BASE_PATH)
      .then((response) => {
        const data = response.data;
        const showsList = data.map((show: ShowResponseConfig): ShowConfig => {
          return {
            averageRuntime: show.averageRuntime,
            genres: show.genres,
            id: show.id,
            image: show.image.medium,
            language: show.language,
            name: show.name,
            rating: show.rating.average,
            weight: show.weight,
            summary: show.summary,
          };
        });
        showsInfo.shows = showsList;
        showsInfo.error = "";
      })
      .catch((error) => {
        showsInfo.shows = [];
        showsInfo.error = error;
      });
  };

  return { showsInfo, getAllShows };
});
