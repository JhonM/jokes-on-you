import isomorphicFetch from "isomorphic-fetch";
import { useApiGet, TApiResponse } from "../hooks/useApi";
import { JokeType } from "../types";

async function postData(url = "", data = {}) {
  const response = await isomorphicFetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  return response.json();
}

async function deleteData(url: string, data = {}) {
  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  return response.json();
}

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

export const addToFavourites = async (favourite: JokeType) => {
  const data = await postData(
    "http://localhost:8000/api/favourites",
    favourite
  );

  return data;
};

export const deleteFromFavourites = async (id: string) => {
  const data = await deleteData(`http://localhost:8000/api/favourite/delete`, {
    id,
  });

  return data;
};
