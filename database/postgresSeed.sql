DELETE FROM games;

COPY games(images, videos, tags, name,description, all_reviews, recent_reviews,release_date, developer, publisher)
  FROM 'FULL_PATH_TO_PROJECT_ROOT_DIR/media-window/gameData.csv' /* ex: 'home/ryan/Documents/media-window/gameData.csv' */
  DELIMITER ',' CSV HEADER;
