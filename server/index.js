const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const github = require('../helpers/github');
const db = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body.term)
  .then(githubRes => {
    db.save(githubRes.data)
    .then(result => {
      //console.log(`*** repos saved: ${result.saves.length} - dupes/errors: ${result.errors.length} ***`);
      //res.sendStatus(201);
      console.log(result);
      res.json(result);
    }).catch(err => {
      console.log('db error', err);
      res.sendStatus(500);
    });
  }).catch(err => {
    console.log('github error')}
    );
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.read({stargazers_count: -1}, 25, (err, repos) => {
    if (err) {
      res.sendStatus(500);
    } else {
      db.count({}, (err, count) => {
        if (err) {
          res.sendStatus(500);
        } else {
          //console.log(repos);
          res.json({count, top: repos});
        }
      })
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

