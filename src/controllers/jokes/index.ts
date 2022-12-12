import { Response, Request } from "express";
import isomorphicFetch from "isomorphic-fetch";
import favoriteRepo from "../../repository";

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

export const getFavourites = async (_: Request, response: Response) => {
  const data = await favoriteRepo.getAllRecords();

  return response.status(200).json(data);
};

export const addFavourite = async (request: Request, response: Response) => {
  const addedRecord = await favoriteRepo.createNewRecord({
    ...request.body,
  });

  console.log(`Added Record: ${JSON.stringify(addedRecord, null, 4)}`);
  return response.send({ success: true });
};

export const deleteFavourite = async (request: Request, response: Response) => {
  const deleteRecord = await favoriteRepo.deleteNewRecord(request.body.id);

  console.log(`Delete Record: ${JSON.stringify(deleteRecord, null, 4)}`);

  return response.send({ success: true });
};
