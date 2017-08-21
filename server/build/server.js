'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _travisBuildsReporterCore = require('travis-builds-reporter-core');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pathFinder(currentDir) {
  (0, _fs.exists)(currentDir + '/Procfile', function (exists) {
    if (exists) {
      return main(currentDir);
    } else {
      return pathFinder(_path2.default.join(currentDir, '/', '..'));
    }
  });
}

function main(rootProjectDir) {
  var backendPackageJson = require(rootProjectDir + '/server/package.json');
  var frontendPackageJson = require(rootProjectDir + '/client/package.json');
  var rootPackageJson = require(rootProjectDir + '/package.json');

  function fetchBuilds(requestBody, response) {
    var repository = requestBody.repository;

    if (repository) {
      repository = repository.trim();
      _travisBuildsReporterCore.fetcher.fetch(repository, _travisBuildsReporterCore.client.create(_axios2.default)).then(function (builds) {
        console.log('builds fetched');
        response.json(builds);
      }).catch(function (error) {
        console.error(error);
        response.status(500).send('Wrong repository or something else');
      });
    } else {
      console.warn('Missing repository info');
      response.status(500).send('Missing repository info.');
    }
  }

  var app = (0, _express2.default)();
  app.use(_bodyParser2.default.json());
  app.use((0, _cors2.default)());
  app.post('/builds', function (req, res) {
    console.log('Request:', req.body, req.params);
    fetchBuilds(req.body, res);
  });

  app.get('/versions', function (req, res) {
    console.log('Request for versions');
    res.send({
      backendVersion: backendPackageJson.version,
      frontendVersion: frontendPackageJson.version,
      rootVersion: rootPackageJson.version,
      coreVersion: backendPackageJson.dependencies['travis-builds-reporter-core'],
      utilsVersion: frontendPackageJson.dependencies['travis-builds-reporter-utils'] || 'latest'
    });
  });

  // Express only serves static assets in production
  if (process.env.NODE_ENV === "production") {
    app.use(_express2.default.static(_path2.default.join(rootProjectDir, 'client/build')));
    console.log('Serving static bundle to /');
  }

  app.set('port', process.env.PORT || 3001);

  app.listen(app.get('port'), function () {
    console.log('Listening on ' + app.get('port'));
  });
}

pathFinder(__dirname);