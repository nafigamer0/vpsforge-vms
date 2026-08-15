// ⭐🌟MADE BY KYLER ⭐🌟
// Render Worker - API Rate Limit Bypass

const express = require('express');
const app = express();

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

const API_KEY = "sk-dqoMkZqI8uCjRmHRonVOUVFAH1RBqxyVk2aZpbFIGvWeu5dtFuz9BknEds0Voepu";

app.post('/chat', async (req, res) => {
  const body = req.body || {
    model: "deepseek-v4-flash-free",
    messages: [{ role: "user", content: "Hello" }],
    stream: false
  };

  const randomIP = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;

  try {
    const response = await fetch("https://opencode.ai/zen/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/132.0.0.0 Safari/537.36`,
        "X-Forwarded-For": randomIP
      },
      body: JSON.stringify(body)
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Worker running on port ${PORT}`));
