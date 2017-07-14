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
  var body = req.body;
  var repository = body.repository;

  if (repository) {
    repository = repository.trim();
    _travisBuildsReporterCore.fetcher.fetch(repository, _travisBuildsReporterCore.client.create(_axios2.default)).then(function (builds) {
      return res.json(builds);
    }).catch(function (error) {
      return res.status(500).send('Wrong repository or something else');
    });
  } else {
    res.status(500).send('Missing repository info.');
  }
});

var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../client/build'));
app.use(staticFiles);
app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), function () {
  console.log('Listening on ' + app.get('port'));
});