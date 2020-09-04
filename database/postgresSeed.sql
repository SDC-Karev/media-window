DELETE FROM games;

COPY games(images, videos, tags, name,description, all_reviews, recent_reviews,release_date, developer, publisher)
  FROM '/home/ryan/Documents/hack-reactor/system-design-capstone/media-window/gameData.csv'
  DELIMITER ',' CSV HEADER;