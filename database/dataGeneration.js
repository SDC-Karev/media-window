/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');
const youtubeURL = require('./youtube');
const constants = require('./constants');

faker.seed(3604035591);
faker.local = 'en_US';

const generateImages = () => {
  let numOfImages = faker.random.number({ min: 6, max: 20 });
  const images = [];
  while (numOfImages > 0) {
    const s3File = faker.random.number({ min: 1, max: 1000 });
    const imageName = `image${s3File}.jpg`;
    images.push(imageName);
    numOfImages -= 1;
  }
  return images;
};

const generateVideos = () => {
  let numOfVideos = faker.random.number({ min: 1, max: 5 });
  const videos = [];
  while (numOfVideos > 0) {
    const url = faker.random.arrayElement(youtubeURL);
    videos.push(url);
    numOfVideos -= 1;
  }
  return videos;
};

const generateTags = () => {
  let numOfTags = 4;
  const tags = [];
  while (numOfTags > 0) {
    const tempTags = faker.random.arrayElement(constants.allTags);
    tags.push(tempTags);
    numOfTags -= 1;
  }
  return tags;
};

const reviews = [
  'Overhwelmingly Positive',
  'Very Positive',
  'Positive',
  'Mostly Positive',
  'Mixed',
  'Mostly Negative',
  'Negative',
  'Very Negative',
  'Overwhelmingly Negative',
];

const writeGameRecords = fs.createWriteStream('gameData.csv');
writeGameRecords.write('images,videos,tags,name,description,all_reviews,recent_reviews,release_date,developer,publisher\n', 'utf8');

let i = 1000;

function write(callback) {
  let emptyRAM = true;
  while (i > 0 && emptyRAM) {
    if (i % 250 === 0) {
      console.log(i);
    }
    i -= 1;
    const images = generateImages();
    const videos = generateVideos();
    const tags = generateTags();
    const gameTitle = faker.commerce.productName();
    const description = faker.lorem.paragraph();
    const recentReviews = faker.random.arrayElement(reviews);
    const allReviews = faker.random.arrayElement(reviews);
    const releaseDate = faker.date.past(10);
    const developer = faker.hacker.verb();
    const publisher = faker.hacker.verb();
    const primaryRecord = `"${images}","${videos}","${tags}",${gameTitle},${description},${recentReviews},${allReviews},${releaseDate},${developer},${publisher}\n`;

    if (i === 0) {
      writeGameRecords.write(primaryRecord, 'utf8', callback);
    } else {
      emptyRAM = writeGameRecords.write(primaryRecord, 'utf8');
    }
  }
  if (i > 0) {
    writeGameRecords.once('drain', write);
  }
}

write(() => {
  console.log('Data has been generated');
  writeGameRecords.end();
});
