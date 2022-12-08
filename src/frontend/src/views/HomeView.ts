import AbstractView from "./AbstractView";

export default class HomeView extends AbstractView {
  constructor(params: any) {
    super(params);
    this.setTitle("Joke's on you!! | Home view");
  }

  async getHtml() {
    return `
      <h1>Home view</h1>
      <p>Hello</p>
    `;
  }
}
