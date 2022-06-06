const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: { type: Number, unique: true },
  full_name: String,
  html_url: String,
  description: String,
  created_at: Date,
  updated_at: Date,
  pushed_at: Date,
  forks_count: Number,
  watchers_count: Number,
  stargazers_count: Number,
  language: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  var added = 0;
  var dupes = 0;
  var updated = 0;

  var promises = data.map(repo => {
    var newRepo = new Repo(repo);
    return Repo.findOne({id: repo.id})
    .then(record => {
      if (record) {
        newRepo._id = record._id;
      }
      return Repo.updateOne({id: repo.id}, newRepo, { upsert: true })
      .then(result => {
        if (result.upserted) {
          added++;
        }
        if (result.nModified) {
          updated++;
        }
        if (!result.nModified && !result.upserted) {
          dupes++;
        }
      })
      .catch(err => {
        console.log('error:', error);
      })
    })
  });

  return new Promise((resolve, reject) => {
    Promise.all(promises)
    .then(() => {
      resolve({added, dupes, updated});
    })
  });


}

let read = (sort, limit, cb) => {
  Repo.find().sort(sort).limit(limit).exec(cb);
}

module.exports.save = save;
module.exports.read = read;
module.exports.count = Repo.count.bind(Repo);