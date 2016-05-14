var models = require('../models');
var utils = require('../utils.js')

module.exports = {
  messages: {
    get: function (req, res) {
      // console.log(req);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      utils.sendResponse(models.messages.post(req, res), 'Success!');
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

