'use strict';
const https = require('https');

module.exports = function(url, path, accessKey, body){
  return new Promise(function(resolve, reject){
    let response = [];

    const requestOptions = {
      method : 'POST',
      hostname : url,
      path: path,
      headers : {
          'Ocp-Apim-Subscription-Key' : accessKey,
      }
    };

    const req = https.request(requestOptions, function(res){
      res.on('data', function(data){
        response.push(data);
      });
  
      res.on('end', function(){
        response = response.join("");
        response = JSON.parse(response);
        
        resolve(response.documents[0]);
      });

      res.on('error', function(err){
        reject(err);
      });
    });
    
    req.write(body)
    req.end();
  });
}