// routes/fileRoutes.js
const fileController = require('../controllers/fileController');

module.exports = [
  {
    method: 'POST',
    path: '/upload',
    handler: fileController.uploadFile,
    options: {
      payload: {
        output: 'file',
        parse: true,
        allow: 'multipart/form-data'
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: fileController.listFiles
  },
  {
    method: 'DELETE',
    path: '/{id}',
    handler: fileController.deleteFile
  }
];
