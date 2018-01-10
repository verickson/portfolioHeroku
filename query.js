var pg = require('pg');
var parseConnectionString = require('pg-connection-string');

//connecting to the db local
const connectionString = 'postgres://root:root@localhost/portfolioblog';

//connecting to the db heroku
// const connectionString = 'postgres://wapqhgotqzzzxv:84a22602458726af2d0cab7200a588942e51b8217bbf99e0d9b9405d3f7bd35e@ec2-107-22-183-40.compute-1.amazonaws.com:5432/d2mmp2pksbnfa9';

const pool = new pg.Pool(typeof connectionString === 'string' ? parseConnectionString.parse(connectionString) : connectionString);

module.exports = function(queryString, queryParameters, onComplete) {

 if (typeof queryParameters == 'function') {
   onComplete = queryParameters;
   queryParameters = [];
 }

 pool.connect(function(err, client, done) {
   if (err) {
     console.log(`error: connection to database failed. connection string: "${connectionString}" ${err}`);
     if (client) {
       done(client);
     }

     if (onComplete) {
       onComplete(err);
     }
     return;
   }
   client.query(queryString, queryParameters, function(err, result, pool) {
     if (err) {
       done(client);
       console.log(`error: query failed: "${queryString}", "${queryParameters}", ${err}`);
     }
     else {
       done();
     }

     if (onComplete) {
       onComplete(err, result);
     }
   });
 });
 //pool.end();
};
