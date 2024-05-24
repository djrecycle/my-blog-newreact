import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getGroqChatCompletion = async (req) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: req.body.content,
      },
    ],
    model: "llama3-8b-8192",
  });
};

const generateAiContent = async (req, res, next) => {
  try {
    const chatCompletion = await getGroqChatCompletion(req); // Pastikan untuk mengirimkan `req` ke fungsi ini
    // Print the completion returned by the LLM.
    process.stdout.write(chatCompletion.choices[0]?.message?.content || "");
    res.status(200).json({
      message: chatCompletion.choices[0]?.message?.content || "No content",
    });
  } catch (error) {
    next(error);
  }
};

export { generateAiContent, getGroqChatCompletion };