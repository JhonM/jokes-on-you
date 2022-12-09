import React, { useEffect, useState } from "react";
import { getRandomJokes } from "../api";
import type { JokeType } from "../types";
import { JokesList } from "../components/JokesList";

export const Home = () => {
  const jokes: JokeType[] = getRandomJokes();
  const [randomJokes, setRandomJokes] = useState<JokeType[]>();

  useEffect(() => {
    if (jokes) {
      setRandomJokes(jokes);
    }
  }, [jokes]);

  return (
    <div className="container mx-auto">
      <div>
        <strong>Random jokes</strong>
        <JokesList list={randomJokes} />
      </div>
    </div>
  );
};
