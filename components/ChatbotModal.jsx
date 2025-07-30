import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { sendMessageToOpenAI } from '../utils/openai'

export function ChatbotModal({ isOpen, onClose, buttonRef }) {
  const [messages, setMessages] = useState([
    // {
    //   id: 1,
    //   type: 'ai',
    //   content: "Hello,",
    //   timestamp: new Date()
    // }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [newMessageId, setNewMessageId] = useState(null)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
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

  const calculateButtonPosition = () => {
    if (buttonRef?.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      setButtonPosition({ x: centerX, y: centerY })
      
      // Calculate modal center position
      const modalCenterX = window.innerWidth / 2
      const modalCenterY = window.innerHeight / 2
      setModalPosition({ x: modalCenterX, y: modalCenterY })
    }
  }

  useEffect(() => {
    if (isOpen) {
      calculateButtonPosition()
      setIsAnimating(true)
      inputRef.current?.focus()
    } else {
      setIsAnimating(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculateButtonPosition()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const handleSendMessage = async (customMessage = null) => {
    const messageToSend = (customMessage || inputValue || '').toString()
    if (!messageToSend.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessageId(userMessage.id)
    if (!customMessage) {
      setInputValue('')
    }
    setIsTyping(true)

    setTimeout(() => setNewMessageId(null), 1000)

    try {
      const aiResponseContent = await generateAIResponse(messageToSend)
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponseContent,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setNewMessageId(aiResponse.id)
      setIsTyping(false)
      
      setTimeout(() => setNewMessageId(null), 1000)
    } catch (error) {
      console.error('Error in handleSendMessage:', error)
      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact Bilguun directly at batnasanbilguun29@gmail.com",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
      setNewMessageId(errorResponse.id)
      setIsTyping(false)
      
      setTimeout(() => setNewMessageId(null), 1000)
    }
  }

  const generateAIResponse = async (userInput) => {
    try {
      const response = await sendMessageToOpenAI(userInput)
      return response
    } catch (error) {
      console.error('Error generating AI response:', error)
      return "I'm sorry, I'm having trouble processing your request right now. Please try again or contact Bilguun directly at batnasanbilguun29@gmail.com"
    }
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
          "absolute inset-0 bg-black/30 backdrop-blur-xl transition-all duration-700 ease-out",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-110"
        )}
        onClick={handleClose}
      />
      
      {/* Apple-style modal */}
      <div 
        className={clsx(
          "relative w-[95vw] h-[90vh] max-w-4xl max-h-[90vh] bg-white/80 dark:bg-zinc-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col transition-all duration-700 ease-out transform border border-white/20 dark:border-zinc-700/50",
          "sm:w-[90vw] sm:h-[85vh] md:w-[85vw] md:h-[80vh] lg:w-[80vw] lg:h-[75vh]",
          isOpen 
            ? "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0" 
            : "opacity-0 scale-25 rotate-45"
        )}
        style={{
          transformOrigin: isOpen ? 'center' : `${buttonPosition.x}px ${buttonPosition.y}px`,
          transform: isOpen 
            ? 'translate(-50%, -50%) scale(1) rotate(0deg)' 
            : `translate(${buttonPosition.x - modalPosition.x}px, ${buttonPosition.y - modalPosition.y}px) scale(0.25) rotate(45deg)`,
          left: '50%',
          top: '50%',
          position: 'absolute'
        }}
      >
        {/* Apple-style header */}
        <div className={clsx(
          "flex items-center justify-between p-4 sm:p-6 md:p-8 border-b border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-600 delay-300 ease-out",
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-[-30px] opacity-0 scale-90"
        )}>
          <div className="flex items-center space-x-4">
            <div className={clsx(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center transition-all duration-600 delay-400 ease-out shadow-lg relative overflow-hidden",
              isOpen ? "scale-100 rotate-0" : "scale-0 rotate-180"
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 animate-pulse opacity-20"></div>
              <svg className={clsx(
                "w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10 transition-all duration-500",
                isOpen ? "scale-100 rotate-0" : "scale-0 rotate-90"
              )} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </div>
            <div className={clsx(
              "transition-all duration-600 delay-500 ease-out",
              isOpen ? "translate-x-0 opacity-100 scale-100" : "translate-x-[-30px] opacity-0 scale-90"
            )}>
              <h2 className={clsx(
                "text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight transition-all duration-600",
                isOpen ? "scale-100 translate-y-0" : "scale-90 translate-y-3"
              )}>
                Welcome
              </h2>
              <p className={clsx(
                "text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium transition-all duration-600 delay-200",
                isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-90 translate-y-3 opacity-0"
              )}>
                to my AI assistant
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={clsx(
              "p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-600 delay-600 ease-out group",
              isOpen ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-90"
            )}
          >
            <svg className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Apple-style messages */}
        <div className={clsx(
          "flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 transition-all duration-600 delay-400 ease-out flex flex-col-reverse",
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"
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
              {message.type === 'ai' && (
                <div className="flex-shrink-0 mr-3 mt-1">
                  <img
                    src="/images/profile.jpg"
                    alt="Bilguun Batnasan"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/20 dark:border-zinc-700/50 shadow-sm"
                  />
                </div>
              )}
                                              <div
                  className={clsx(
                    'max-w-[85%] sm:max-w-xs lg:max-w-md px-4 sm:px-6 py-3 sm:py-4 transition-all duration-200 shadow-lg backdrop-blur-sm',
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl rounded-br-md shadow-indigo-500/25'
                      : 'bg-white/80 dark:bg-zinc-700/80 text-zinc-900 dark:text-zinc-100 rounded-2xl rounded-bl-md shadow-zinc-500/10 border border-white/20 dark:border-zinc-600/50',
                    newMessageId === message.id && 'animate-button-pulse scale-105'
                  )}
                >
                  <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                </div>
            </div>
          ))}
            
            {/* Modern typing indicator */}
            {isTyping && (
              <div className={clsx(
                "flex justify-start transition-all duration-200",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                <div className="flex-shrink-0 mr-3 mt-1">
                  <img
                    src="/images/profile.jpg"
                    alt="Bilguun Batnasan"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/20 dark:border-zinc-700/50 shadow-sm"
                  />
                </div>
                <div className="bg-white/80 dark:bg-zinc-700/80 px-6 py-4 rounded-2xl rounded-bl-md shadow-lg backdrop-blur-sm border border-white/20 dark:border-zinc-600/50">
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
          "p-4 sm:p-6 md:p-8 border-t border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-600 delay-500 ease-out",
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90"
        )}>
          {/* Frequent Questions */}
          <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
            {[
              { text: "about me", icon: "👤", message: "Tell me about yourself" },
              { text: "experience", icon: "💼", message: "Tell me about your experience" },
              { text: "skills", icon: "⚡", message: "What are your skills?" },
              { text: "hobbies", icon: "🎯", message: "What are your hobbies and interests?" },
              { text: "contact", icon: "📧", message: "How can I contact you?" }
            ].map((item, index) => (
              <button
                key={item.text}
                onClick={() => {
                  handleSendMessage(item.message)
                }}
                className={clsx(
                  "px-3 py-2 text-xs sm:text-sm font-medium rounded-2xl transition-all duration-200",
                  "bg-white/80 dark:bg-zinc-200/80 text-zinc-700 dark:text-zinc-800",
                  "hover:bg-white dark:hover:bg-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-900",
                  "border border-zinc-200/60 dark:border-zinc-300/60",
                  "hover:scale-105 active:scale-95",
                  "backdrop-blur-sm shadow-sm hover:shadow-md",
                  "flex items-center space-x-1.5"
                )}
                style={{ 
                  transitionDelay: `${600 + index * 100}ms`,
                  transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                  opacity: isOpen ? 1 : 0
                }}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.text.charAt(0).toUpperCase() + item.text.slice(1)}</span>
              </button>
            ))}
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about me..."
                className={clsx(
                  "w-full px-4 sm:px-6 py-3 sm:py-4 border border-zinc-300/50 dark:border-zinc-600/50 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none dark:bg-zinc-700/30 dark:text-zinc-100 transition-all duration-200",
                  "hover:border-zinc-400/50 dark:hover:border-zinc-500/50 placeholder-zinc-400 dark:placeholder-zinc-500",
                  "shadow-sm backdrop-blur-sm bg-white/80 dark:bg-zinc-700/80"
                )}
                rows="1"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={clsx(
                'px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-200',
                'hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'flex items-center space-x-2 sm:space-x-3 hover:scale-105 active:scale-95',
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