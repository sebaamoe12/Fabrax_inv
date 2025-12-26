import { useState } from 'react';
import { claudeService, type ChatMessage } from '../services/claudeService';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function ClaudeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState<boolean | null>(null);

  const checkConnection = async () => {
    try {
      await claudeService.healthCheck();
      setConnected(true);
    } catch (error) {
      setConnected(false);
      console.error('Backend connection failed:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await claudeService.chat([...messages, userMessage]);
      const assistantText = claudeService.extractTextFromResponse(response);
      
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantText },
      ]);
      setConnected(true);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${(error as Error).message}` },
      ]);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Claude Sonnet 4.5 Chat</h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={checkConnection}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            Test Connection
          </Button>
          {connected === true && (
            <span className="text-xs text-green-600">● Connected</span>
          )}
          {connected === false && (
            <span className="text-xs text-red-600">● Disconnected</span>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">
            Start a conversation with Claude Sonnet 4.5
          </p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-50 ml-8'
                : 'bg-gray-50 mr-8'
            }`}
          >
            <div className="text-xs font-semibold mb-1 text-gray-500">
              {msg.role === 'user' ? 'You' : 'Claude Sonnet 4.5'}
            </div>
            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Type a message..."
          disabled={loading}
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={loading || !input.trim()}>
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
}
