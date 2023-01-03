import axios from "axios";
import { reactive } from "vue";
import { defineStore } from "pinia";

import type { ShowResponseConfig, ShowConfig } from "@/instances";

interface GenreConfig {
  [key: string]: Array<number>;
}
interface ShowsConfig {
  [key: number]: ShowConfig;
}

interface ShowStoreConfig {
  shows: ShowsConfig;
  error: string;
  genres: GenreConfig;
  showClicked: ShowConfig | null;
}

const BASE_PATH: string = "https://api.tvmaze.com/shows";

export const showsStore = defineStore("shows", () => {
  const showsInfo: ShowStoreConfig = reactive({
    shows: {},
    genres: {},
    error: "",
    showClicked: null,
  });

  const updateShowClicked = (show: ShowConfig | null = null) => {
    showsInfo.showClicked = show;
  };

  const getAllShows = async () => {
    await axios
      .get(BASE_PATH)
      .then((response) => {
        const data = response.data;
        data.sort(
          (a: ShowResponseConfig, b: ShowResponseConfig) =>
            b.rating.average - a.rating.average
        );
        const genreShowMap: GenreConfig = {};
        const showsInfoMap: ShowsConfig = {};
        const idsOrganized = new Set();
        data.forEach((show: ShowResponseConfig) => {
          for (const genre of show.genres) {
            if (!genreShowMap[genre]) genreShowMap[genre] = [];
            if (genreShowMap[genre].length > 25) continue;
            if (!idsOrganized.has(show.id)) {
              genreShowMap[genre].push(show.id);
              idsOrganized.add(show.id);
            }
          }
          showsInfoMap[show.id] = {
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

        for (const genre in genreShowMap) {
          if (genreShowMap[genre].length < 8) {
            delete genreShowMap[genre];
          }
        }

        showsInfo.shows = showsInfoMap;
        showsInfo.genres = genreShowMap;
        showsInfo.error = "";
        console.log(showsInfo);
      })
      .catch((error) => {
        showsInfo.shows = {};
        showsInfo.genres = {};
        showsInfo.error = error;
      });
  };

  return { showsInfo, getAllShows, updateShowClicked };
});
