import express from 'express';
import cors from 'cors';
import { client, fetcher } from 'travis-builds-reporter-core';
import axios from 'axios';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/builds', (req, res) => {
  console.log('Request:', req.body, req.params);
  const body = req.body;
  let { repository } = body;
  if (repository) {
    repository = repository.trim();
    fetcher.fetch(repository, client.create(axios))
      .then((builds) => {
        console.log('builds fetched');
        res.json(builds);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Wrong repository or something else');
      });
  } else {
    console.warn('Missing repository info');
    res.status(500).send('Missing repository info.');
  }
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../../client/build')));
}

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});