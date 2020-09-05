/* eslint-disable quote-props */
/* eslint-disable func-names */
/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable prefer-const */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  thresholds: {
    'failed requests': ['rate<0.1'],
    'http_req_duration': ['p(95)<100']
  },
  stages: [
    { duration: '10s', target: 100 }, // get to 100 RPS in 10s
    { duration: '1m', target: 100 }, // hold 100 RPS for 1m
    { duration: '10s', target: 500 }, // move to 500 RPS in 10s
    { duration: '2m', target: 500 }, // hold 500 rps for 2m
    { duration: '10s', target: 1000 }, // move to 1000 RPS in 10s
    { duration: '8m', target: 1000 }, // hold 1000 RPS for 8m
    { duration: '10s', target: 1500 }, // spike to 1500 briefly
    { duration: '10s', target: 1000 },
    { duration: '8m', target: 1000 }, // hold 1000 RPS for 8 min
    { duration: '10s', target: 100 }, // scale down to 100 RPS in 10s
    { duration: '30s', target: 100 }, // hold 100 RPS for 30s
    { duration: '10s', target: 10 },
    { duration: '10s', target: 0 }, // taper to 0 over 20s
  ],
}

export default function() {
  let gameID;
  let weightNum = Math.random();
  if (weightNum < 0.8) {
    gameID = Math.floor(Math.random() * (10000000 - 8000000 + 1)) + 8000000
  } else {
    gameID = Math.floor(Math.random() * (7999999)) + 1
  }
  http.get(`http://localhost:3001/api/mediaData/${gameID}`, {
    tags: { name: 'k6Testing' }
  });

  sleep(1);
}