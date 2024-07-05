const { createChatCompletion } = require('../services/openai');

module.exports = {
  method: "POST",
  path: "/chat",
  handler: async (request, h) => {
    const { message } = request.payload;
    try {
      const response = h.response();
      response.type("application/json");
      response.header("Transfer-Encoding", "chunked");

      const completion = await createChatCompletion(message);

      completion.on("data", (chunk) => {
        const content = chunk.choices[0].delta.content;
        if (content) {
          response.write(JSON.stringify({ content }));
        }
      });

      completion.on("end", () => {
        response.end();
      });

      completion.on("error", (error) => {
        console.error("Error during streaming:", error);
        response.write(JSON.stringify({ error: error.message }));
        response.end();
      });

      return response;
    } catch (error) {
      console.error(error);
      return h.response("Error occurred").code(500);
    }
  },
};
