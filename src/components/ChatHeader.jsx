import React from 'react';
import EstadoBadge from "./EstadoBadge"

function ChatHeader({ pedido, selectedPedido }) {
  return (
    <div className="border-b-2 border-gray-600 p-4 flex items-center justify-between bg-gray-800">
      <div>
        <h3 className="text-lg font-semibold">
          Pedido {selectedPedido} - {pedido?.clienteNombre}
        </h3>
        <p className="text-sm text-gray-400">
          {pedido?.zona} • {pedido?.rubro}
        </p>
      </div>
      <EstadoBadge estado={pedido?.estado || "recibido"} />
    </div>
  )
}

export default ChatHeader;
