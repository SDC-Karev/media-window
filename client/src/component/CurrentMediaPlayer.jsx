import React from "react";


const CurrentMediaPlayer = (props) => {
  var arr = props.currentMedia.split('.');
  if (arr.indexOf('jpeg') > -1) {
    return (
      <div>
      <img width="600" height="337" src={props.currentMedia}/>
    </div>
    )
  } else {
    return (
      <div>
        <iframe width="600" height="337" src={props.currentMedia}></iframe>
      </div>
    )
  }
}


export default CurrentMediaPlayer;