import AbstractView from "./AbstractView";

export default class FavouritesView extends AbstractView {
  constructor(params: any) {
    super(params);
    this.setTitle("Joke's on you!! | Favourites view");
  }

  async getHtml() {
    return `
      <h1>Favourites view</h1>
      <p>Hello</p>
    `;
  }
}
