const faker = require('faker');
const mongoModel = require('./index');

function generateData() {
  const games = [];
  const videos = ['https://www.youtube.com/embed/JSRtYpNRoN0', 'https://www.youtube.com/embed/X1p-_CNtL9w', 'https://www.youtube.com/embed/TUHJ3ofLDs8', 'https://www.youtube.com/embed/21hG1oZwQjk', 'https://www.youtube.com/embed/RfLPGMOqg98', 'https://www.youtube.com/embed/xXiOtv8I2Jk', 'https://www.youtube.com/embed/xTpr7piQu2M', 'https://www.youtube.com/embed/Jmliox1trPQ', 'https://www.youtube.com/embed/Fmdb-KmlzD8', 'https://www.youtube.com/embed/a3ZGGIdpfEM', 'https://www.youtube.com/embed/EV2J1YPNnjo', 'https://www.youtube.com/embed/2gUtfBmw86Y', 'https://www.youtube.com/embed/q4GdJVvdxss', 'https://www.youtube.com/embed/8pR0o2fGyHg'];
  const random = () => Math.floor(Math.random() * videos.length);
  let imageId = 8;
  for (let id = 1; id <= 100; id += 1) {
    const index = random();
    const title = faker.commerce.productName();
    const description = faker.lorem.paragraph();
    const photoArr = [];
    const videoArr = videos[index];
    if (imageId > 268) {
      imageId = 2;
    }
    let i = 0;
    while (i < 6) {
      const photo = `https://baileymediaplayer.s3-us-west-1.amazonaws.com/images/image${imageId}.jpeg`;
      photoArr.push(photo);
      i += 1;
      imageId += 1;
    }
    games.push({
      id,
      title,
      description,
      photoArr,
      videoArr,
    });
    imageId += 6;
  }
  return games;
}
const seededData = generateData();

mongoModel.save(seededData);
