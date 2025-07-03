import AdminMessagesView from "./AdminMessagesView"
import InstaladorsList from "./InstaladorsList"

const DashboardContent = ({ activeSection, activeSubSection }) => {
  const renderContent = () => {
    if (activeSection === "pedidos") {
      if (activeSubSection === "Lista") {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Detalles de Pedidos</h3>
              <p className="text-gray-400">Vista detallada de pedidos - En desarrollo</p>
            </div>
          </div>
        )
      } else if (activeSubSection === "Chat") {
        return <AdminMessagesView />
      }
    }


    if (activeSection === "instaladores") {
      return <InstaladorsList />
    }

    if (activeSection === "zonas") {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Zonas</h3>
            <p className="text-gray-400">Gestión de zonas - En desarrollo</p>
          </div>
        </div>
      )
    }

    // Dashboard principal
    return (
      <div className="border-2 border-gray-600 rounded-2xl p-8 h-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-3/4">
          <div className="border-2 border-gray-600 rounded-xl p-6 hover:border-gray-500 transition-colors">
            <h3 className="text-xl font-semibold mb-4">Pedidos Activos</h3>
            <div className="text-3xl font-bold text-blue-400">12</div>
            <p className="text-gray-400 text-sm mt-2">Pedidos en proceso</p>
          </div>

          <div className="border-2 border-gray-600 rounded-xl p-6 hover:border-gray-500 transition-colors">
            <h3 className="text-xl font-semibold mb-4">Instaladores</h3>
            <div className="text-3xl font-bold text-green-400">8</div>
            <p className="text-gray-400 text-sm mt-2">Instaladores disponibles</p>
          </div>

          <div className="border-2 border-gray-600 rounded-xl p-6 hover:border-gray-500 transition-colors">
            <h3 className="text-xl font-semibold mb-4">Zonas Cubiertas</h3>
            <div className="text-3xl font-bold text-yellow-400">15</div>
            <p className="text-gray-400 text-sm mt-2">Zonas de servicio</p>
          </div>

          <div className="border-2 border-gray-600 rounded-xl p-6 hover:border-gray-500 transition-colors md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Actividad Reciente</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Nuevo pedido - Juan Pérez</span>
                <span className="text-xs text-gray-400">Hace 5 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Instalador asignado - María González</span>
                <span className="text-xs text-gray-400">Hace 15 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pedido completado - Roberto Silva</span>
                <span className="text-xs text-gray-400">Hace 1 hora</span>
              </div>
            </div>
          </div>

          <div className="border-2 border-gray-600 rounded-xl p-6 hover:border-gray-500 transition-colors">
            <h3 className="text-xl font-semibold mb-4">Estado del Sistema</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">Operativo</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return renderContent()
}

export default DashboardContent
