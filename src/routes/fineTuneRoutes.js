// routes/fineTuneRoutes.js
const fineTuneController = require('../controllers/fineTuneController');

module.exports = [
  {
    method: 'POST',
    path: '/create',
    handler: fineTuneController.createFineTuneJob
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: fineTuneController.getFineTuneJobStatus
  },
  {
    method: 'GET',
    path: '/wait/{id}',
    handler: fineTuneController.waitForFineTuneCompletion
  }
];
