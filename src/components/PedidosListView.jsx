
"use client"

import { useState } from "react"
import { UserIcon, PhoneIcon, MailIcon, WrenchIcon, MapPinIcon, HashIcon, ClipboardListIcon, ExclamationIcon } from "./Icons"

// Datos de ejemplo de instaladores
const mockPedidos = [{
  id: "1",
  orden: "ORD-2024-001",
  nombreCliente: "Juan Pérez",
  nombreInstalador: "Carlos Rodríguez",
  telefono: "+54 11 1234-5678",
  email: "juan.perez@email.com",
  zona: "Palermo",
  urgencia: "alta",
  estado: "recibidos",
  fechaCreacion: "2024-01-15",
},
{
  id: "2",
  orden: "ORD-2024-002",
  nombreCliente: "María González",
  nombreInstalador: "Ana García",
  telefono: "+54 11 2345-6789",
  email: "maria.gonzalez@email.com",
  zona: "Villa Crespo",
  urgencia: "media",
  estado: "en asignacion",
  fechaCreacion: "2024-01-16",
},
{
  id: "3",
  orden: "ORD-2024-003",
  nombreCliente: "Roberto Silva",
  nombreInstalador: "Miguel Torres",
  telefono: "+54 11 3456-7890",
  email: "roberto.silva@email.com",
  zona: "Belgrano",
  urgencia: "baja",
  estado: "asignados",
  fechaCreacion: "2024-01-17",
},
{
  id: "4",
  orden: "ORD-2024-004",
  nombreCliente: "Laura Martínez",
  nombreInstalador: "",
  telefono: "+54 11 4567-8901",
  email: "laura.martinez@email.com",
  zona: "Recoleta",
  urgencia: "alta",
  estado: "no asignados",
  fechaCreacion: "2024-01-18",
},
{
  id: "5",
  orden: "ORD-2024-005",
  nombreCliente: "Diego Fernández",
  nombreInstalador: "Roberto Silva",
  telefono: "+54 11 5678-9012",
  email: "diego.fernandez@email.com",
  zona: "San Telmo",
  urgencia: "alta",
  estado: "asignados",
  fechaCreacion: "2024-01-19",
},
{
  id: "6",
  orden: "ORD-2024-006",
  nombreCliente: "Carmen Ruiz",
  nombreInstalador: "",
  telefono: "+54 11 6789-0123",
  email: "carmen.ruiz@email.com",
  zona: "Caballito",
  urgencia: "media",
  estado: "no asignados",
  fechaCreacion: "2024-01-20",
},
{
  id: "7",
  orden: "ORD-2024-007",
  nombreCliente: "Andrés López",
  nombreInstalador: "María López",
  telefono: "+54 11 7890-1234",
  email: "andres.lopez@email.com",
  zona: "Flores",
  urgencia: "baja",
  estado: "recibidos",
  fechaCreacion: "2024-01-21",
},
{
  id: "8",
  orden: "ORD-2024-008",
  nombreCliente: "Sofía Torres",
  nombreInstalador: "Diego Fernández",
  telefono: "+54 11 8901-2345",
  email: "sofia.torres@email.com",
  zona: "Palermo",
  urgencia: "alta",
  estado: "en asignacion",
  fechaCreacion: "2024-01-22",
},
]

