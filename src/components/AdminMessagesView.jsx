"use client"

import { useState } from "react"
import PedidosList from "./PedidosList"
import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatFooter from "./ChatFooter"

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

  return (
    <div className="flex h-full bg-gray-900 text-white">
      <PedidosList pedidos={mockPedidos} selectedPedido={selectedPedido} onSelectPedido={setSelectedPedido} />

      <div className="flex-1 flex flex-col bg-gray-900">
        <ChatHeader pedido={currentPedido} selectedPedido={selectedPedido} />
        <ChatMessages messages={selectedMessages} />
        <ChatFooter messages={selectedMessages} />
      </div>
    </div>
  )
}

export default AdminMessagesView
