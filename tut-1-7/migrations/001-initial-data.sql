-- Up
CREATE TABLE Person (
  id INTEGER PRIMARY KEY AUTOINCREMENT
  ,name TEXT
  ,email TEXT
  ,password TEXT
);

CREATE TABLE Vehicle (
  id INTEGER PRIMARY KEY AUTOINCREMENT
  ,brand TEXT
  ,model TEXT
  ,ownerId INTEGER REFERENCES Person(id)
);

CREATE TABLE Microphone (
  id INTEGER PRIMARY KEY AUTOINCREMENT
  ,brand TEXT
  ,model TEXT
  ,price DECIMAL(15, 4)
  ,imageUrl TEXT
);

INSERT INTO Person
  (name, email)
VALUES
  ('Bruno', 'bruno@antunes.pt')
  ,('Jack', 'jack@antunes.pt')
;

INSERT INTO Vehicle
  (brand, model, ownerId)
VALUES
  ('Audie', 'R8', 1)
  ,('Mercedes', 'Benz', 2)
  ,('Ford', 'Falcon', 1)
;

-- Down
DROP TABLE IF EXISTS Person;
DROP TABLE IF EXISTS Vehicle;

