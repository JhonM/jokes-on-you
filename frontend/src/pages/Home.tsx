import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-simple-toasts";
import { getRandomJokes, addToFavourites } from "../api";
import type { JokeType } from "../types";
import { JokesList } from "../components/JokesList";

export const Home = () => {
  const jokes: JokeType[] = getRandomJokes();
  const [randomJokes, setRandomJokes] = useState<JokeType[]>();

  useEffect(() => {
    if (jokes) {
      setRandomJokes(jokes);
    }
  }, [jokes, setRandomJokes]);

  const handleFavourite = (favourite: JokeType) => {
    addToFavourites(favourite).finally(() => toast("Added to favourites"));
  };

  return (
    <div className="container mx-auto">
      <div>
        <strong>Random jokes</strong>
        <JokesList
          list={randomJokes}
          addFavourite={(favourite) => handleFavourite(favourite)}
        />
      </div>
      <div className="mt-4">
        <Link className="font-bold" to="/favourites">
          Go to favourites
        </Link>
      </div>
    </div>
  );
};
