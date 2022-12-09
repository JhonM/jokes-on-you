import React from "react";
import type { JokeType } from "../../types";

type ListType = {
  list: JokeType[] | undefined;
};

export const JokesList = ({ list }: ListType) => {
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
              <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Add to favourite
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};
