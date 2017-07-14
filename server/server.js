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
  const body = req.body;
  let { repository } = body;
  if (repository) {
    repository = repository.trim();
    fetcher.fetch(repository, client.create(axios))
      .then(builds => res.json(builds))
      .catch(error => res.status(500).send('Wrong repository or something else'));
  } else {
    res.status(500).send('Missing repository info.');
  }
});

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);
app.use('/*', staticFiles);

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});
