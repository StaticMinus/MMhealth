import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Send, Mic, Paperclip, Brain, Shield } from 'lucide-react';
import type { Message } from '@/data/assistantResponses';
import { welcomeMessage, suggestedPrompts, getResponse } from '@/data/assistantResponses';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import SuggestedPrompts from './SuggestedPrompts';
import CrisisAlert from './CrisisAlert';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const handleSendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // Add user message
      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);
      setShowSuggestions(false);
      setShowCrisis(false);

      // Simulate AI response delay (1.5-2.5s)
      const delay = 1500 + Math.random() * 1000;

      setTimeout(() => {
        const response = getResponse(trimmed);
        const aiMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: response.content,
          timestamp: new Date(),
          resources: response.resources,
          showCrisis: response.showCrisis,
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);

        if (response.showCrisis) {
          setShowCrisis(true);
        }
      }, delay);
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handlePromptClick = (query: string) => {
    handleSendMessage(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[900px]">
      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex flex-col overflow-hidden rounded-[20px] border border-[#E7E5E4] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
        style={{ height: '75vh', maxHeight: '800px' }}
      >
        {/* Chat Header */}
        <div className="flex h-14 items-center justify-between border-b border-[#E7E5E4] bg-[#FAFAF9] px-4 rounded-t-[20px]">
          {/* Left: AI Avatar + Name + Status */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626]">
              <Brain className="h-5 w-5 text-white" />
              {/* Online status dot */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#292524]">Red Aid Assistant</h3>
              <span className="flex items-center gap-1 text-xs text-[#6B9080]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
                </span>
                Online
              </span>
            </div>
          </div>

          {/* Center: Support label */}
          <span className="hidden text-[13px] text-[#A8A29E] sm:block">
            Mental Health Support
          </span>

          {/* Right: Confidential badge */}
          <div className="flex items-center gap-1.5 rounded-full bg-[#E8F0EC] px-3 py-1">
            <Shield className="h-3.5 w-3.5 text-[#6B9080]" />
            <span className="text-xs font-medium text-[#6B9080]">Confidential</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="flex flex-col gap-5 p-4 sm:p-6">
            {/* Crisis Alert */}
            <AnimatePresence>
              {showCrisis && <CrisisAlert onDismiss={() => setShowCrisis(false)} />}
            </AnimatePresence>

            {/* Messages */}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DC2626]">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-[#F5F5F4] px-5 py-2">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Suggested Prompts */}
            <AnimatePresence>
              {showSuggestions && messages.length === 1 && (
                <SuggestedPrompts
                  prompts={suggestedPrompts}
                  onPromptClick={handlePromptClick}
                  visible={showSuggestions}
                />
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-[#E7E5E4] bg-white rounded-b-[20px]">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3">
            {/* Attachment button */}
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#A8A29E] hover:bg-[#F5F5F4] hover:text-[#57534E] transition-colors"
              aria-label="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 rounded-full bg-[#F5F5F4] px-5 py-3 text-[15px] text-[#292524] placeholder:text-[#A8A29E] outline-none transition-all focus:bg-white focus:shadow-[0_0_0_2px_rgba(220,38,38,0.15)] border border-transparent focus:border-[#DC2626]/20"
            />

            {/* Voice input button */}
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#A8A29E] hover:bg-[#F5F5F4] hover:text-[#57534E] transition-colors"
              aria-label="Voice input"
            >
              <Mic className="h-5 w-5" />
            </button>

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-white shadow-md transition-all hover:bg-[#B91C1C] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          {/* Disclaimer */}
          <p className="px-4 pb-3 text-center text-xs text-[#A8A29E]">
            This AI assistant is for support and education only. If you&apos;re in crisis, please call{' '}
            <a href="tel:0800-MENTAL-HELP" className="text-[#DC2626] font-medium hover:underline">
              0800-MENTAL-HELP
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
