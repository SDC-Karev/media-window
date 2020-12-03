# Media Window

> A media and product information service for our app Arcadia

## Related Projects

  - https://github.com/SDC-Karev/reviews
  - https://github.com/SDC-Karev/similar-games
  - httos://github.com/SDC-Karev/purchase-options-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Start the server via
```npm start```
> Start all other components & proxy. The same way

## CRUD API Endpoints

`GET /api/mediaData/:id`
> Gets all data for the component based on the ID in the URL.

## Requirements

PostgreSQL, Express, React, Node, Webpack, and various others.
See full list of dependencies in located in package.json.

## Development

### Installing Dependencies

`npm install`

### Setup Dependencies

#### Create .env file in root project directory

```
# Remove/comment out this line for production
  NODE_ENV=development

# Update this if you want to change your Express port
  SERVER_PORT=3001

# Insert your Postgres location
  DB_HOST=localhost 
  
# Insert your Postgres port  
  DB_PORT=5432

# Insert your Postgres password 
  DB_PASSWORD=supersecretpassword
  
# Insert your Postgres username
  DB_USER=yourUsernameHere
  
# Insert your database name
  DB_NAME=media-window
```

#### Images

Data generation requires 1000 images. Change this to a more reasonable number on line 14 of `database/dataGeneration.js` by reducing max to the number of images you are using. When saving images, use the following name formatting: image[number].jpg where [number] = a sequentially increasing number beginning at 1. ex: image1.jpg, image2.jpg, etc.

Update line 70 of ```media-window/client/src/component/MediaWindow.jsx``` with your images location.

#### Generate data

From within the root directory: `npm run generate`

This will run `database/dataGeneration.js` and save the data into a CSV file in the project root directory.

#### Seed database

Ensure you have PostgreSQL installed and setup for componenet to work; if your server is crashing immediately on launch, that is a good hint that PG is not installed/setup/running.

Update line 4 of `database/postgresSeed.sql` to point to the full path of the CSV created in the previous setup if you want to use this script to seed the database.

From the project root directory: `psql YOUR_USERNAME -h YOUR_PG_HOST_IP (127.0.0.1 for localhost) -d SOME_DATABASE -f database/postgresSeed.sql`

#### Start webpack

Run webpack in production mode
`npm run build` 

Run webpack once in dev mode. If you make any changes, you will need to run this again to have webpack rebuild with your changes.
`npm run build-dev`

Set webpack to watch in dev mode to autobuild on save.
`npm run react-dev`

#### Start server

Runs node via nodemon
`npm start`
