import React from "react";
import { getRandomJoke, getFavourites } from "./api";

type JokeType = {
  id: string;
  url: string;
  icon_url: string;
  value: string;
};

type FavouriteType = {
  id: string;
  name: string;
  price: number;
  brand: string;
};

export const App = () => {
  const data: JokeType = getRandomJoke();
  const favourites: FavouriteType[] = getFavourites();

  if (!data || !favourites) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <strong>Joke</strong>
      <p>{data.value}</p>
      <div>
        <strong>brand</strong>
        <ul>
          {favourites.map((f) => (
            <li key={f.id}>{f.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
