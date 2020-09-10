import React from 'react';
import styles from './styles.css';

const Title = ({gameTitle}) => (
  <div className={styles.game_title}>
    <span>{ gameTitle }</span>
  </div>
);

export default Title;
