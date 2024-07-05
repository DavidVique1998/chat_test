// routes/chatRoutes.js
const chatController = require('../controllers/chatController');

module.exports = [
  {
    method: 'POST',
    path: '/completion',
    handler: chatController.createChatCompletion
  }
];
