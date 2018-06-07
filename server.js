'use strict';

const restify = require('restify');
const builder = require('botbuilder');
const sentimentAnalysis = require('./sentiment');

const sentimentAPIURL = process.env.TEXTANALYTICSAPIURL;
const sentimentAccessKey = process.env.TEXTANALYTICSAPIKEY;

// Setup Restify Server
const server = restify.createServer();

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFTAPPID,
    appPassword: process.env.MICROSOFTAPPPWD
});

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
const bot = new builder.UniversalBot(connector, function (session) {
    const text = session.message.text;
    
    sentimentAnalysis(sentimentAPIURL, sentimentAccessKey, text)
    .then(function(response){
        session.send("You said: %s", text);
        session.send("Sentiment score: %s", response.score);
      })
      .catch(function(err){
        console.log(err)
      });    
});

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());