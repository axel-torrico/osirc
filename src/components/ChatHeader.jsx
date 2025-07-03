import React from 'react';
import EstadoBadge from "./EstadoBadge"

function ChatHeader({ pedido, selectedPedido }) {
  return (
    <div className="border-b-2 border-gray-600 p-4 flex items-center justify-between bg-gray-800">
      <div>
        <h3 className="text-lg font-semibold">
          Pedido {pedido?.id_client ?? selectedPedido} - {pedido?.name}
        </h3>
        <p className="text-sm text-gray-400">
          {pedido?.client_area || "Zona desconocida"} • {pedido?.order}
        </p>
      </div>
      <EstadoBadge estado={pedido?.status || "recibido"} />
    </div>
  )
}


export default ChatHeader;
