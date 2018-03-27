require('dotenv').config();
const Twitter = require('twitter');
const express = require('express');
const request = require('request');

const app = express();

app.get('/tweets', function(request, response) {
  if (!request.query.screenname) {
    return response.status(422).json({
      error: 'You must provide a screenname query param'
    });
  }

  let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    bearer_token: process.env.BEARER_TOKEN
  });

  client.get('statuses/user_timeline', {
    screen_name: request.query.screenname
  }, function(error, tweets) {
    if (!error) {
      response.json(tweets);
    }
  });
});

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
