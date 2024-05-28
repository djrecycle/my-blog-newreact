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
          "Anda adalah asisten yang membantu yang akan menerima permintaan dalam Bahasa dan Anda akan menjawab kembali dalam Bahasa",
      },
      {
        role: "user",
        content: `Judul: ${req.body.title}\nKategori: ${req.body.category}\nDeskripsi: ${req.body.description}\nKonten: ${req.body.content}`,
      },
      {
        role: "system",
        content:
          "Anda adalah asisten yang membantu yang akan menerima permintaan dalam Bahasa dan Anda akan menjawab kembali dalam Bahasa",
      },
      {
        role: "user",
        content: `Judul: ${req.body.title}`,
      },
      {
        role: "system",
        content:
          "Anda adalah asisten yang membantu yang akan menerima permintaan dalam Bahasa dan Anda akan menjawab kembali dalam Bahasa",
      },
      {
        role: "user",
        content: `Kategori: ${req.body.category}`,
      },
      {
        role: "system",
        content:
          "Anda adalah asisten yang membantu yang akan menerima permintaan dalam Bahasa dan Anda akan menjawab kembali dalam Bahasa",
      },
      {
        role: "user",
        content: `Deskripsi: ${req.body.description}`,
      },
    ],
    model: "llama3-70b-8192",
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
