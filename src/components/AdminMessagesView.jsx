import React, { useState, useEffect } from 'react';
import PedidosList from "./PedidosList";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import useMessages from '../hooks/useMessages';
import useOrders from '../hooks/useOrders';

function AdminMessagesView() {
  const [selectedPedido, setSelectedPedido] = useState(null);
  const { messages, loadingMessages } = useMessages();
  const { orders, loadingOrders } = useOrders();
  const [showPedidosMobile, setShowPedidosMobile] = useState(false);

  useEffect(() => {
    if (orders.length > 0 && !selectedPedido) {
      setSelectedPedido(orders[0].id);
    }
  }, [orders]);

  const currentPedido = orders.find((p) => p.id === selectedPedido);
  const filteredMessages = messages.filter(
    (msg) => Array.isArray(msg.order) && msg.order.includes(selectedPedido)
  );

  return (
    <div className="relative flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Botón Mobile */}
      <button
        onClick={() => setShowPedidosMobile(true)}
        className="md:hidden p-2 bg-gray-700 text-white"
      >
        Pedidos
      </button>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${showPedidosMobile ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        <button
          onClick={() => setShowPedidosMobile(false)}
          className="px-3 py-2 fixed top-3 right-3 text-white text-sm cursor-pointer rounded-full bg-gray-600"
        >✕</button>
        <PedidosList
          pedidos={orders}
          selectedPedido={selectedPedido}
          onSelectPedido={(id) => {
            setSelectedPedido(id);
            setShowPedidosMobile(false);
          }}
          loading={loadingOrders}
        />
      </div>

      {/* Sidebar Desktop */}
      <div className="hidden md:block border-r-2 border-gray-600 overflow-y-auto scrollbar-custom">
        <PedidosList
          pedidos={orders}
          selectedPedido={selectedPedido}
          onSelectPedido={setSelectedPedido}
          loading={loadingOrders}
        />
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <ChatHeader pedido={currentPedido} selectedPedido={selectedPedido} />
        <ChatMessages messages={filteredMessages} loading={loadingMessages} />
        <ChatFooter messages={filteredMessages} loading={loadingMessages} />
      </div>
    </div>
  );
}

export default AdminMessagesView;
