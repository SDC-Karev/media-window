# Media Window

> A Purchase Options component for our Front End Design of Steam

## Related Projects

  - https://github.com/hrr47-FEC-Bailey/media-window
  - https://github.com/hrr47-FEC-Bailey/reviews
  - https://github.com/hrr47-FEC-Bailey/similar-games
  - httos://github.com/hrr47-FEC-Bailey/game-sidebar

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

`PUT /api/mediaData/:id`
> Updates game based on ID in URL. Title, description, an array of videos locations (by URL), and an array of photos locations (by URL) are all able to be updated. Only items sent in the req.body will be updated.

`DELETE /api/mediaData/:id`
> Deletes game based on ID in URL.

`POST /api/mediaData/:id`
> Adds a new game to the database with the ID equal to the ID in the URL. Available data fields to be saved are : title, description, an array of video locations (by URL), and an array of photo locations (by URL).

## Requirements

MongoDB, Mongoose, Express, React, Node, Webpack, and various others.
See full list of dependencies in located in package.json.

## Development

### Installing Dependencies

Ensure you have MongoDB installed and setup for componenet to work; if your server is crashing immediately on launch, that is a good hint that your MongoDB is not installed/setup/running.

Check out [https://www.mongodb.com] for more information on getting started and/or troubleshooting.

From within the root directory:

```sh
npm install -g webpack
npm install
npm run seed
npm run react-dev
npm start
```