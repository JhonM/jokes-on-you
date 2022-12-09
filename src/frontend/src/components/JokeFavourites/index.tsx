import React from "react";
import type { JokeType } from "../../types";

type JokeFavouritesType = {
  list: JokeType[] | undefined;
};

export const JokeFavourites = ({ list }: JokeFavouritesType) => {
  if (!list) {
    return <div>Loading</div>;
  }

  return (
    <ul className="space-y-3">
      {list &&
        list.map((favourite) => (
          <li key={favourite.id}>
            {favourite.value}
            <div className="space-x-1">
              <button className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                Remove from favourites
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};
