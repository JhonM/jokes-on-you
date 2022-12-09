import React, { useEffect, useState } from "react";
import { getFavourites } from "../api";
import type { JokeType } from "../types";
import { JokeFavourites } from "../components/JokeFavourites";

export const Favourites = () => {
  const favourites: JokeType[] = getFavourites();

  return (
    <div className="container mx-auto">
      <div>
        <strong>Your favourite jokes</strong>
        <JokeFavourites list={favourites} />
      </div>
    </div>
  );
};
