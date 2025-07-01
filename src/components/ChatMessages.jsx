import React from 'react';
import { UserIcon, BotIcon, WrenchIcon } from "./Icons"

function ChatMessages({ messages }) {
  const getSenderIcon = (sender) => {
    switch (sender) {
      case "cliente":
        return <UserIcon />
      case "bot":
        return <BotIcon />
      case "instalador":
        return <WrenchIcon />
      default:
        return <UserIcon />
    }
  }

  const getSenderLabel = (sender) => {
    switch (sender) {
      case "cliente":
        return "Cliente"
      case "bot":
        return "Bot"
      case "instalador":
        return "Instalador"
      default:
        return "Usuario"
    }
  }

  const getMessageClasses = (sender) => {
    const baseClasses = "max-w-md p-3 rounded-lg border-2 bg-gray-800"
    switch (sender) {
      case "cliente":
        return `${baseClasses} border-green-500 text-green-400`
      case "bot":
        return `${baseClasses} border-blue-500 text-blue-400`
      case "instalador":
        return `${baseClasses} border-red-500 text-red-400`
      default:
        return `${baseClasses} border-gray-500 text-gray-400`
    }
  }

  const getMessageAlignment = (sender) => {
    switch (sender) {
      case "cliente":
        return "justify-start"
      case "bot":
        return "justify-end"
      case "instalador":
        return "justify-start"
      default:
        return "justify-start"
    }
  }

  return (
    <div className="flex-1 p-4 overflow-y-auto scrollbar-custom">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${getMessageAlignment(message.sender)}`}>
            <div className={getMessageClasses(message.sender)}>
              <div className="flex items-center gap-2 mb-2">
                {getSenderIcon(message.sender)}
                <span className="text-sm font-medium">{getSenderLabel(message.sender)}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  {message.timestamp.toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatMessages;
