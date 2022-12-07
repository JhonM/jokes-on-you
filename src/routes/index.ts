import express, { Response, Request, Router, NextFunction } from "express";
import { ErrorStatus } from "../types";
import { requireJsonContent } from "../middleware";
import jokesController from "../controllers/jokes-controller";

const router = Router();
const apiPrefixName = "api";

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

  response.status(200).json(favourites);
};

router.get("/", (request: Request, response: Response) => {
  const jokes = jokesController();
  response.send(jokes);
});

router.get(`/favourites`, getFavourites);

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
  (request: Request, response: Response) => {
    favourites.push({ ...request.body });

    const favouriteCreationResponse = { productId: 2, result: "success" };
    response.json(favouriteCreationResponse);
  }
);

router.get(`/${apiPrefixName}/productswitherror`, () => {
  let err = new Error("processing error ");
  (err as ErrorStatus).statusCode = 400;
  throw err;
});

export default router;
