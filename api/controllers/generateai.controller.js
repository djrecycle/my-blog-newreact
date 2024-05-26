import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getGroqChatCompletion = async (req) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Buat konten blog dengan struktur berikut: Judul, Kategori, Deskripsi, dan Konten. Topik yang diinginkan adalah:(selalu dibuat dalam bahasa indonesia)",
      },
      {
        role: "user",
        content: `Judul: ${req.body.title}\nKategori: ${req.body.category}\nDeskripsi: ${req.body.description}\nKonten: ${req.body.content}`,
      },
    ],
    model: "llama3-8b-8192",
    language: "id",
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
