import { connect } from "http2";
import sqlite3 from "sqlite3";

export class Connector {
  SQLite3 = sqlite3.verbose();
  db = new this.SQLite3.Database("locations.db");

  query = (command: string, methods: "all" | "run") => {
    return new Promise((resolve, reject) => {
      this.db[methods](command, (error: Error,response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  };
  addLocation = async (name: string, x: number, y: number, z: number) => {
    await this.query(
      `INSERT INTO locations VALUES ("${name}", "${x}","${y}","${z}")`,
      "run"
    );
  };
  getLocations = async () => {
    const existingLocations = await this.query('SELECT rowid as id, name, x, y, z FROM locations','all');
    return JSON.stringify(existingLocations) as string;
  };

 serializeDb = () => this.db.serialize(async () => {
    await this.query(
      "CREATE TABLE IF NOT EXISTS locations (name text, x integer, y integer, z integer)",
      "run"
    );
    return this.getLocations();
  });
}

const conn = new Connector();

conn.serializeDb();