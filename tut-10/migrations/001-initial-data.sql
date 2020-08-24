-- Up

CREATE TABLE Microphone (
  id INTEGER PRIMARY KEY AUTOINCREMENT
  ,brand TEXT
  ,model TEXT
  ,price DECIMAL(15, 4)
  ,imageUrl TEXT
);

INSERT INTO Microphone
  (brand, model, price, imageUrl)
VALUES
  ('Blue', 'Amber', 99.99, '/microphones/blue-amber.jpg')
  ,('Blue', 'Bluebird SL', 299.99, '/microphones/bluebird.jpg')
  ,('Blue', 'Kiwi', 2000, '/microphones/blue-kiwi.jpg')
  ,('Blue', 'Spark', 399, '/microphones/blue-spark.jpg')
  ,('Blue', 'Yeti', 130, '/microphones/blue-yeti.jpg')
  ,('Rode', 'NT-USB Mini', 100.00, '/microphones/nt-usb-mini.jpg')
  ,('Rode', 'Broadcaster', 350.00, '/microphones/rode-broadcaster.jpg')
  ,('Rode', 'Podcaster', 145, '/microphones/podcaster.jpg')
  ,('Rode', 'Nt1', 230, '/microphones/rode-nt1.jpg')
  ,('Rode', 'Nt1a', 220, '/microphones/rode-nt1a.png')
  ,('Rode', 'NT-USB', 135, '/microphones/rode-ntusb.jpg')
  ,('Rode', 'Podmic', 105, '/microphones/rode-podmic.jpg')
  ,('Rode', 'Procaster', 130, '/microphones/rode-procaster.jpg')
  ,('Samson', 'USB', 179, '/microphones/samson-usb.jpeg')
  ,('Shure', 'Beta 58a', 139, '/microphones/shure-beta-58a.jpg')
  ,('Shure', 'Beta 87a', 280, '/microphones/shure-beta-87a.jpg')
  ,('Shure', 'sm7b', 399, '/microphones/shure-sm7b.jpg')
  ,('Shure', 'Super-55', 200, '/microphones/shure-super55.jpg')
;

-- Down

DROP TABLE IF EXISTS Microphone;

