import React, { useEffect, useState } from "react";
import { getRandomJokes } from "./api";
import type { JokeType, FavouriteType } from "./types";
import { JokesList } from "./components/JokesList";

export const App = () => {
  const jokes: JokeType[] = getRandomJokes();
  const [randomJokes, setRandomJokes] = useState<JokeType[]>();

  useEffect(() => {
    if (jokes) {
      setRandomJokes(jokes);
    }
  }, [jokes]);

  // const data: JokeType = getRandomJoke();
  // const favourites: FavouriteType[] = getFavourites();

  // if (!data || !favourites) {
  //   return <div>Loading</div>;
  // }

  return (
    <div className="container mx-auto">
      {/* <strong>Joke</strong> */}
      {/* <p>{data.value}</p> */}
      <div>
        <strong>Random jokes</strong>
        <JokesList list={randomJokes} />
      </div>
    </div>
  );
};
