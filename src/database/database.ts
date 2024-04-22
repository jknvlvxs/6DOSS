import { Client } from "pg";

export class Database {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: process.env.DB_USER,
      host: "localhost",
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_EXTERNAL_PORT!),
    });
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.end();
  }

  async getClient() {
    return this.client;
  }
}
