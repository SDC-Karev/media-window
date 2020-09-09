CREATE TABLE IF NOT EXISTS games (
 id SERIAL,
 images VARCHAR[],
 videos VARCHAR[],
 tags VARCHAR[],
 title VARCHAR(50),
 description VARCHAR(500),
 all_reviews VARCHAR(25),
 recent_reviews VARCHAR(25),
 release_date DATE,
 developer VARCHAR(30),
 publisher VARCHAR(30)
);

ALTER TABLE games ADD CONSTRAINT games_pkey PRIMARY KEY (id);