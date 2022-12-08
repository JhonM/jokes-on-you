import "./index.css";

import HomeView from "./views/HomeView";
import FavouritesView from "./views/FavouritesView";

type MatchType = {
  route: { path: string; view: typeof HomeView | typeof FavouritesView };
  result: RegExpMatchArray | null;
};

const pathToRegex = (path: string) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match: MatchType | undefined) => {
  if (!match) {
    return;
  }
  const values = match.result?.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values?.[i]];
    })
  );
};

const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: HomeView },
    { path: "/favourites", view: FavouritesView },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  if (document != null) {
    const app = document.querySelector("#app");
    if (app != null) {
      app.innerHTML = await view.getHtml();
    }
  }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event != null && event.target) {
      const element = event.target as any;
      if (element.matches("[data-link]")) {
        event.preventDefault();
        navigateTo((event.target as HTMLAnchorElement).href);
      }
    }
  });

  router();
});
