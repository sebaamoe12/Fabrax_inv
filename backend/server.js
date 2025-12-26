import Anthropic from '@anthropic-ai/sdk';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:1234'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// Initialize Anthropic client with Claude Sonnet 4.5
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL_ID = 'claude-sonnet-4-20250514';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    model: MODEL_ID,
    timestamp: new Date().toISOString() 
  });
});

// Chat completion endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, max_tokens = 1024, temperature = 1.0 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const response = await anthropic.messages.create({
      model: MODEL_ID,
      max_tokens,
      temperature,
      messages,
    });

    res.json({
      model: MODEL_ID,
      content: response.content,
      usage: response.usage,
      id: response.id,
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message 
    });
  }
});

// Invoice text generation endpoint (specialized)
app.post('/api/invoice/generate-text', async (req, res) => {
  try {
    const { prompt, invoiceData } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const systemPrompt = `You are an assistant helping generate professional invoice-related text. 
Be concise, professional, and accurate. Format numbers and dates appropriately.`;

    const userMessage = invoiceData 
      ? `${prompt}\n\nInvoice context: ${JSON.stringify(invoiceData)}`
      : prompt;

    const response = await anthropic.messages.create({
      model: MODEL_ID,
      max_tokens: 512,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const textContent = response.content.find(block => block.type === 'text');
    
    res.json({
      model: MODEL_ID,
      text: textContent?.text || '',
      usage: response.usage,
    });
  } catch (error) {
    console.error('Invoice API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate text',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
  console.log(`📊 Model: ${MODEL_ID}`);
  console.log(`🔑 API Key: ${process.env.ANTHROPIC_API_KEY ? '✓ Configured' : '✗ Missing'}`);
});
