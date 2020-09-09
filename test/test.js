const { expect } = require('chai');
const axios = require('axios');

describe('API calls', () => {
  it('should return media data for a game when ID is passed in', (done) => {
    axios.get('http://localhost:3001/api/mediaData/2')
      .then((res) => {
        expect(res).to.exist;
        expect(res.data).to.exist;
        expect(res.data.title).to.exist;
        expect(res.data.videoArr).to.exist;
        expect(res.data.photoArr).to.exist;
        expect(res.data.description).to.exist;
        done();
      });
    // .catch((err) => {
    //   expect(err).to.not.exist;
    // });
  });
});
