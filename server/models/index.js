var db = require('../db');
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function () {

    }, // a function which produces all the messages
    post: function (req, res) {
      console.log('post req izzzzz: ', req);
      db.connection.connect();

      db.connection.query(`INSERT INTO Messages (message, roomName) VALUES ('${req.body.text}', '${req.body.roomname}')`, function(err, rows, fields) {
        if (err) {
          throw err;
        }
      });

      db.connection.end();
      return res;
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {
    }
  }
};

