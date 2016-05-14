var db = require('../db');
var mysql = require('mysql');

//refactor, connecting, qurying, and ending to a helpers

module.exports = {
  messages: {
    get: function (req, res) {
      databaseQuery('SELECT Messages.RoomName, Messages.message, Messages.CreationTime, Users.username FROM Messages INNER JOIN Users ON Messages.id_Users = Users.id');
      return res
    }, // a function which produces all the messages
    post: function (req, res) {
      var date = new Date();
      var timeString = '"' + date.getTime() + '"';
      databaseQuery(`INSERT INTO Messages (message, roomName, creationTime, id_Users) 
        VALUES ('${req.body.text}', '${req.body.roomname}', ${timeString}, (SELECT id from users WHERE Username='${req.body.username}'))`)
      return res;
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (req, res) {
      databaseQuery(`INSERT INTO Users (username) VALUES ('${req.body.username}')`)
      return res;
    }
  }
};

function databaseQuery (queryString) {
  var data;
  db.connection.query(queryString, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    console.log(rows);
    data = rows;
  });
  return data;
}

// INSERT INTO TAB_STUDENT(name_student, id_teacher_fk)
// SELECT 'Joe The Student', id_teacher
//   FROM TAB_TEACHER
//  WHERE name_teacher = 'Professor Jack'
//  LIMIT 1