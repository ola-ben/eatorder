import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import {
  findAnswer,
  pickFallback,
  suggestedQuestions,
} from "../data/chatbot";

const HIDE_ON_PATHS = ["/cartpage", "/checkoutpage", "/logiformpage"];

const greeting = {
  id: "greet-init",
  role: "bot",
  text:
    "Hi, I'm Benjamin's Assistant 👋 I can answer questions about delivery, restaurants, dishes, your cart, or your account. What can I help with?",
};

export default function Chatbot() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([greeting]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  // Hide on certain routes (where the sticky CTA bar would clash)
  const hidden = HIDE_ON_PATHS.some((p) => pathname.startsWith(p));
  if (hidden) return null;

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg = { id: `u-${Date.now()}`, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate small delay so it feels natural
    setTimeout(
      () => {
        const match = findAnswer(trimmed);
        const reply = match ? match.answer : pickFallback();
        setMessages((prev) => [
          ...prev,
          { id: `b-${Date.now()}`, role: "bot", text: reply },
        ]);
        setIsTyping(false);
      },
      450 + Math.random() * 250,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const handleSuggestion = (q) => send(q);

  return (
    <>
      {/* Floating launcher button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)}
            className="fixed right-4 bottom-24 lg:bottom-6 z-40 w-14 h-14 rounded-full bg-brand text-white shadow-pop flex items-center justify-center"
            aria-label="Open chat"
          >
            <FiMessageCircle className="text-2xl" />
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-brand -z-10"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed z-50 inset-x-3 bottom-3 lg:inset-auto lg:right-6 lg:bottom-6 lg:w-[380px] lg:h-[560px] bg-white rounded-3xl shadow-pop flex flex-col overflow-hidden border border-gray-100 max-h-[80vh]"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-brand to-accent text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">
                    🍽️
                  </div>
                  <div>
                    <p className="font-semibold leading-tight">
                      Benjamin's Assistant
                    </p>
                    <p className="text-[11px] text-white/80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Online · usually replies instantly
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <FiX />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-4 bg-canvas space-y-3"
              >
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <Message key={m.id} message={m} />
                  ))}
                </AnimatePresence>

                {/* Suggestions when chat is fresh */}
                {messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-2"
                  >
                    <p className="text-[11px] text-ink-soft mb-2 px-1">
                      Try asking:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((q, i) => (
                        <motion.button
                          key={q}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleSuggestion(q)}
                          className="text-[12px] bg-white border border-gray-200 hover:border-brand hover:text-brand text-ink px-3 py-1.5 rounded-full transition-colors"
                        >
                          {q}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-end gap-2"
                    >
                      <div className="w-7 h-7 rounded-full bg-brand-soft flex items-center justify-center text-sm">
                        🍽️
                      </div>
                      <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2.5 shadow-card flex items-center gap-1">
                        {[0, 0.15, 0.3].map((d, i) => (
                          <motion.span
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: d,
                            }}
                            className="w-1.5 h-1.5 rounded-full bg-ink-soft"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-gray-100 bg-white p-3 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-100 rounded-full px-4 h-10 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-brand hover:bg-brand-deep text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send"
                >
                  <FiSend />
                </motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Message({ message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-brand-soft flex items-center justify-center text-sm shrink-0">
          🍽️
        </div>
      )}
      <div
        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-snug shadow-card ${
          isUser
            ? "bg-brand text-white rounded-br-sm"
            : "bg-white text-ink rounded-bl-sm"
        }`}
      >
        <FormattedText text={message.text} />
      </div>
    </motion.div>
  );
}

// Tiny inline formatter: turns **bold** into <strong>, preserves line breaks.
function FormattedText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return <strong key={i}>{p.slice(2, -2)}</strong>;
        }
        return p.split("\n").map((line, j, arr) => (
          <span key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ));
      })}
    </>
  );
}
