const fs = require('fs');
const faker = require('faker');
const youtubeURL = require('./youtube');
const gameTags = require('./gameTags');
const reviews = require('./reviews');
const companyHelper = require('./company');

faker.seed(3604035591);
faker.local = 'en_US';

const generateImages = () => {
  let numOfImages = faker.random.number({ min: 6, max: 20 });
  const images = [];
  while (numOfImages > 0) {
    const s3File = faker.random.number({ min: 1, max: 1000 });
    const url = `https://hrr47-sdc-steamy.s3.us-east-2.amazonaws.com/media-window/image${s3File}.jpg`;
    images.push(url);
    numOfImages -= 1;
  }
  return images;
};

const generateVideos = () => {
  let numOfVideos = faker.random.number({ min: 1, max: 6 });
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
    const tempTags = faker.random.arrayElement(gameTags);
    tags.push(tempTags);
    numOfTags -= 1;
  }
  return tags;
};

const headers = ['images', 'videos', 'tags', 'name', 'description', 'all_reviews', 'recent_reviews', 'release_date', 'developer', 'publisher'];

const primaryRecord = () => (`"${generateImages()}","${generateVideos()}","${generateTags()}","${faker.commerce.productName()}","${faker.lorem.paragraph()}","${faker.random.arrayElement(reviews)}","${faker.random.arrayElement(reviews)}","${faker.date.past(10)}","${companyHelper.generateCompanyName()}","${companyHelper.generateCompanyName()}"`);

const createRecords = () => {
  const saveCSV = fs.createWriteStream('data.csv');
  const i = 0;

  const generateCSV = () => {
    while (i < 10000000) {
      const newRecord = primaryRecord();
      if (i === 10000000) {
        saveCSV.write(newRecord, 'utf-8', () => {
          saveCSV.end();
        });
      } else {
        saveCSV.write(newRecord, 'utf-8');
      }
    }
  };
  saveCSV.write(JSON.stringify(headers).slice(1, JSON.stringify(headers).length - 1));
  generateCSV();
};

createRecords();
