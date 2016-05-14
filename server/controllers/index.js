var models = require('../models');
var utils = require('../utils.js')

module.exports = {
  messages: {
    get: function (req, res) {
      utils.sendResponse(models.messages.get(req, res), 'Success!');
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      utils.sendResponse(models.messages.post(req, res), 'Success!'); //should be doing this asynchronously: the database might hang!
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      utils.sendResponse(models.users.get(req, res), 'Success!');
    },
    post: function (req, res) {
      utils.sendResponse(models.users.post(req, res), 'Success!');
    }
  }
};

