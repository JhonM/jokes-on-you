import fs from "fs";

class Repository {
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
}

export default new Repository("datastore.json");
