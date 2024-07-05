// index.js
const Hapi = require('@hapi/hapi');
const fileRoutes = require('./routes/fileRoutes');
const fineTuneRoutes = require('./routes/fineTuneRoutes');
const chatRoutes = require('./routes/chatRoutes');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
  });

  server.route(fileRoutes);
  server.route(fineTuneRoutes);
  server.route(chatRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();