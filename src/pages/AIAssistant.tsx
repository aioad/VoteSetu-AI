import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import { askElectionAI, getSessionId } from '../lib/api';
import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

const SUGGESTIONS = [
  'How do I register to vote?',
  'What documents are required for voter registration?',
  'How does vote counting work?',
  'How do I find my polling booth?',
  'What is an EVM?',
  'What happens after I cast my vote?',
];

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(
        <p key={key++} className="font-bold text-navy-800 mt-3 mb-1">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const content = line.slice(2);
      elements.push(
        <li key={key++} className="ml-4 text-slate-700 leading-relaxed">
          {renderInline(content)}
        </li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const content = line.replace(/^\d+\.\s/, '');
      elements.push(
        <li key={key++} className="ml-4 text-slate-700 leading-relaxed list-decimal">
          {renderInline(content)}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-1" />);
    } else {
      elements.push(
        <p key={key++} className="text-slate-700 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }
  }

  return <div className="space-y-0.5">{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-navy-800">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Namaste! I'm VoteSetu AI, your civic education assistant.\n\nI can help you with:\n- **Voter Registration** – How to register\n- **Required Documents** – What you need\n- **Election Process** – How elections work\n- **Vote Counting** – How votes are counted\n- **Finding Your Booth** – Locate your polling station\n- **Misinformation** – Common myths debunked\n\nWhat would you like to know today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionId = getSessionId();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await askElectionAI(text.trim());
      const assistantMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMsg]);

      // Persist to Supabase (fire and forget)
      supabase.from('chat_messages').insert([
        { session_id: sessionId, role: 'user', content: text.trim() },
        { session_id: sessionId, role: 'assistant', content: response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function resetChat() {
    setMessages([
      {
        id: '0',
        role: 'assistant',
        content: `Namaste! I'm VoteSetu AI. Ask me anything about the election process, voter registration, EVMs, or polling booths!`,
      },
    ]);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-700 flex items-center justify-center shadow-md">
              <Sparkles size={18} className="text-saffron-400" />
            </div>
            <div>
              <h1 className="text-navy-800 font-bold text-lg leading-tight">VoteSetu AI</h1>
              <p className="text-slate-500 text-xs">Election Education Assistant</p>
            </div>
          </div>
          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 text-slate-500 hover:text-navy-700 text-sm px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <RotateCcw size={14} />
            New Chat
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-slide-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-navy-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Bot size={15} className="text-saffron-400" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-navy-700 text-white rounded-br-sm'
                    : 'bg-white border border-slate-200 rounded-bl-sm'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="text-white text-sm leading-relaxed">{msg.content}</p>
                ) : (
                  <div className="text-sm">{renderMarkdown(msg.content)}</div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-saffron-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <User size={15} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-navy-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot size={15} className="text-saffron-400" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1.5 items-center h-5">
                  <div className="w-2 h-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 sm:px-6 pb-2">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-slate-400 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs bg-white border border-slate-200 text-slate-600 hover:text-navy-700 hover:border-navy-300 px-3 py-1.5 rounded-full transition-colors shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-navy-400 focus-within:ring-1 focus-within:ring-navy-200 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about elections, voter registration, EVMs..."
              rows={1}
              disabled={loading}
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 resize-none outline-none px-2 py-1.5 max-h-32 leading-relaxed"
              style={{ minHeight: '36px' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-navy-700 hover:bg-navy-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
          <p className="text-xs text-center text-slate-400 mt-2">
            VoteSetu AI provides civic education only. For official information, visit eci.gov.in
          </p>
        </div>
      </div>
    </div>
  );
}
