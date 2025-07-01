import React from 'react';

function ChatFooter({ messages }) {
  const ultimaActividad =
    messages.length > 0
      ? messages[messages.length - 1].timestamp.toLocaleString("es-AR")
      : "Sin actividad"

  return (
    <div className="border-t-2 border-gray-600 p-4 bg-gray-800 flex items-center justify-between text-sm text-gray-400">
      <span>Total mensajes: {messages.length}</span>
      <span>Última actividad: {ultimaActividad}</span>
    </div>
  )
}

export default ChatFooter;
