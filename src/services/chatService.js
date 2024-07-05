// services/chatService.js
const client = require('./openAIClient');

const createChatCompletion = async (message) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
      stream: true,
    });
    return response;
  } catch (error) {
    console.error('Error creating chat completion:', error.message);
    return null;
  }
};

module.exports = { createChatCompletion };