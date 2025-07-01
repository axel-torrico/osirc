"use client"

import { useState } from "react"
import { ClockIcon, UserIcon, BotIcon, WrenchIcon } from "./Icons"

// Datos de ejemplo - reemplazar con API de Airtable
const mockPedidos = [
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
}

const AdminMessagesView = () => {
  const [selectedPedido, setSelectedPedido] = useState("1")

  const selectedMessages = mockMessages[selectedPedido] || []
  const currentPedido = mockPedidos.find((p) => p.id === selectedPedido)

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

  const getEstadoBadge = (estado) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium"
    switch (estado) {
      case "recibido":
        return `${baseClasses} bg-yellow-500 text-black`
      case "en_asignacion":
        return `${baseClasses} bg-blue-500 text-white`
      case "asignado":
        return `${baseClasses} bg-green-500 text-white`
      case "finalizado":
        return `${baseClasses} bg-gray-500 text-white`
      case "no_asignado":
        return `${baseClasses} bg-red-500 text-white`
      default:
        return `${baseClasses} bg-gray-500 text-white`
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
        return "justify-center"
      default:
        return "justify-start"
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Panel izquierdo - Lista de pedidos */}
      <div className="w-80 border-r-2 border-gray-600 p-4 overflow-y-auto scrollbar-custom">
        <h2 className="text-xl font-bold mb-4 text-center">Pedidos</h2>
        <div className="space-y-3">
          {mockPedidos.map((pedido) => (
            <button
              key={pedido.id}
              onClick={() => setSelectedPedido(pedido.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 hover:bg-gray-800 text-left ${selectedPedido === pedido.id ? "border-white bg-gray-800" : "border-gray-600 hover:border-gray-500"
                }`}
            >
              <div className="font-medium mb-1">Pedido {pedido.id}</div>
              <div className="text-sm text-gray-400 mb-1">{pedido.clienteNombre}</div>
              <div className="text-xs text-gray-500 mb-2">
                {pedido.zona} • {pedido.rubro}
              </div>
              <div className="flex items-center justify-between">
                <span className={getEstadoBadge(pedido.estado)}>{pedido.estado.replace("_", " ")}</span>
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <ClockIcon className="w-3 h-3" />
                  {pedido.fechaCreacion.toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Panel derecho - Chat de mensajes */}
      <div className="flex-1 flex flex-col">
        {/* Header del chat */}
        <div className="border-b-2 border-gray-600 p-4 flex items-center justify-between bg-gray-800">
          <div>
            <h3 className="text-lg font-semibold">
              Pedido {selectedPedido} - {currentPedido?.clienteNombre}
            </h3>
            <p className="text-sm text-gray-400">
              {currentPedido?.zona} • {currentPedido?.rubro}
            </p>
          </div>
          <span className={getEstadoBadge(currentPedido?.estado || "recibido")}>
            {currentPedido?.estado?.replace("_", " ") || "recibido"}
          </span>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-custom">
          <div className="space-y-4">
            {selectedMessages.map((message) => (
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

        {/* Footer con información adicional */}
        <div className="border-t-2 border-gray-600 p-4 bg-gray-800 flex items-center justify-between text-sm text-gray-400">
          <span>Total mensajes: {selectedMessages.length}</span>
          <span>
            Última actividad:{" "}
            {selectedMessages.length > 0
              ? selectedMessages[selectedMessages.length - 1].timestamp.toLocaleString("es-AR")
              : "Sin actividad"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AdminMessagesView
