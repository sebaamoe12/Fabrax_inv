# Invoice Backend API

Backend service for the Invoice Generator app, powered by **Claude Sonnet 4.5** via the Anthropic API.

## Features
- ✅ Claude Sonnet 4.5 (model: `claude-sonnet-4-20250514`)
- ✅ Chat completion endpoint
- ✅ Invoice-specific text generation
- ✅ CORS configured for frontend
- ✅ Environment-based configuration

## Setup

### 1. Install Node 20.17.1
This backend requires Node 20.17.1. If using nvm-windows:
```powershell
nvm install 20.17.1
nvm use 20.17.1
node -v  # should show v20.17.1
```

### 2. Install Dependencies
```powershell
cd e:\Dev\invoice\backend
npm install
```

### 3. Configure Environment
Copy `.env.example` to `.env` and add your Anthropic API key:
```powershell
Copy-Item .env.example .env
```

Edit `.env`:
```env
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:1234,http://localhost:3000
```

Get your API key from: https://console.anthropic.com/

### 4. Run the Server
```powershell
npm run dev    # Development with auto-reload
npm start      # Production mode
```

Server runs on `http://localhost:3001`

## API Endpoints

### Health Check
```http
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "model": "claude-sonnet-4-20250514",
  "timestamp": "2025-12-26T14:00:00.000Z"
}
```

### Chat Completion
```http
POST /api/chat
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ],
  "max_tokens": 1024,
  "temperature": 1.0
}
```

### Invoice Text Generation
```http
POST /api/invoice/generate-text
Content-Type: application/json

{
  "prompt": "Generate a professional payment terms description",
  "invoiceData": {
    "invoiceNumber": "1",
    "total": 1500
  }
}
```

## Integration with Frontend

The frontend (Parcel dev server on port 1234) can call:
```javascript
const response = await fetch('http://localhost:3001/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Hello Claude!' }]
  })
});
const data = await response.json();
console.log(data.content);
```

## Deployment
For production deployment (e.g., Render):
1. Set environment variable `ANTHROPIC_API_KEY`
2. Set `PORT` (Render auto-assigns this)
3. Set `ALLOWED_ORIGINS` to your frontend URL
4. Build command: `npm install`
5. Start command: `npm start`

## Security Notes
- Never commit `.env` file
- Rotate API keys regularly
- Restrict CORS origins in production
- Use HTTPS in production
