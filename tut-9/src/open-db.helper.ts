import * as sqlite from 'sqlite';
import * as sqlite3 from 'sqlite3';

export async function openDB(): Promise<sqlite.Database<sqlite3.Database, sqlite3.Statement>> {
  const db = await sqlite.open({
    filename: './dev.sqlite',
    driver: sqlite3.Database,
  });
  return db;
}