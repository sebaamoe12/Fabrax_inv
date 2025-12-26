# Fabrax Invoice Generator

Professional invoice generator with Claude Sonnet 4.5 AI integration.

## Project Structure

- **backend/** - Express API server with Anthropic Claude Sonnet 4.5
- **project-novite/** - React frontend with Parcel bundler

## Features

- 📄 Professional invoice generation
- 🤖 Claude Sonnet 4.5 AI integration for text generation
- 💬 Interactive chat interface with Claude
- 📱 Responsive design with Tailwind CSS v4
- 📦 PDF export functionality
- 🎨 Modern UI with Radix UI components

## Quick Start

### Prerequisites
- Node.js 20.17.1 (required for native dependencies)
- Anthropic API key

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/sebaamoe12/Fabrax_inv.git
cd Fabrax_inv
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
npm start
```

3. **Frontend Setup** (in a new terminal)
```bash
cd project-novite
npm install
npm run dev
```

4. **Open in browser**
- Frontend: http://localhost:1234
- Backend API: http://localhost:3001

## Documentation

- [Backend README](backend/README.md) - API documentation
- [Frontend README](project-novite/README.md) - Build instructions and troubleshooting

## Tech Stack

### Backend
- Node.js + Express
- Anthropic SDK (Claude Sonnet 4.5)
- CORS enabled for frontend integration

### Frontend
- React 18 + TypeScript
- Parcel 2 (bundler)
- Tailwind CSS v4
- Radix UI components
- html2canvas + jsPDF for PDF export

## Environment Variables

### Backend (.env)
```env
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:1234
```

### Frontend
```env
VITE_API_URL=http://localhost:3001
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/chat` - Chat with Claude Sonnet 4.5
- `POST /api/invoice/generate-text` - Generate invoice-specific text

## Deployment

### Backend (Render/Heroku)
1. Set environment variables
2. Deploy with `npm start`
3. Configure ALLOWED_ORIGINS for production

### Frontend (Render Static/Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist/` directory
3. Set `VITE_API_URL` to backend URL

## Contributing

Contributions welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT

## Author

Fabrax Team

---

**Powered by Claude Sonnet 4.5** 🚀