const PedidosListView = () => {
  const [selectedPedido, setSelectedPedido] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState("todos")
  const [filterZona, setFilterZona] = useState("todas")
  const [filterUrgencia, setFilterUrgencia] = useState("todas")

  // Filtros únicos
  const estados = ["recibidos", "en asignacion", "asignados", "no asignados"]
  const zonas = [...new Set(mockPedidos.map((pedido) => pedido.zona))]
  const urgencias = ["baja", "media", "alta"]

  // Filtrar pedidos
  const pedidosFiltrados = mockPedidos.filter((pedido) => {
    const matchesSearch =
      pedido.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.orden.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.nombreInstalador.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEstado = filterEstado === "todos" || pedido.estado === filterEstado
    const matchesZona = filterZona === "todas" || pedido.zona === filterZona
    const matchesUrgencia = filterUrgencia === "todas" || pedido.urgencia === filterUrgencia

    return matchesSearch && matchesEstado && matchesZona && matchesUrgencia
  })
  const getEstadoBadge = (estado) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium"
    switch (estado) {
      case "recibidos":
        return <span className={`${baseClasses} bg-blue-500 text-white`}>Recibidos</span>
      case "en asignacion":
        return <span className={`${baseClasses} bg-yellow-500 text-white`}>En Asignación</span>
      case "asignados":
        return <span className={`${baseClasses} bg-green-500 text-white`}>Asignados</span>
      case "no asignados":
        return <span className={`${baseClasses} bg-red-500 text-white`}>No Asignados</span>
      default:
        return <span className={`${baseClasses} bg-gray-500 text-white`}>{estado}</span>
    }
  }

  const getUrgenciaBadge = (urgencia) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium"
    switch (urgencia) {
      case "baja":
        return <span className={`${baseClasses} bg-gray-500 text-white`}>Baja</span>
      case "media":
        return <span className={`${baseClasses} bg-orange-500 text-white`}>Media</span>
      case "alta":
        return <span className={`${baseClasses} bg-red-500 text-white`}>Alta</span>
      default:
        return <span className={`${baseClasses} bg-gray-500 text-white`}>{urgencia}</span>
    }
  }

  return (
    <div className="h-full bg-gray-900 text-white">
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar por cliente, orden, instalador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="pl-3 pr-10 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "16px",
              }}
            >
              <option value="todos">Todos los estados</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={filterZona}
              onChange={(e) => setFilterZona(e.target.value)}
              className="pl-3 pr-10 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "16px",
              }}
            >
              <option value="todas">Todas las zonas</option>
              {zonas.map((zona) => (
                <option key={zona} value={zona}>
                  {zona}
                </option>
              ))}
            </select>
            <select
              value={filterUrgencia}
              onChange={(e) => setFilterUrgencia(e.target.value)}
              className="pl-3 pr-10 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "16px",
              }}
            >
              <option value="todas">Todas las urgencias</option>
              {urgencias.map((urgencia) => (
                <option key={urgencia} value={urgencia}>
                  {urgencia.charAt(0).toUpperCase() + urgencia.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla de pedidos */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-custom">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-800 border-b-2 border-gray-600">
                <tr>
                  <th className="text-left p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <HashIcon className="w-4 h-4" />
                      Orden
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      Cliente
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <WrenchIcon className="w-4 h-4" />
                      Instalador
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4" />
                      Teléfono
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <MailIcon className="w-4 h-4" />
                      Email
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      Zona
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <ExclamationIcon className="w-4 h-4" />
                      Urgencia
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <ClipboardListIcon className="w-4 h-4" />
                      Estado
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((pedido) => (
                  <tr
                    key={pedido.id}
                    onClick={() => setSelectedPedido(pedido.id)}
                    className={`border-b border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors ${selectedPedido === pedido.id ? "bg-gray-800" : ""
                      }`}
                  >
                    <td className="p-4">
                      <div className="font-medium text-blue-400">{pedido.orden}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{pedido.nombreCliente}</div>
                    </td>
                    <td className="p-4 text-gray-300">
                      {pedido.nombreInstalador || <span className="text-red-400 italic">Sin asignar</span>}
                    </td>
                    <td className="p-4 text-gray-300">{pedido.telefono}</td>
                    <td className="p-4 text-gray-300">{pedido.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-600 text-white rounded text-sm">{pedido.zona}</span>
                    </td>
                    <td className="p-4">{getUrgenciaBadge(pedido.urgencia)}</td>
                    <td className="p-4">{getEstadoBadge(pedido.estado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer con estadísticas */}
        <div className="border-t-2 border-gray-600 p-4 bg-gray-800 flex items-center justify-between text-sm text-gray-400 mt-4">
          <span>Total pedidos: {pedidosFiltrados.length}</span>
          <div className="flex gap-4">
            <span>Recibidos: {pedidosFiltrados.filter((p) => p.estado === "recibidos").length}</span>
            <span>En Asignación: {pedidosFiltrados.filter((p) => p.estado === "en asignacion").length}</span>
            <span>Asignados: {pedidosFiltrados.filter((p) => p.estado === "asignados").length}</span>
            <span>No Asignados: {pedidosFiltrados.filter((p) => p.estado === "no asignados").length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PedidosListView
