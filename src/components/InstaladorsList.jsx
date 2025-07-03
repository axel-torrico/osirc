"use client"

import { useState } from "react"
import { UserIcon, PhoneIcon, MailIcon, WrenchIcon, MapPinIcon, HashIcon } from "./Icons"

// Datos de ejemplo de instaladores
const mockInstaladores = [
  {
    id: "1",
    nombre: "Carlos Rodríguez",
    telefono: "+54 11 1234-5678",
    email: "carlos.electricista@email.com",
    oficio: "Electricista",
    zona: "Palermo",
    cantidadPedidos: 15,
    estado: "disponible",
  },
  {
    id: "2",
    nombre: "Ana García",
    telefono: "+54 11 2345-6789",
    email: "ana.gasista@email.com",
    oficio: "Gasista",
    zona: "Villa Crespo",
    cantidadPedidos: 23,
    estado: "ocupado",
  },
  {
    id: "3",
    nombre: "Miguel Torres",
    telefono: "+54 11 3456-7890",
    email: "miguel.plomero@email.com",
    oficio: "Plomero",
    zona: "Belgrano",
    cantidadPedidos: 8,
    estado: "disponible",
  },
  {
    id: "4",
    nombre: "Laura Martínez",
    telefono: "+54 11 4567-8901",
    email: "laura.pintura@email.com",
    oficio: "Pintora",
    zona: "Recoleta",
    cantidadPedidos: 12,
    estado: "disponible",
  },
  {
    id: "5",
    nombre: "Roberto Silva",
    telefono: "+54 11 5678-9012",
    email: "roberto.carpintero@email.com",
    oficio: "Carpintero",
    zona: "San Telmo",
    cantidadPedidos: 19,
    estado: "ocupado",
  },
  {
    id: "6",
    nombre: "María López",
    telefono: "+54 11 6789-0123",
    email: "maria.electricista@email.com",
    oficio: "Electricista",
    zona: "Palermo",
    cantidadPedidos: 31,
    estado: "disponible",
  },
  {
    id: "7",
    nombre: "Diego Fernández",
    telefono: "+54 11 7890-1234",
    email: "diego.gasista@email.com",
    oficio: "Gasista",
    zona: "Caballito",
    cantidadPedidos: 7,
    estado: "disponible",
  },
  {
    id: "8",
    nombre: "Carmen Ruiz",
    telefono: "+54 11 8901-2345",
    email: "carmen.plomera@email.com",
    oficio: "Plomera",
    zona: "Flores",
    cantidadPedidos: 14,
    estado: "ocupado",
  },
]

const InstaladorsList = () => {
  const [selectedInstalador, setSelectedInstalador] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOficio, setFilterOficio] = useState("todos")
  const [filterZona, setFilterZona] = useState("todas")

  // Filtros únicos
  const oficios = [...new Set(mockInstaladores.map((inst) => inst.oficio))]
  const zonas = [...new Set(mockInstaladores.map((inst) => inst.zona))]

  // Filtrar instaladores
  const instaladoresFiltrados = mockInstaladores.filter((instalador) => {
    const matchesSearch =
      instalador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instalador.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOficio = filterOficio === "todos" || instalador.oficio === filterOficio
    const matchesZona = filterZona === "todas" || instalador.zona === filterZona

    return matchesSearch && matchesOficio && matchesZona
  })

  const getEstadoBadge = (estado) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium"
    switch (estado) {
      case "disponible":
        return <span className={`${baseClasses} bg-green-500 text-white`}>Disponible</span>
      case "ocupado":
        return <span className={`${baseClasses} bg-red-500 text-white`}>Ocupado</span>
      default:
        return <span className={`${baseClasses} bg-gray-500 text-white`}>{estado}</span>
    }
  }

  return (
    <div className="h-full bg-gray-900 text-white">
      <div className="border-2 border-gray-600 rounded-2xl p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Instaladores</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
            <select
              value={filterOficio}
              onChange={(e) => setFilterOficio(e.target.value)}
              className="pl-3 pr-10 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "16px",
              }}
            >
              <option value="todos">Todos los oficios</option>
              {oficios.map((oficio) => (
                <option key={oficio} value={oficio}>
                  {oficio}
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
          </div>
        </div>

        {/* Tabla de instaladores */}
        <div className="flex-1 overflow-hidden ">
          <div className="h-full overflow-y-auto scrollbar-custom ">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-800 border-b-2 border-gray-600">
                <tr>
                  <th className="text-left p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      Nombre
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
                      <WrenchIcon className="w-4 h-4" />
                      Oficio
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
                      <HashIcon className="w-4 h-4" />
                      Total de pedidos
                    </div>
                  </th>
                  <th className="text-left p-4 font-semibold">Estados</th>
                </tr>
              </thead>
              <tbody>
                {instaladoresFiltrados.map((instalador) => (
                  <tr
                    key={instalador.id}
                    onClick={() => setSelectedInstalador(instalador.id)}
                    className={`border-b border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors ${selectedInstalador === instalador.id ? "bg-gray-800" : ""
                      }`}
                  >
                    <td className="p-4">
                      <div className="font-medium">{instalador.nombre}</div>
                    </td>
                    <td className="p-4 text-gray-300">{instalador.telefono}</td>
                    <td className="p-4 text-gray-300">{instalador.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-600 text-white rounded text-sm">{instalador.oficio}</span>
                    </td>
                    <td className="p-4 text-gray-300">{instalador.zona}</td>
                    <td className="p-4 text-center">
                      <span className="text-lg font-bold text-blue-400">{instalador.cantidadPedidos}</span>
                    </td>
                    <td className="p-4">{getEstadoBadge(instalador.estado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer con estadísticas */}
        <div className="border-t-2 border-gray-600 p-4 bg-gray-800 flex items-center justify-between text-sm text-gray-400 mt-4">
          <span>Total instaladores: {instaladoresFiltrados.length}</span>
          <span>
            Disponibles: {instaladoresFiltrados.filter((i) => i.estado === "disponible").length} | Ocupados:{" "}
            {instaladoresFiltrados.filter((i) => i.estado === "ocupado").length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InstaladorsList
