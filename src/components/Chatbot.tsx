import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
};

const SUGGESTIONS = [
  "How much does web design cost?",
  "What services do you offer?",
  "How fast are your websites?",
  "How can I contact Fennlight?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "model",
      text: "Hi there! 👋 I'm Fennlight's AI Assistant. Ask me anything about our web design services, SEO optimization, high-speed hosting, or anything else about our digital agency! How can I help you grow today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages or typing state change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Handle escape key to close chatbot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setError(null);

    // Prepare conversation history for the API (except the initial welcome message if desired, or keep it all)
    const historyPayload = messages
      .filter((m) => m.id !== "initial")
      .map((m) => ({
        role: m.role,
        text: m.text,
      }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to assistant service.");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: Math.random().toString(36).substring(7),
        role: "model",
        text: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("[Chatbot UI Error]", err);
      setError("Unable to reach the assistant. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-18 right-0 w-[360px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            ref={chatWindowRef}
            role="dialog"
            aria-label="Fennlight Chatbot Assistant"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-5 py-4 flex items-center justify-between text-white shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-primary-600 animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base leading-tight flex items-center gap-1.5">
                    Fennlight Assistant
                    <Sparkles className="w-3.5 h-3.5 text-accent-300 animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-white/80 font-body">Online • Instantly Answers Questions</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                title="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-primary-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span
                      className={`text-[9px] block mt-1.5 text-right ${
                        msg.role === "user" ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3.5 text-sm shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-50 text-red-700 text-xs rounded-xl p-3 border border-red-100 flex items-center gap-2 max-w-[90%]">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Quick Suggestions - only show when there is minimal history or last message was model */}
              {!isTyping && messages[messages.length - 1]?.role === "model" && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Suggested Questions</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs bg-white hover:bg-primary-50 text-gray-700 hover:text-primary-600 border border-gray-200 hover:border-primary-300 rounded-xl px-3 py-2 text-left font-medium transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow"
                      >
                        {suggestion}
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleFormSubmit} className="p-3 border-t border-gray-100 bg-white flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message about Fennlight..."
                className="flex-1 text-sm bg-gray-50 focus:bg-white border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 rounded-xl px-4 py-2.5 outline-none transition-all placeholder:text-gray-400"
                maxLength={400}
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-100 disabled:text-gray-300 transition-colors shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-500 border border-white text-[9px] font-bold text-white items-center justify-center">
                  1
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
