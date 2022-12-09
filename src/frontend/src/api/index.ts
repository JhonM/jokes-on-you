import { useApiGet, TApiResponse } from "../hooks/useApi";

export const getRandomJoke = () => {
  const { data }: TApiResponse = useApiGet(
    "http://localhost:8000/api/random-joke"
  );
  return data;
};

export const getRandomJokes = () => {
  const { data }: TApiResponse = useApiGet(
    "http://localhost:8000/api/random-jokes"
  );
  return data;
};

export const getFavourites = () => {
  const { data }: TApiResponse = useApiGet(
    "http://localhost:8000/api/favourites"
  );
  return data;
};

export const removeJoke = (id: string) => {
  const { data }: TApiResponse = useApiGet(
    `http://localhost:8000/api/favourite/delete/${id}`
  );
  return data;
};
