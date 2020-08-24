const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

(async () => {
  const db = await sqlite.open({
    filename: './dev.sqlite',
    driver: sqlite3.Database,
  });

  await db.migrate({ force: true });
  const [
    microphones
  ] = await Promise.all([
    db.all('select * from Microphone')
  ]);

  console.log('Microphones: ', JSON.stringify(microphones, null, 4));
})();
