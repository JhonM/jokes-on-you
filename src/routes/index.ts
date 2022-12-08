import express, { Response, Request, Router, NextFunction } from "express";
import isomorphicFetch from "isomorphic-fetch";
import cors from "cors";
import { ErrorStatus } from "../types";
import { requireJsonContent } from "../middleware";
import repo from "../repository";

const router = Router();
const apiPrefixName = "api";
router.use(cors());

router.use(express.json({ limit: 100 }));

type Favourite = {
  id: string;
  name: string;
  price: number;
  brand: string;
};

let favourites: Favourite[] = [
  { id: "1", name: "television", price: 112.34, brand: "samsung" },
  { id: "2", name: "washing machine", price: 345.34, brand: "LG" },
  { id: "3", name: "Macbook", price: 3454.34, brand: "Apple" },
];

const getFavourites = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let favourites: Favourite[] = [
    { id: "1", name: "television", price: 112.34, brand: "samsung" },
    { id: "2", name: "washing machine", price: 345.34, brand: "LG" },
    { id: "3", name: "Macbook", price: 3454.34, brand: "Apple" },
  ];

  return response.status(200).json(favourites);
};

const getRandomJokes = async (amount: number) => {
  const buildFetch = [amount].reduce((acc, amount) => {
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

router.get(
  `/${apiPrefixName}/random-joke`,
  async (_: Request, response: Response) => {
    const data = await isomorphicFetch(
      "https://api.chucknorris.io/jokes/random"
    ).then((response) => response.json());

    return response.status(200).json(data);
  }
);

router.get(
  `/${apiPrefixName}/random-jokes`,
  async (_: Request, response: Response) => {
    const data = await getRandomJokes(10);

    return response.status(200).json(data);
  }
);

router.get(`/${apiPrefixName}/favourites`, getFavourites);

router.get(
  `/${apiPrefixName}/favourite/:id`,
  (request: Request, response: Response) => {
    const favId = request.params.id;

    const favouritesFiltered = favourites.filter(
      (favourite) => favourite.id === favId
    );

    response.json(favouritesFiltered);
  }
);

router.post(
  `/${apiPrefixName}/favourites`,
  requireJsonContent,
  async (request: Request, response: Response) => {
    const addedRecord = await repo.createNewRecord({ ...request.body });

    console.log(`Added Record: ${JSON.stringify(addedRecord, null, 4)}`);

    response.send("Information added to the datastore");
  }
);

router.get(`/${apiPrefixName}/productswitherror`, () => {
  let err = new Error("processing error ");
  (err as ErrorStatus).statusCode = 400;
  throw err;
});

export default router;
