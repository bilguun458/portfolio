import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

export function ChatbotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Ask anything about me",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [newMessageId, setNewMessageId] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    const messagesContainer = messagesEndRef.current?.parentElement
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      inputRef.current?.focus()
    } else {
      setIsAnimating(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessageId(userMessage.id)
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => setNewMessageId(null), 1000)

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setNewMessageId(aiResponse.id)
      setIsTyping(false)
      
      setTimeout(() => setNewMessageId(null), 1000)
    }, 1000 + Math.random() * 1000)
  }

  const generateAIResponse = (userInput) => {
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's what I can tell you...",
      "Great question! Based on my knowledge, I'd say...",
      "I'm here to help! Let me provide some insights on that...",
      "Thanks for asking! Here's my perspective on this...",
      "I appreciate your question. Let me share some thoughts...",
      "That's a thoughtful inquiry. Here's what I think...",
      "Interesting point! Let me elaborate on that..."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div className={clsx(
      "fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ease-out",
      isOpen ? "opacity-100" : "opacity-0"
    )}>
      {/* Apple-style backdrop with blur */}
      <div 
        className={clsx(
          "absolute inset-0 bg-black/30 backdrop-blur-xl transition-all duration-200",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />
      
      {/* Apple-style modal */}
      <div className={clsx(
        "relative w-full h-full max-w-4xl max-h-[90vh] bg-white/80 dark:bg-zinc-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col transition-all duration-200 ease-out transform border border-white/20 dark:border-zinc-800/50",
        isOpen 
          ? "opacity-100 scale-100 translate-y-0" 
          : "opacity-0 scale-95 translate-y-full"
      )}>
        {/* Apple-style header */}
        <div className={clsx(
          "flex items-center justify-between p-8 border-b border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-200 delay-50",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-[-10px] opacity-0"
        )}>
          <div className="flex items-center space-x-4">
            <div className={clsx(
              "w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center transition-all duration-200 delay-100 shadow-lg relative overflow-hidden",
              isOpen ? "scale-100 rotate-0" : "scale-0 rotate-180"
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 animate-pulse opacity-20"></div>
              <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </div>
            <div className={clsx(
              "transition-all duration-200 delay-150",
              isOpen ? "translate-x-0 opacity-100" : "translate-x-[-10px] opacity-0"
            )}>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                Welcome
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                Ask anything about me
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={clsx(
              "p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200 delay-200 group",
              isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}
          >
            <svg className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Apple-style messages */}
        <div className={clsx(
          "flex-1 overflow-y-auto p-8 space-y-6 transition-all duration-200 delay-100 flex flex-col-reverse",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="flex flex-col space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={clsx(
                  'flex transition-all duration-200',
                  message.type === 'user' ? 'justify-end' : 'justify-start',
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  newMessageId === message.id && 'animate-message-slide-in',
                  `delay-${Math.min(index * 50 + 200, 500)}`
                )}
                style={{ 
                  transitionDelay: `${Math.min(index * 50 + 200, 500)}ms`,
                  transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                  opacity: isOpen ? 1 : 0
                }}
              >
                <div
                  className={clsx(
                    'max-w-xs lg:max-w-md px-6 py-4 transition-all duration-200 shadow-lg backdrop-blur-sm',
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl rounded-br-md shadow-indigo-500/25'
                      : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 rounded-2xl rounded-bl-md shadow-zinc-500/10 border border-white/20 dark:border-zinc-700/50',
                    newMessageId === message.id && 'animate-button-pulse scale-105'
                  )}
                >
                  <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2 font-medium">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Modern typing indicator */}
            {isTyping && (
              <div className={clsx(
                "flex justify-start transition-all duration-200",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                <div className="bg-white/80 dark:bg-zinc-800/80 px-6 py-4 rounded-2xl rounded-bl-md shadow-lg backdrop-blur-sm border border-white/20 dark:border-zinc-700/50">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-typing-bounce"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-typing-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full animate-typing-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Apple-style input */}
        <div className={clsx(
          "p-8 border-t border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-200 delay-150",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={clsx(
                  "w-full px-6 py-4 border border-zinc-300/50 dark:border-zinc-600/50 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none dark:bg-zinc-800/30 dark:text-zinc-100 transition-all duration-200",
                  "hover:border-zinc-400/50 dark:hover:border-zinc-500/50 placeholder-zinc-400 dark:placeholder-zinc-500",
                  "shadow-sm backdrop-blur-sm bg-white/80 dark:bg-zinc-800/80"
                )}
                rows="1"
                style={{ minHeight: '56px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={clsx(
                'px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-200',
                'hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'flex items-center space-x-3 hover:scale-105 active:scale-95',
                'shadow-lg hover:shadow-xl shadow-indigo-500/25 backdrop-blur-sm'
              )}
            >
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 