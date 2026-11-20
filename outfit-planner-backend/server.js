require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '20kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use('/api/', limiter);

app.post('/api/outfit', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({
        error: 'A valid outfit prompt is required.',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Gemini server configuration is missing.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      recommendation: result.text || '',
    });
  } catch (error) {
    console.error('Gemini request failed:', error.message);

    res.status(500).json({
      error: 'Could not generate an outfit. Please try again.',
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Outfit backend running on port ${PORT}`);
});