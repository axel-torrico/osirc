import React from 'react';
import { UserIcon, BotIcon, WrenchIcon } from "./Icons";

function ChatMessages({ messages, loading }) {
  console.log('messages', messages);

  const normalizeSender = (sender) => {
    if (sender === "installer") return "instalador";
    if (sender === "client") return "cliente";
    return sender;
  };

  const getSenderIcon = (sender) => {
    switch (sender) {
      case "cliente":
        return <UserIcon />;
      case "bot":
        return <BotIcon />;
      case "instalador":
        return <WrenchIcon />;
      default:
        return <UserIcon />;
    }
  };

  const getSenderLabel = (sender) => {
    switch (sender) {
      case "cliente":
        return "Cliente";
      case "bot":
        return "Bot";
      case "instalador":
        return "Instalador";
      default:
        return "Usuario";
    }
  };

  const getMessageClasses = (sender) => {
    const baseClasses = "max-w-md p-3 rounded-lg border-2 bg-gray-800";
    switch (sender) {
      case "cliente":
        return `${baseClasses} border-green-500 text-green-400`;
      case "bot":
        return `${baseClasses} border-fuchsia-500 text-fuchsia-400`;
      case "instalador":
        return `${baseClasses} border-blue-500 text-blue-400`;
      default:
        return `${baseClasses} border-gray-500 text-gray-400`;
    }
  };

  const getMessageAlignment = (sender) => {
    switch (sender) {
      case "cliente":
        return "justify-start";
      case "bot":
        return "justify-end";
      case "instalador":
        return "justify-start";
      default:
        return "justify-start";
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto scrollbar-custom">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <p className="text-center text-gray-400">Cargando mensajes...</p>
          <div className="flex justify-center">
            <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            const sender = normalizeSender(msg.sender);
            const time = msg.timestamp
              ? new Date(msg.timestamp).toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              : "";

            return (
              <div key={msg.id} className={`flex ${getMessageAlignment(sender)}`}>
                <div className={getMessageClasses(sender)}>
                  <div className="flex items-center gap-2 mb-2">
                    {getSenderIcon(sender)}
                    <span className="text-sm font-medium">{getSenderLabel(sender)}</span>
                    <span className="text-xs text-gray-500 ml-auto">{time}</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ChatMessages;
