import React from 'react';

const CurrentMediaPlayer = (props) => {
  const arr = props.currentMedia.split('.');
  if (arr.indexOf('jpeg') > -1) {
    return (
      <div>
        <img width="600" height="340" src={props.currentMedia} />
      </div>
    );
  }
  return (
    <div>
      <iframe width="600" height="340" src={props.currentMedia} />
    </div>
  );
};

export default CurrentMediaPlayer;
