import express, { Response, Request, Router, NextFunction } from "express";
import isomorphicFetch from "isomorphic-fetch";
import cors from "cors";
import { ErrorStatus } from "../types";
import type { FavouriteType } from "../types/favourites";
import { requireJsonContent } from "../middleware";
import repo from "../repository";
import { getRandomJoke, getRandomJokes } from "../controllers/jokes";

const router = Router();
const apiPrefixName = "api";
router.use(cors());

router.use(express.json({ limit: 100 }));

const favourites: FavouriteType[] = [
  { id: "1", name: "television", price: 112.34, brand: "samsung" },
  { id: "2", name: "washing machine", price: 345.34, brand: "LG" },
  { id: "3", name: "Macbook", price: 3454.34, brand: "Apple" },
];

const getFavourites = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const fav: FavouriteType[] = [
    { id: "1", name: "television", price: 112.34, brand: "samsung" },
    { id: "2", name: "washing machine", price: 345.34, brand: "LG" },
    { id: "3", name: "Macbook", price: 3454.34, brand: "Apple" },
  ];

  return response.status(200).json(fav);
};

router.get(`/${apiPrefixName}/random-joke`, getRandomJoke);
router.get(`/${apiPrefixName}/random-jokes`, getRandomJokes);
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

router.delete(
  `/${apiPrefixName}/favourite/delete`,
  requireJsonContent,
  async (request: Request, response: Response) => {
    const deleteRecord = await repo.deleteNewRecord(request.body.id);

    console.log(`Delete Record: ${JSON.stringify(deleteRecord, null, 4)}`);

    response.send("Information deleted from the datastore");
  }
);

router.get(`/${apiPrefixName}/productswitherror`, () => {
  const err = new Error("processing error ");
  (err as ErrorStatus).statusCode = 400;
  throw err;
});

export default router;
