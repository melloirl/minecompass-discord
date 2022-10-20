import sqlite3 from "sqlite3";
export class Connector {
    SQLite3 = sqlite3.verbose();
    db = new this.SQLite3.Database("locations.db");
    query = (command, methods) => {
        return new Promise((resolve, reject) => {
            this.db[methods](command, (error, response) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            });
        });
    };
    addLocation = async (name, x, y, z) => {
        await this.query(`INSERT INTO locations VALUES ("${name}", "${x}","${y}","${z}")`, "run");
    };
    getLocations = async () => {
        const existingLocations = await this.query('SELECT rowid as id, name, x, y, z FROM locations', 'all');
        return JSON.stringify(existingLocations);
    };
    serializeDb = () => this.db.serialize(async () => {
        await this.query("CREATE TABLE IF NOT EXISTS locations (name text, x integer, y integer, z integer)", "run");
        return this.getLocations();
    });
}
const conn = new Connector();
conn.serializeDb();
//# sourceMappingURL=db.js.map