export default abstract class AbstractView {
  params: any;

  constructor(params: any) {
    this.params = params;
  }

  setTitle(title: string) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }
}
