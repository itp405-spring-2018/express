require('dotenv').config();
const express = require('express');
const request = require('request');

const app = express();
const credentials = `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`;
const credentialsBase64Encoded = new Buffer(credentials).toString('base64');

app.get('/tweets', function(req, resp) {
  if (!req.query.q) {
    resp.status(422).json({
      error: 'You must provide the "q" query string'
    });
  } else {
    request({
      url: 'https://api.twitter.com/oauth2/token',
      method:'POST',
      headers: {
        'Authorization': `Basic ${credentialsBase64Encoded}`,
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: 'grant_type=client_credentials'
    }, function(err, response, body) {
      let token = JSON.parse(body).access_token;
      request({
        url: `https://api.twitter.com/1.1/search/tweets.json?q=${req.query.q}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }, function(err, response, body) {
        resp.json(JSON.parse(body));
      });
    });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
