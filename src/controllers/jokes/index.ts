import { Response, Request } from "express";
import isomorphicFetch from "isomorphic-fetch";

const randomJokes = async (max: number) => {
  const buildFetch = [max].reduce((acc, amount) => {
    let current = 0;
    while (current < amount) {
      const fetchUrl = isomorphicFetch(
        "https://api.chucknorris.io/jokes/random"
      ).then((response) => response.json());
      acc.push(fetchUrl);
      current++;
    }

    return acc;
  }, [] as Promise<any>[]);

  const data = Promise.all(buildFetch);

  return data.then((res) => res);
};

export const getRandomJoke = async (_: Request, response: Response) => {
  const data = await isomorphicFetch(
    "https://api.chucknorris.io/jokes/random"
  ).then((res) => res.json());

  return response.status(200).json(data);
};

export const getRandomJokes = async (_: Request, response: Response) => {
  const data = await randomJokes(10);

  return response.status(200).json(data);
};
