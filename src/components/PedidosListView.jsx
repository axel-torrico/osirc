"use client"

import { useState, useMemo } from "react"
import useOrders from "../hooks/useOrders"

const PedidosListView = () => {
  const { orders, loadingOrders } = useOrders()
  const [selectedPedido, setSelectedPedido] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState("todos")
  const [filterZona, setFilterZona] = useState("todas")
  const [filterUrgencia, setFilterUrgencia] = useState("todas")
  console.log("orders:", orders);

  const emergencyMap = {
    high: "alta",
    medium: "media",
    low: "baja"
  }

  const statusMap = {
    received: "recibido",
    assigned: "asignado",
    unassigned: "no asignado",
    "on assignment": "en asignacion",
    completed: "finalizado"
  }

  const mappedOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return []

    return orders.map((order) => {
      const rawUrgencia = order.emergency?.toLowerCase()
      const rawEstado = order.status?.toLowerCase().trim()

      return {
        id: order.id_client,
        orden: order.order || "",
        nombreCliente: order.name || "",
        nombreInstalador: order["full_name (from installer)"]?.[0] || "",
        telefono: order.client_phone || "",
        email: order.client_email || "",
        zona: order.client_area || "",
        urgencia: emergencyMap[rawUrgencia] || "",
        estado: statusMap[rawEstado] || ""
      }
    })
  }, [orders])

  const zonas = [...new Set(mappedOrders.map((pedido) => pedido.zona))]
  const urgencias = ["baja", "media", "alta"]
  const estados = ["recibido", "en asignacion", "asignado", "no asignado", "finalizado"]

  const pedidosFiltrados = mappedOrders.filter((pedido) => {
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
    const base = "px-2 py-1 rounded text-xs font-medium whitespace-nowrap max-w-[110px] overflow-hidden text-ellipsis"

    switch (estado) {
      case "recibido":
        return <span className={`${base} bg-fuchsia-600  text-white`}>recibido</span>
      case "en asignacion":
        return <span className={`${base} bg-blue-600 text-white`}>en asignación</span>
      case "asignado":
        return <span className={`${base} bg-green-600 text-white`}>asignado</span>
      case "no asignado":
        return <span className={`${base} bg-red-500 text-white`}>no asignado</span>
      case "finalizado":
        return <span className={`${base} bg-gray-600 text-white`}>finalizado</span>
      default:
        return <span className={`${base} bg-gray-600 text-white`}>{estado}</span>
    }
  }

  const getUrgenciaBadge = (urgencia) => {
    const base = "px-2 py-1 rounded text-xs font-medium whitespace-nowrap max-w-[110px] overflow-hidden text-ellipsis"

    switch (urgencia) {
      case "baja":
        return <span className={`${base} bg-gray-500 text-white`}>baja</span>
      case "media":
        return <span className={`${base} bg-orange-500 text-white`}>media</span>
      case "alta":
        return <span className={`${base} bg-red-500 text-white`}>alta</span>
      default:
        return <span className={`${base} bg-gray-500 text-white`}>{urgencia}</span>
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
            <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className="pl-3 pr-10 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400">
              <option value="todos">Todos los estados</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>{estado.charAt(0).toUpperCase() + estado.slice(1)}</option>
              ))}
            </select>
            <select value={filterZona} onChange={(e) => setFilterZona(e.target.value)} className="pl-3 pr-10 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400">
              <option value="todas">Todas las zonas</option>
              {zonas.map((zona) => (
                <option key={zona} value={zona}>{zona}</option>
              ))}
            </select>
            <select value={filterUrgencia} onChange={(e) => setFilterUrgencia(e.target.value)} className="pl-3 pr-10 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400">
              <option value="todas">Todas las urgencias</option>
              {urgencias.map((urgencia) => (
                <option key={urgencia} value={urgencia}>{urgencia.charAt(0).toUpperCase() + urgencia.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-custom">
            {loadingOrders ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <p>Cargando pedidos...</p>
                <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin mt-2"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-800 border-b-2 border-gray-600">
                  <tr>
                    <th className="text-left p-4">N° Pedido</th>
                    <th className="text-left p-4">Cliente</th>
                    <th className="text-left p-4">Instalador</th>
                    <th className="text-left p-4">Teléfono</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Zona</th>
                    <th className="text-left p-4">Urgencia</th>
                    <th className="text-left p-4">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosFiltrados.map((pedido) => (
                    <tr key={pedido.id} onClick={() => setSelectedPedido(pedido.id)} className={`border-b border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors ${selectedPedido === pedido.id ? "bg-gray-800" : ""}`}>
                      <td className="px-3 py-4 text-blue-400 font-medium">{pedido.id}</td>
                      <td className="px-3 py-4 font-medium">{pedido.nombreCliente}</td>
                      <td className="px-3 py-4 text-gray-300">
                        {pedido.nombreInstalador ? pedido.nombreInstalador + " - " + pedido.orden : <span className="text-red-400 italic">Sin asignar</span>}
                      </td>
                      <td className="px-3 py-4 text-gray-300">{pedido.telefono}</td>
                      <td className="px-3 py-4 text-gray-300">{pedido.email}</td>
                      <td className="px-3 py-4">
                        <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium whitespace-nowrap max-w-[110px] inline-block overflow-hidden text-ellipsis">
                          {pedido.zona}
                        </span>
                      </td>
                      <td className="px-3 py-4">{getUrgenciaBadge(pedido.urgencia)}</td>
                      <td className="px-3 py-4">{getEstadoBadge(pedido.estado)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="border-t-2 border-gray-600 p-4 bg-gray-800 flex justify-between text-sm text-gray-400 mt-4">
          <span>Total pedidos: {pedidosFiltrados.length}</span>
          <div className="flex gap-4">
            <span>Recibidos: {pedidosFiltrados.filter((p) => p.estado === "recibido").length}</span>
            <span>En Asignación: {pedidosFiltrados.filter((p) => p.estado === "en asignacion").length}</span>
            <span>Asignados: {pedidosFiltrados.filter((p) => p.estado === "asignado").length}</span>
            <span>No Asignados: {pedidosFiltrados.filter((p) => p.estado === "no asignado").length}</span>
            <span>Finalizados: {pedidosFiltrados.filter((p) => p.estado === "finalizado").length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PedidosListView
