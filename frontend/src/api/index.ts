import { useApiGet, TApiResponse } from "../hooks/useApi";

export const getRandomJoke = () => {
  const { data }: TApiResponse = useApiGet(
    `https://api.chucknorris.io/jokes/random`
  );
  return data;
};

export const getFavourites = () => {
  const { data }: TApiResponse = useApiGet(
    `http://localhost:8000/api/favourites`
  );
  return data;
};
