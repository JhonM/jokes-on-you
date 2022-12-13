import fs from "fs";
import type { JokeType } from "../types/favourites";

class FavouriteRepo {
  filename: string;

  constructor(filename: string) {
    if (!filename) {
      throw new Error("Filename is required!!");
    }

    this.filename = filename;

    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async createNewRecord(attributes: any) {
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });

    const objRecord = JSON.parse(jsonRecords);

    objRecord.push(attributes);

    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(objRecord, null, 2)
    );

    return attributes;
  }

  async deleteNewRecord(id: string) {
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });

    const favourites: JokeType[] = JSON.parse(jsonRecords);
    const removeFavourite = favourites.filter(
      (favourite) => favourite.id !== id
    );

    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(removeFavourite, null, 2)
    );

    return id;
  }

  async getAllRecords() {
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });

    return JSON.parse(jsonRecords);
  }
}

export default new FavouriteRepo("datastore.json");
