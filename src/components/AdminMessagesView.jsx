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
        <ChatMessages messages={messages} loading={loadingMessages} />
        <ChatFooter messages={messages} loading={loadingMessages} />
      </div>
    </div>
  );
}

export default AdminMessagesView;






/* import React, { useState, useEffect } from 'react';
import PedidosList from "./PedidosList"
import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatFooter from "./ChatFooter"
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

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <button
        onClick={() => setShowPedidosMobile(!showPedidosMobile)}
        className="md:hidden p-2 bg-gray-700 text-white w-full"
      >
        {showPedidosMobile ? "Ocultar pedidos" : "Ver pedidos"}
      </button>

      {(showPedidosMobile || window.innerWidth >= 768) && (
        <PedidosList
          pedidos={orders}
          selectedPedido={selectedPedido}
          onSelectPedido={setSelectedPedido}
          loading={loadingOrders}
        />
      )}

      <div className="flex-1 flex flex-col">
        <ChatHeader pedido={currentPedido} selectedPedido={selectedPedido} />
        <ChatMessages messages={messages} loading={loadingMessages} />
        <ChatFooter messages={messages} loading={loadingMessages} />
      </div>
    </div>
  );
}

export default AdminMessagesView; */





// Datos de ejemplo - reemplazar con API de Airtable
/* const mockPedidos = [
  {
    id: "1",
    clienteNombre: "Juan Pérez",
    zona: "Palermo",
    rubro: "electricidad",
    estado: "asignado",
    fechaCreacion: new Date("2024-01-15T10:30:00"),
    instaladorAsignado: "Carlos Electricista",
  },
  {
    id: "2",
    clienteNombre: "María González",
    zona: "Villa Crespo",
    rubro: "plomería",
    estado: "en_asignacion",
    fechaCreacion: new Date("2024-01-15T11:15:00"),
  },
  {
    id: "3",
    clienteNombre: "Roberto Silva",
    zona: "Belgrano",
    rubro: "gas",
    estado: "finalizado",
    fechaCreacion: new Date("2024-01-15T09:45:00"),
    instaladorAsignado: "Ana Gasista",
  },
  {
    id: "4",
    clienteNombre: "Laura Martín",
    zona: "Recoleta",
    rubro: "pintura",
    estado: "recibido",
    fechaCreacion: new Date("2024-01-15T12:00:00"),
  },
  {
    id: "5",
    clienteNombre: "Laura Martín",
    zona: "Recoleta",
    rubro: "pintura",
    estado: "recibido",
    fechaCreacion: new Date("2024-01-15T12:00:00"),
  },
]

const mockMessages = {
  1: [
    {
      id: "1-1",
      content: "Hola, necesito ayuda con un problema eléctrico en mi casa",
      sender: "cliente",
      timestamp: new Date("2024-01-15T10:30:00"),
      pedidoId: "1",
    },
    {
      id: "1-2",
      content: "¡Hola Juan! Te ayudo con tu consulta. ¿Podrías contarme más detalles sobre el problema eléctrico?",
      sender: "bot",
      timestamp: new Date("2024-01-15T10:30:30"),
      pedidoId: "1",
    },
    {
      id: "1-3",
      content: "Se cortó la luz en toda la cocina y no sé qué pasó",
      sender: "cliente",
      timestamp: new Date("2024-01-15T10:31:00"),
      pedidoId: "1",
    },
    {
      id: "1-4",
      content:
        "Perfecto, he clasificado tu consulta como ELECTRICIDAD - URGENCIA ALTA. Buscando electricista disponible en Palermo...",
      sender: "bot",
      timestamp: new Date("2024-01-15T10:31:15"),
      pedidoId: "1",
    },
    {
      id: "1-5",
      content:
        "Hola Juan, soy Carlos, electricista. Acepto tu solicitud. Puedo ir hoy a las 15:00 hs. ¿Te parece bien?",
      sender: "instalador",
      timestamp: new Date("2024-01-15T10:35:00"),
      pedidoId: "1",
    },
  ],
  2: [
    {
      id: "2-1",
      content: "Tengo una pérdida de agua en el baño",
      sender: "cliente",
      timestamp: new Date("2024-01-15T11:15:00"),
      pedidoId: "2",
    },
    {
      id: "2-2",
      content:
        "Hola María, entiendo que tienes un problema de plomería. ¿Podrías especificar dónde exactamente es la pérdida?",
      sender: "bot",
      timestamp: new Date("2024-01-15T11:15:30"),
      pedidoId: "2",
    },
    {
      id: "2-3",
      content: "Es en la canilla del lavatorio, gotea mucho",
      sender: "cliente",
      timestamp: new Date("2024-01-15T11:16:00"),
      pedidoId: "2",
    },
    {
      id: "2-4",
      content: "Clasificado como PLOMERÍA - URGENCIA MEDIA. Buscando plomero disponible en Villa Crespo...",
      sender: "bot",
      timestamp: new Date("2024-01-15T11:16:15"),
      pedidoId: "2",
    },
  ],
  3: [
    {
      id: "3-1",
      content: "Hola, necesito que revisen mi instalación de gas",
      sender: "cliente",
      timestamp: new Date("2024-01-15T09:45:00"),
      pedidoId: "3",
    },
    {
      id: "3-2",
      content: "Hola Roberto, soy Ana, gasista matriculada. Ya terminé el trabajo. Todo quedó perfecto.",
      sender: "instalador",
      timestamp: new Date("2024-01-15T14:30:00"),
      pedidoId: "3",
    },
  ],
  4: [
    {
      id: "4-1",
      content: "Necesito pintar mi departamento",
      sender: "cliente",
      timestamp: new Date("2024-01-15T12:00:00"),
      pedidoId: "4",
    },
    {
      id: "4-2",
      content: "Hola Laura, gracias por contactarnos. ¿Qué ambientes necesitas pintar y de qué colores?",
      sender: "bot",
      timestamp: new Date("2024-01-15T12:00:30"),
      pedidoId: "4",
    },
  ],
} */
