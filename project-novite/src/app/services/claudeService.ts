const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  model: string;
  content: Array<{ type: string; text: string }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
  id: string;
}

export interface InvoiceTextResponse {
  model: string;
  text: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export class ClaudeService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async healthCheck(): Promise<{ status: string; model: string; timestamp: string }> {
    const response = await fetch(`${this.baseUrl}/api/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    return response.json();
  }

  async chat(messages: ChatMessage[], maxTokens: number = 1024, temperature: number = 1.0): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Chat request failed');
    }

    return response.json();
  }

  async generateInvoiceText(prompt: string, invoiceData?: any): Promise<InvoiceTextResponse> {
    const response = await fetch(`${this.baseUrl}/api/invoice/generate-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        invoiceData,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invoice text generation failed');
    }

    return response.json();
  }

  extractTextFromResponse(response: ChatResponse): string {
    const textBlock = response.content.find((block) => block.type === 'text');
    return textBlock?.text || '';
  }
}

export const claudeService = new ClaudeService();
