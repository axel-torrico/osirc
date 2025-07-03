import React from 'react';
import { ClockIcon } from "./Icons";
import EstadoBadge from "./EstadoBadge";


function PedidosList({ pedidos, selectedPedido, onSelectPedido, loading }) {
  return (
    <div className="w-80 p-4 overflow-y-auto scrollbar-custom">
      <h2 className="text-xl font-bold mb-4 text-center">Pedidos</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <p className="text-center text-gray-400">Cargando pedidos...</p>
          <div className="flex justify-center">
            <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {pedidos.map((pedido) => (
            <button
              key={pedido.id}
              onClick={() => onSelectPedido(pedido.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 hover:bg-gray-800 text-left ${selectedPedido === pedido.id
                ? "border-white bg-gray-800"
                : "border-gray-600 hover:border-gray-500"
                }`}
            >
              <div className="font-medium mb-1">Pedido {pedido.id_client ?? pedido.id}</div>
              <div className="text-sm text-gray-400 mb-1">{pedido.name}</div>
              <div className="text-xs text-gray-500 mb-2">
                {pedido.client_area ?? "Sin zona"} • {pedido.order}
              </div>
              <div className="flex items-center justify-between">
                <EstadoBadge estado={pedido.status} />
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <ClockIcon className="w-3 h-3" />
                  {new Date(pedido.date).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}hs
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}






/* function PedidosList({ pedidos, selectedPedido, onSelectPedido, loading }) {
  console.log('PedidosList pedidos', pedidos);
  return (
    <div className="w-80 border-r-2 border-gray-600 p-4 overflow-y-auto scrollbar-custom">
      <h2 className="text-xl font-bold mb-4 text-center">Pedidos</h2>
      <div className="space-y-3">
        {pedidos.map((pedido) => (
          <button
            key={pedido.id}
            onClick={() => onSelectPedido(pedido.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 hover:bg-gray-800 text-left ${selectedPedido === pedido.id
              ? "border-white bg-gray-800"
              : "border-gray-600 hover:border-gray-500"
              }`}
          >
            <div className="font-medium mb-1">Pedido {pedido.id_client ?? pedido.id}</div>
            <div className="text-sm text-gray-400 mb-1">{pedido.name}</div>
            <div className="text-xs text-gray-500 mb-2">
              {pedido.client_area ?? "Sin zona"} • {pedido.order}
            </div>
            <div className="flex items-center justify-between">
              <EstadoBadge estado={pedido.status} />
              <div className="flex items-center text-xs text-gray-500 gap-1">
                <ClockIcon className="w-3 h-3" />
                {new Date(pedido.date).toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}hs
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} */

export default PedidosList
