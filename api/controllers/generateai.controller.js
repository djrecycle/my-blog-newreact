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
        content: `Konten: ${req.body.content}`,
      },
      {
        role: "system",
        content: `Anda adalah asisten yang membantu yang akan menerima permintaan dalam Bahasa dan Anda akan menjawab kembali dalam Bahasa, jika "user" berisi content: ${req.body.title} maka anda akan menjawab atau memberikan Judul sesuai dengan permintaan "user"`,
      },
      {
        role: "user",
        content: `Buatkan 1 judul blog artikel tentang: ${req.body.title}`,
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
