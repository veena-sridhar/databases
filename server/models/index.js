var db = require('../db');
var mysql = require('mysql');
var utils = require('../utils.js');

//refactor, connecting, qurying, and ending to a helpers

module.exports = {
  messages: {
    get: function (req, res) {
      db.connection.query('SELECT Messages.RoomName, Messages.message, Messages.CreationTime, Users.username FROM Messages INNER JOIN Users ON Messages.id_Users = Users.id', function(err, rows, fields) {
        if (err) {
          throw err;
        }
        var data = rows.reverse();
        utils.sendResponse(res, data);
      });
    }, // a function which produces all the messages
    post: function (req, res) {
      var date = new Date();
      var timeString = '"' + date.getTime() + '"';
      databaseQuery(`INSERT INTO Messages (message, roomName, creationTime, id_Users) 
        VALUES ('${req.body.text}', '${req.body.roomname}', ${timeString}, (SELECT id from users WHERE Username='${req.body.username}'))`)
      return res; //kinda janky b/c at this point the server doesn't know whether the database operation was successful
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (req, res) {
      db.connection.query('', function(err, rows, fields) {
        if (err) {
          throw err;
        }
        var data = rows.reverse();
        utils.sendResponse(res, data);
      });
    }, 
    post: function (req, res) {
      databaseQuery(`INSERT INTO Users (username) VALUES ('${req.body.username}')`)
      return res;
    }
  }
};


function databaseQuery (queryString) {
  // var data;
  console.log(queryString);
  db.connection.query(queryString, function(err, rows, fields) {
    if (err) {
      console.log(err);
    }
    // console.log(rows);
    
    // data = rows;
    // return data;
  });
  // return data;
}

// INSERT INTO TAB_STUDENT(name_student, id_teacher_fk)
// SELECT 'Joe The Student', id_teacher
//   FROM TAB_TEACHER
//  WHERE name_teacher = 'Professor Jack'
//  LIMIT 1