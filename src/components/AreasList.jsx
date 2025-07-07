"use client"

import { useState, useMemo } from "react"
import useAreas from "../hooks/useAreas"

const AreasList = () => {
  const { areas, loadingAreas } = useAreas()
  const [selectedArea, setSelectedArea] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAreas = useMemo(() => {
    if (!areas || !Array.isArray(areas)) return []

    return areas.filter((area) => {
      const matchSearch =
        area.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.state?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchSearch
    })
  }, [areas, searchTerm])

  return (
    <div className="h-full bg-gray-900 text-white">
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Zonas</h1>
          <input
            type="text"
            placeholder="Buscar zona"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-custom">
            {loadingAreas ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <p>Cargando áreas...</p>
                <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin mt-2"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-800 border-b-2 border-gray-600">
                  <tr>
                    <th className="text-left p-4">Departamento</th>
                    <th className="text-left p-4">Provincia</th>
                    <th className="text-left p-4">Instaladores</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAreas.map((area) => (
                    <tr
                      key={area.id}
                      onClick={() => setSelectedArea(area.id)}
                      className={`border-b border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors ${selectedArea === area.id ? "bg-gray-800" : ""}`}
                    >
                      <td className="px-3 py-4 font-medium">{area.department}</td>
                      <td className="px-3 py-4 text-gray-300">{area.state}</td>
                      <td className="px-3 py-4 text-gray-300">
                        {area.installer?.length > 0
                          ? area.installer.length + " instalador(es)"
                          : <span className="text-red-400 italic">Sin instaladores</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="border-t-2 border-gray-600 p-4 bg-gray-800 text-sm text-gray-400 mt-4 flex justify-between">
          <span>Total áreas: {filteredAreas.length}</span>
        </div>
      </div>
    </div>
  )
}

export default AreasList
