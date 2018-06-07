'use strict';

const path = "/text/analytics/v2.0/sentiment";
const callTextAnalytics = require('./text_analytics');

function formatText(text) {
  const documents = {};
  documents.documents = [];
  documents.documents[0] = {};
  documents.documents[0].id = "1";
  documents.documents[0].text = text;

  return JSON.stringify(documents);
}

module.exports = function(url, accessKey, text) {
  const documents = formatText(text);

  return callTextAnalytics(url, path, accessKey, documents);
}