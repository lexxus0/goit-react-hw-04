const ACCESS_KEY = import.meta.env.VITE_API_KEY;

import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const requestImagesBySearchValue = async (searchValue, curPage) => {
  const { data } = await axios.get("/search/photos", {
    params: {
      client_id: ACCESS_KEY,
      query: searchValue,
      page: curPage,
      per_page: 12,
    },
  });
  return data;
};
