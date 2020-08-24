const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function setup() {
  try {
    const db = await sqlite.open({ filename: './mydb.sqlite', driver: sqlite3.Database });
    // TODO: don't force in production...
    await db.migrate({ force: 'last' });
    const [
      people,
      vehicles,
      microphones,
    ] = await Promise.all([
      db.all('SELECT * FROM Person'),
      db.all('SELECT * FROM Vehicle'),
      db.all('SELECT * FROM Microphone'),
    ]);
    console.log('ALL PEOPLE:', JSON.stringify(people, null, 2));
    console.log('ALL VEHICLES:', JSON.stringify(vehicles, null, 2));
    console.log('ALL MICROPHONES:', JSON.stringify(microphones, null, 2));
  } catch (error) {
    console.error('error:', error);
  }
}

console.log('running....');
setup();