import React, { useState, useRef, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
  showActions?: boolean;
}

const INITIAL_SUGGESTIONS = [
  'Berapa tarif sedot WC rumah tangga?',
  'Berapa lama armada tiba di lokasi saya?',
  'Apakah ada biaya tambahan / siluman?',
  'Apakah kloset mampet perlu bongkar keramik?',
  'Apakah melayani kawasan Sentul & Cibinong?',
  'Bagaimana legalitas & pembuangan IPLT?'
];

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(1);
  const [hasOpenedBefore, setHasOpenedBefore] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Halo! Selamat datang di **PT MITRA BERSIH 24 JAM** 👋\n\nSaya **MitraBot AI**, asisten virtual cerdas yang siap menjawab pertanyaan Anda seputar layanan sedot WC, kuras septic tank, pelancaran saluran mampet tanpa bongkar, dan estimasi biaya di seluruh Bogor 24 jam.\n\nSilakan ketik pertanyaan Anda atau pilih topik di bawah ini!',
      timestamp: 'Baru saja',
      suggestions: INITIAL_SUGGESTIONS,
      showActions: true
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of message thread
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      if (!hasOpenedBefore) {
        setHasOpenedBefore(true);
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages, hasOpenedBefore]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const botReply = data.reply || 'Mohon maaf, saya belum memahami pertanyaan Anda. Silakan hubungi Customer Service kami langsung di +62 857-1565-4183.';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: data.timestamp || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        showActions: true
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const fallbackMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'bot',
        text: 'Mohon maaf, koneksi asisten AI sedang mengalami sedikit kendala. Namun armada kami tetap siaga 24 jam nonstop!\n\nSilakan langsung konsultasi via WhatsApp CS kami di **+62 857-1565-4183** untuk respon darurat kilat.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        showActions: true
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Percakapan telah direset. Silakan tanyakan hal lain seputar layanan sedot WC, septic tank penuh, pipa mampet, atau wilayah Pos Siaga Bogor!',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        suggestions: INITIAL_SUGGESTIONS,
        showActions: true
      }
    ]);
  };

  // Helper function to format bold and bullet text
  const formatBotText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Parse markdown-style **bold** text
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return <strong key={pIdx}>{part.slice(1, -1)}</strong>;
        }
        return part;
      });

      return (
        <React.Fragment key={idx}>
          {formattedParts}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="gemini-chatbot-container" role="region" aria-label="Asisten AI Sedot WC Bogor">
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <div className="chatbot-launcher-wrapper">
          <div className="chatbot-launcher-hint fade-in" onClick={() => setIsOpen(true)}>
            <span className="hint-pulse-dot" aria-hidden="true"></span>
            <span className="hint-text">Ada yang bisa dibantu? Tanya AI</span>
          </div>

          <button
            type="button"
            className="chatbot-floating-trigger"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-label="Buka Chatbot AI Sedot WC Bogor"
            title="Chat dengan MitraBot AI (Respon Cepat 24 Jam)"
          >
            <span className="trigger-icon-wrap">
              <i className="fas fa-robot trigger-main-icon" aria-hidden="true"></i>
              <span className="trigger-sparkle-dot" aria-hidden="true"></span>
            </span>

            {unreadCount > 0 && (
              <span className="trigger-badge" aria-label={`${unreadCount} pesan baru`}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* CHAT WINDOW DIALOG */}
      {isOpen && (
        <div
          className="chatbot-window scale-in"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chatbot-header-title"
        >
          {/* HEADER */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <i className="fas fa-robot text-slate-900" aria-hidden="true"></i>
                <span className="chatbot-online-indicator" title="Online 24 Jam" aria-hidden="true"></span>
              </div>
              <div>
                <h3 id="chatbot-header-title" className="chatbot-title">
                  MitraBot AI
                </h3>
                <span className="chatbot-subtitle">
                  <i className="fas fa-sparkles text-amber-300 mr-1" aria-hidden="true"></i>
                  CS Sedot WC • Terhubung FAQ Resmi
                </span>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                onClick={handleResetChat}
                className="chatbot-header-btn"
                title="Reset percakapan"
                aria-label="Bersihkan riwayat percakapan"
              >
                <i className="fas fa-redo-alt" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="chatbot-header-btn close"
                title="Tutup chat"
                aria-label="Tutup jendela chatbot"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          {/* CHAT THREAD BODY */}
          <div className="chatbot-body" role="log" aria-live="polite">
            <div className="chatbot-notice-bar">
              <i className="fas fa-shield-alt text-emerald-500 mr-1" aria-hidden="true"></i>
              <span>Didukung Gemini AI &amp; Basis Data Resmi PT MITRA BERSIH 24 JAM</span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-msg-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="msg-bot-avatar" aria-hidden="true">
                    <i className="fas fa-robot"></i>
                  </div>
                )}

                <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  <div className="bubble-content">
                    {msg.sender === 'bot' ? formatBotText(msg.text) : msg.text}
                  </div>
                  <span className="bubble-time">{msg.timestamp}</span>

                  {/* Quick Suggestions (if any on this message) */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="msg-suggestions-wrap" role="group" aria-label="Pertanyaan Cepat">
                      <span className="suggestions-label">
                        <i className="fas fa-lightbulb text-amber-500 mr-1"></i> Pertanyaan sering diajukan:
                      </span>
                      <div className="suggestions-list">
                        {msg.suggestions.map((suggestion, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => handleSendMessage(suggestion)}
                            className="suggestion-chip"
                            disabled={isLoading}
                          >
                            <span>{suggestion}</span>
                            <i className="fas fa-arrow-right text-xs" aria-hidden="true"></i>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct Action Links on Bot Message */}
                  {msg.sender === 'bot' && msg.showActions && (
                    <div className="bot-cta-actions">
                      <a
                        href="https://wa.me/6285715654183?text=Halo%20Admin%20Mitra%20Bersih,%20saya%20ingin%20tanya%20layanan%20sedot%20WC%20Bogor%20lewat%20chat%20AI."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bot-wa-action-btn"
                        title="Chat langsung dengan tim CS via WhatsApp"
                      >
                        <i className="fab fa-whatsapp" aria-hidden="true"></i>
                        <span>Order via WhatsApp (+62 857-1565-4183)</span>
                      </a>
                      <a
                        href="#jadwal-booking"
                        onClick={() => setIsOpen(false)}
                        className="bot-secondary-action-btn"
                        title="Buka Kalender Booking Tanggal Layanan"
                      >
                        <i className="fas fa-calendar-alt text-amber-500 mr-1" aria-hidden="true"></i>
                        <span>Pesan Tanggal di Kalender</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isLoading && (
              <div className="chat-msg-row bot-row fade-in">
                <div className="msg-bot-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="chat-bubble bot-bubble typing-bubble">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="typing-text">MitraBot sedang berpikir...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM FOOTER */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="chatbot-input-bar"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pertanyaan tentang Sedot WC Bogor..."
              className="chatbot-input-field"
              disabled={isLoading}
              aria-label="Tulis pertanyaan ke asisten AI"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="chatbot-send-btn"
              aria-label="Kirim pertanyaan"
              title="Kirim pesan"
            >
              <i className="fas fa-paper-plane" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GeminiChatbot;
