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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());
app.post('/builds', function (req, res) {
  console.log('Request:', req.body, req.params);
  var body = req.body;
  var repository = body.repository;

  if (repository) {
    repository = repository.trim();
    _travisBuildsReporterCore.fetcher.fetch(repository, _travisBuildsReporterCore.client.create(_axios2.default)).then(function (builds) {
      console.log('builds fetched');
      res.json(builds);
    }).catch(function (error) {
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
  app.use(_express2.default.static(_path2.default.join(__dirname, '../../client/build')));
}

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), function () {
  console.log('Listening on ' + app.get('port'));
});