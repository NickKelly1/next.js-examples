import * as sqlite from 'sqlite';
import * as sqlite3 from 'sqlite3';

export async function openDb(): Promise<sqlite.Database<sqlite3.Database, sqlite3.Statement>>  {
  const db = await sqlite.open({ filename: './mydb.sqlite', driver: sqlite3.Database });
  return db;
}