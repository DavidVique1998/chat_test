const OpenAI = require("openai");

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
  project: process.env.OPENAI_PROJECT_ID,
};

const client = new OpenAI(configuration);

const createChatCompletion = async (message) => {
  return client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
    stream: true,
  });
};

module.exports = { createChatCompletion };