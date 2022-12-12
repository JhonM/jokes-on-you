import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-simple-toasts";
import { getFavourites, deleteFromFavourites } from "../api";
import type { JokeType } from "../types";
import { JokeFavourites } from "../components/JokeFavourites";

export const Favourites = () => {
  const [favourites, setFavourites] = useState<JokeType[]>();
  const data: JokeType[] = getFavourites();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setFavourites(data);
    }
  }, [data, setFavourites]);

  const handleRemoveFavourite = useCallback(
    (id: string) => {
      deleteFromFavourites(id)
        .then(() => navigate(0))
        .finally(() => toast("Removed from favourites"));
    },
    [setFavourites]
  );

  return (
    <div className="container mx-auto">
      <div>
        <strong>Your favourite jokes</strong>
        <JokeFavourites
          list={favourites}
          removeFavourite={(id) => handleRemoveFavourite(id)}
        />
      </div>
      <div className="mt-4">
        <Link className="font-bold" to="/">
          Go to random jokes
        </Link>
      </div>
    </div>
  );
};
