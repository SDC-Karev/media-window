import React from 'react';
import styles from './styles.css';

const VideoListEntry = (props) => {
  if (props.video.isActive === true) {
    return (
      <div className={styles.col_border}>
        <iframe width="116" height="65" src={props.video.video} onClick={() => props.changeMedia(props.video.video)} />
      </div>
    );
  }
  return (
    <div className={styles.col}>
      <iframe width="116" height="65" src={props.video.video} onClick={() => props.changeMedia(props.video.video)} />
    </div>
  );
};

export default VideoListEntry;
