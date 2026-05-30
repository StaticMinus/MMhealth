import { motion } from 'framer-motion';
import { Brain, User, FileText, Play, BookOpen, ArrowRight } from 'lucide-react';
import type { Message } from '@/data/assistantResponses';
import { Link } from 'react-router-dom';

interface ChatMessageProps {
  message: Message;
}

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Play className="h-4 w-4" />;
    case 'article':
      return <FileText className="h-4 w-4" />;
    case 'guide':
      return <BookOpen className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isUser ? 20 : -20,
        y: 0,
      }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-[#57534E]' : 'bg-[#DC2626]'
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Brain className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message content */}
      <div className={`flex max-w-[75%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-5 py-3.5 ${
            isUser
              ? 'rounded-tr-sm bg-[#DC2626] text-white'
              : 'rounded-tl-sm bg-[#F5F5F4] text-[#292524]'
          }`}
        >
          <div
            className={`whitespace-pre-wrap text-[15px] leading-relaxed ${
              isUser ? 'text-white' : 'text-[#292524]'
            }`}
          >
            {message.content.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < message.content.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>

        {/* Resource cards */}
        {!isUser && message.resources && message.resources.length > 0 && (
          <div className="mt-3 flex flex-col gap-2 w-full">
            {message.resources.map((resource, idx) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + idx * 0.1,
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
                }}
                className="flex items-center gap-3 rounded-xl border border-[#E7E5E4] bg-white p-4 shadow-sm hover:shadow-md hover:border-[#FEE2E2] transition-all duration-300"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FEE2E2] text-[#DC2626]">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-[#292524] truncate">
                    {resource.title}
                  </h5>
                  <p className="text-xs text-[#57534E] line-clamp-2 mt-0.5">
                    {resource.description}
                  </p>
                </div>
                <Link
                  to={resource.link}
                  className="shrink-0 flex items-center gap-1 text-[13px] font-medium text-[#DC2626] hover:text-[#B91C1C] transition-colors"
                >
                  View
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
