import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './styles.css';
import CurrentMediaPlayer from './CurrentMediaPlayer.jsx';
import MediaList from './MediaList.jsx';
import Title from './Title.jsx';
import CurrentTitleImage from './CurrentTitleImage.jsx';
import CurrentDescription from './CurrentDescription.jsx';

class MediaWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      data: [],
      images: [],
      video: [],
      currentMedia: '',
      tag1: '',
      tag2: '',
      tag3: '',
      tag4: '',
      releaseDate: '',
      recentReviews: '',
      allReviews: '',
      publisher: '',
      developer: '',
      description: '',
      gameTitle: '',
    };
    this.getData = this.getData.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.borderSelect = this.borderSelect.bind(this);
    this.autoScroll = this.autoScroll.bind(this);
  }

  componentDidMount() {
    this.setGameID();
  }

  componentDidUpdate(prevProps, prevState) {
    const game = this.state;
    if (prevState.id !== game.id) {
      this.getData();
      this.autoScroll();
    }
  }

  setGameID() {
    const idPath = window.location.pathname;
    const urlID = idPath.match(/\d+/);
    let newID = urlID[0];
    newID = Number.parseInt(newID, 10);
    this.setState({ id: newID });
  }

  getData() {
    const game = this.state;
    axios.get(`/api/mediaData/${game.id}`)
      .then(({ data }) => {
        console.log(data[0], 'data[0]')
        const gameData = data[0];
        const gameImages = data[0].images;
        const gameVideos = data[0].videos;

        const imageMap = gameImages.map((img) => {
          const imgURL = `https://hrr47-sdc-steamy.s3.us-east-2.amazonaws.com/media-window/${img}`;
          const setActive = false;
          const imgObj = {
            image: imgURL,
            isActive: setActive,
          };
          return imgObj;
        });

        const videoMap = gameVideos.map((vid) => {
          const vidURL = `https://www.youtube.com/embed/${vid}`;
          const setActive = false;
          const vidObj = {
            video: vidURL,
            isActive: setActive,
          };
          return vidObj;
        });
        videoMap[0].isActive = true;
        // console.log(videoMap[0].isActive, 'videoMap')
        this.setState({
          images: imageMap,
          //data: data[0],
          video: videoMap,
          tag1: gameData.tags[0],
          tag2: gameData.tags[1],
          tag3: gameData.tags[2],
          tag4: gameData.tags[3],
          releaseDate: gameData.release_date,
          recentReviews: gameData.recent_reviews,
          allReviews: gameData.all_reviews,
          publisher: gameData.publisher,
          developer: gameData.developer,
          description: gameData.description,
          gameTitle: gameData.title,
          currentMedia: videoMap[0].video,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeMedia(media) {
    this.setState({
      currentMedia: media,
    });
  }

  scrollLeft() {
    const current = this.state.currentMedia;
    const arr = current.split('.');
    let currentIndex;
    for (let i = 0; i < this.state.images.length; i += 1) {
      if (current === this.state.images[i].image) {
        currentIndex = i;
      }
    }
    const lastIndex = this.state.images.length - 1;
    if (arr.indexOf('jpeg') > -1) {
      if (currentIndex === 0) {
        this.borderSelect(this.state.video[0].video);
        this.changeMedia(this.state.video[0].video);
      } else {
        this.borderSelect(this.state.images[currentIndex - 1].image);
        this.changeMedia(this.state.images[currentIndex - 1].image);
      }
    } else if (arr.indexOf('jpeg') < 0) {
      this.borderSelect(this.state.images[lastIndex].image);
      this.changeMedia(this.state.images[lastIndex].image);
    }
  }

  scrollRight() {
    const current = this.state.currentMedia;
    const arr = current.split('.');
    let currentIndex;
    for (let i = 0; i < this.state.images.length; i += 1) {
      if (current === this.state.images[i].image) {
        currentIndex = i;
      }
    }
    const lastIndex = this.state.images.length - 1;
    if (arr.indexOf('jpeg') > -1) {
      if (this.state.images[currentIndex].image !== this.state.images[lastIndex].image) {
        this.borderSelect(this.state.images[currentIndex + 1].image);
        this.changeMedia(this.state.images[currentIndex + 1].image);
      } else if (this.state.images[currentIndex].image === this.state.images[this.state.images.length - 1].image) {
        this.borderSelect(this.state.video[0].video);
        this.changeMedia(this.state.video[0].video);
      }
    } else {
      this.borderSelect(this.state.images[0].image);
      this.changeMedia(this.state.images[0].image);
    }
  }

  borderSelect(media) {
    const imageArr = this.state.images.slice();
    const videoArr = this.state.video.slice();
    for (let i = 0; i < imageArr.length; i += 1) {
      if (imageArr[i].isActive === true) {
        imageArr[i].isActive = false;
      } else if (media === imageArr[i].image) {
        imageArr[i].isActive = true;
      } else if (videoArr[0].isActive === true) {
        videoArr[0].isActive = false;
      } else if (media === videoArr[0].video) {
        videoArr[0].isActive = true;
      }
    }
    this.setState({
      images: imageArr,
      video: videoArr,
    });
  }

  autoScroll() {
    return setInterval(() => {
      this.scrollRight();
    }, 5000);
  }

  render() {
    const game = this.state;

    return (
      <div className={styles.body}>
        <Title gameTitle={game.gameTitle} />
        <div className={styles.col_container}>
          <div className={styles.left_col}>
            <div className={styles.main_image}>
              <CurrentMediaPlayer currentMedia={game.currentMedia} />
            </div>
            <div className={styles.grid}>
              <MediaList
                images={game.images}
                video={game.video}
                changeMedia={this.changeMedia.bind(this)}
                borderSelect={this.borderSelect.bind(this)}
              />
              <div className={styles.scroll_row}>
                <div className={styles.scroll_col}>
                  <div className={styles.prev} onClick={this.scrollLeft}>
                    <span />
                  </div>
                </div>
                <div className={styles.scroll_col}>
                  <div className={styles.next} onClick={this.scrollRight}>
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right_col}>
            <CurrentTitleImage images={game.images} />
            <div className={styles.description}>
              <CurrentDescription description={game.description} />
            </div>
            <div className={styles.reviews}>
              <div className={styles.recent}>Recent Reviews:</div>
              <div className={styles.recent_summary}>{game.recentReviews}</div>
            </div>
            <div className={styles.reviews_all}>
              <div className={styles.recent}>All Reviews:</div>
            <div className={styles.recent_summary}>{game.allReviews}</div>
            </div>
            <div className={styles.release_date}>
              <div className={styles.recent}>Release Date:</div>
              <div className={styles.date}>{game.releaseDate}</div>
            </div>
            <div className={styles.reviews}>
              <div className={styles.recent}>Developer:</div>
              <div className={styles.recent_summary}>{game.developer}</div>
            </div>
            <div className={styles.reviews_all}>
              <div className={styles.recent}>Publisher:</div>
              <div className={styles.recent_summary}>{game.publisher}</div>
            </div>
            <div className={styles.reviews}>
              <div className={styles.popular}>Popular user-defined tags for this product:</div>
            </div>
            <div className={styles.row_tags}>
              <div className={styles.tags}>{game.tag1}</div>
              <div className={styles.tags}>{game.tag2}</div>
              <div className={styles.tags}>{game.tag3}</div>
              <div className={styles.tags}>{game.tag4}</div>
              <div className={styles.tags}>+</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MediaWindow;
