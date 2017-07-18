import express from 'express';
import cors from 'cors';
import { client, fetcher } from 'travis-builds-reporter-core';
import axios from 'axios';
import bodyParser from 'body-parser';
import path from 'path';

const backendPackageJson = require('./package.json');
const frontendPackageJson = require('../client/package.json');
const rootPackageJson = require('../package.json');

function fetchBuilds(requestBody, response) {
  let { repository } = requestBody;
  if (repository) {
    repository = repository.trim();
    fetcher.fetch(repository, client.create(axios))
      .then((builds) => {
        console.log('builds fetched');
        response.json(builds);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send('Wrong repository or something else');
      });
  } else {
    console.warn('Missing repository info');
    response.status(500).send('Missing repository info.');
  }
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/builds', (req, res) => {
  console.log('Request:', req.body, req.params);
  fetchBuilds(req.body, res);
});

app.get('/versions', (req, res) => {
  console.log('Request for versions');
  res.send({
    backendVersion: backendPackageJson.version,
    frontendVersion: frontendPackageJson.version,
    rootVersion: rootPackageJson.version,
    coreVersion: backendPackageJson.dependencies['travis-builds-reporter-core'],
    utilsVersion: frontendPackageJson.dependencies['travis-builds-reporter-utils'] || 'latest',
  });
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../../client/build')), {
    etag: false,
  });
}

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});
