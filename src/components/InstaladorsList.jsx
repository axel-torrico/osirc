"use client"

import { useState, useMemo } from "react"
import useInstallers from '../hooks/useInstallers';

const InstaladorsList = () => {
  const { installers, loadingInstallers } = useInstallers();
  const [selectedInstalador, setSelectedInstalador] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOficio, setFilterOficio] = useState("todos")
  const [filterZona, setFilterZona] = useState("todas")

  const mappedInstallers = useMemo(() => {
    if (!installers || !Array.isArray(installers)) return []

    return installers.map((inst) => {
      const nombres = inst["name (from register_orders)"] || []
      const estados = inst["status (from register_orders)"] || []
      const ids = inst["id_client (from register_orders)"] || []

      const clientesActivos = nombres
        .map((nombre, idx) => ({
          nombre,
          id: ids[idx],
          estado: estados[idx]
        }))
        .filter((c) => c.estado !== "Completed")

      return {
        id: inst.id,
        nombre: inst.full_name,
        telefono: inst.phone,
        email: inst.installer_email,
        oficio: inst["name (from job)"]?.[0] || "",
        zona: inst["department (from area)"]?.[0] || "",
        cantidadPedidos: inst.register_orders?.length || 0,
        clientes: clientesActivos,
        estado: inst.status?.trim().toLowerCase() === "available" ? "disponible" : "ocupado"
      }
    })
  }, [installers])

  const oficios = [...new Set(mappedInstallers.map((inst) => inst.oficio))]
  const zonas = [...new Set(mappedInstallers.map((inst) => inst.zona))]

  const instaladoresFiltrados = mappedInstallers.filter((instalador) => {
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
        return <span className={`${baseClasses} bg-green-600 text-white`}>Disponible</span>
      case "ocupado":
        return <span className={`${baseClasses} bg-red-500 text-white`}>Ocupado</span>
      default:
        return <span className={`${baseClasses} bg-gray-500 text-white`}>{estado}</span>
    }
  }

  return (
    <div className="h-full bg-gray-900 text-white">
      <div className="h-full flex flex-col">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-2xl font-bold">Instaladores</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre o email"
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
                <option key={oficio} value={oficio}>{oficio}</option>
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
                <option key={zona} value={zona}>{zona}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-custom">
            {loadingInstallers ? (
              <div className="w-full h-full space-y-4 flex flex-col items-center justify-center">
                <p className="text-center text-gray-400">Cargando instaladores...</p>
                <div className="flex justify-center">
                  <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            ) : instaladoresFiltrados.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <p>Sin resultados</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-800 border-b-2 border-gray-600">
                  <tr>
                    <th className="text-left p-4 font-semibold">Nombre</th>
                    <th className="text-left p-4 font-semibold">Teléfono</th>
                    <th className="text-left p-4 font-semibold">Email</th>
                    <th className="text-left p-4 font-semibold">Oficio</th>
                    <th className="text-left p-4 font-semibold">Zona</th>
                    <th className="text-left p-4 font-semibold">Estados</th>
                  </tr>
                </thead>

                <tbody>
                  {instaladoresFiltrados.map((instalador) => (
                    <tr
                      key={instalador.id}
                      onClick={() => setSelectedInstalador(instalador.id)}
                      className={`border-b border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors ${selectedInstalador === instalador.id ? "bg-gray-800" : ""}`}
                    >
                      <td className="px-3 py-4"><div className="font-medium">{instalador.nombre}</div></td>
                      <td className="px-3 py-4 text-[15px] text-gray-300">{instalador.telefono}</td>
                      <td className="px-3 py-4 text-gray-300">{instalador.email}</td>
                      <td className="px-3 py-4"><span className="px-2 py-1 bg-indigo-600 text-white rounded text-sm whitespace-normal break-words max-w-[135px] inline-block">{instalador.oficio}</span></td>
                      <td className="px-3 py-4 text-gray-300">{instalador.zona}</td>
                      <td className="px-3 py-4">
                        <div className="mb-2">{getEstadoBadge(instalador.estado)}</div>
                        {instalador.estado === "ocupado" && (
                          <div className="flex items-center gap-1">
                            <div className="flex flex-col gap-1 text-gray-300">
                              {instalador.clientes.length > 0 ? (
                                instalador.clientes.map((c) => (
                                  <span key={c.id} className="text-sm">
                                    <span className="font-semibold text-blue-400">#{c.id}</span> - {c.nombre}
                                  </span>
                                ))
                              ) : (
                                "Sin clientes asignados"
                              )}
                            </div>
                            <div className="text-sm text-gray-400">({instalador.zona})</div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="border-t-2 border-gray-600 p-4 bg-gray-800 flex items-center justify-between text-sm text-gray-400 mt-4">
          <span>Total instaladores: {instaladoresFiltrados.length}</span>
          <span>
            Disponibles: {instaladoresFiltrados.filter((i) => i.estado === "disponible").length} |
            Ocupados: {instaladoresFiltrados.filter((i) => i.estado === "ocupado").length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InstaladorsList
