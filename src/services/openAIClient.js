// services/openAIClient.js
const { OpenAI } = require("openai");
require('dotenv').config();

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
  project: process.env.OPENAI_PROJECT_ID,
};

const client = new OpenAI(configuration);

module.exports = client;
