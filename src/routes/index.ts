import { Router } from "express";
import cors from "cors";
import { ErrorStatus } from "../types";
import { requireJsonContent } from "../middleware";
import {
  getRandomJoke,
  getRandomJokes,
  getFavourites,
  addFavourite,
  deleteFavourite,
} from "../controllers/jokes";

const router = Router();
const apiPrefixName = "api";
router.use(cors());

// router.use(express.json({ limit: 100 }));

router.get(`/${apiPrefixName}/random-joke`, getRandomJoke);
router.get(`/${apiPrefixName}/random-jokes`, getRandomJokes);
router.get(`/${apiPrefixName}/favourites`, getFavourites);
router.post(`/${apiPrefixName}/favourites`, requireJsonContent, addFavourite);
router.delete(
  `/${apiPrefixName}/favourite/delete`,
  requireJsonContent,
  deleteFavourite
);

router.get(`/${apiPrefixName}/productswitherror`, () => {
  const err = new Error("processing error ");
  (err as ErrorStatus).statusCode = 400;
  throw err;
});

export default router;
