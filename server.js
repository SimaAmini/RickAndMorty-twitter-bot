require('dotenv').config()
var fs = require('fs'),
    schedule = require('node-schedule'),
    Twit = require('twit'),
    config = {
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    }
    T = new Twit(config.twitter);
    let data = fs.readFileSync('data.json');
    let list = JSON.parse(data);

    function random_from_array(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    function post(q) {
      const text = `${q.text} ~ ${q.character} #RickAndMorty`
      T.post('statuses/update', { status: text }, function (
        err,
        data,
        response
      ) {
        if (err) {
          j.cancel(true);
          console.log('not ok: ', err);
        } else {
          console.log('ok: ', data);
        }
      });
    }

    const j = schedule.scheduleJob('0 0 * * *', function () {
      post(random_from_array(list));
    });
