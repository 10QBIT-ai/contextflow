// server/server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { prompt, model } = req.body;

  const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: model || 'mistral', prompt }),
  });

  try {
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'mistral', prompt }),
    });

    const text = await ollamaResponse.text();
    const lines = text.trim().split('\n');
    let result = '';

    for (const line of lines) {
      try {
        const json = JSON.parse(line);
        result += json.response || '';
      } catch (err) {
        console.error('❌ Error parsing chunk:', line, '\n', err);
      }
    }

    res.json({ response: result });
  } catch (err) {
    console.error('🔥 Server error:', err);
    res.status(500).json({ error: 'Server failed' });
  }
});

app.listen(3001, () => {
  console.log('✅ Backend running at http://localhost:3001');
});


