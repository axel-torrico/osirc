import AdminMessagesView from "./AdminMessagesView";
import InstaladorsList from "./InstaladorsList";
import PedidosListView from "./PedidosListView";
import AreasList from "./AreasList";
import StatCard from "./StatCard";
import useOrders from "../hooks/useOrders";
import useInstallers from "../hooks/useInstallers";
import useMessages from "../hooks/useMessages";
import useAreas from "../hooks/useAreas";

const DashboardContent = ({ activeSection, activeSubSection }) => {
  const { messages, loadingMessages } = useMessages();
  const { orders, loadingOrders } = useOrders();
  const { installers, loadingInstallers } = useInstallers();
  const { areas, loadingAreas } = useAreas();

  const activeOrders = orders?.filter(order => order.status !== "Completed") || [];
  const completedOrders = orders?.filter(order => order.status === "Completed") || [];
  const todaysOrders = orders?.filter(order => {
    const today = new Date();
    const orderDate = new Date(order.date);
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  }) || [];

  const availableInstallers = installers?.filter(i => i.status?.trim() === "Available") || [];
  const uniqueAreas = Array.from(new Set(areas?.map(a => a.department)));
  const coveragePercentage = areas?.length ? Math.round((uniqueAreas.length / areas.length) * 100) : 0;

  const renderContent = () => {
    if (activeSection === "pedidos") {
      if (activeSubSection === "Lista") return <PedidosListView />;
      if (activeSubSection === "Chat") return <AdminMessagesView />;
    }

    if (activeSection === "instaladores") {
      return <InstaladorsList />;
    }

    if (activeSection === "zonas") {
      return <AreasList />
    }

    return (
      <div className="p-8 min-h-full overflow-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard title="Pedidos Activos" value={loadingOrders ? "..." : activeOrders.length} color="text-blue-400" subtitle="Pedidos en proceso" />
          <StatCard title="Instaladores" value={loadingInstallers ? "..." : availableInstallers.length} color="text-green-400" subtitle="Instaladores disponibles" />
          <StatCard title="Zonas Cubiertas" value={loadingAreas ? "..." : uniqueAreas.length} color="text-yellow-400" subtitle="Zonas de servicio" />
          <StatCard title="Pedidos Hoy" value={loadingOrders ? "..." : todaysOrders.length} color="text-purple-400" subtitle="Ingresados hoy" />
          <StatCard title="Pedidos Completados" value={loadingOrders ? "..." : completedOrders.length} color="text-gray-200" subtitle="Histórico total" />
          <StatCard title="Cobertura" value={loadingAreas ? "..." : `${coveragePercentage}%`} color="text-cyan-400" subtitle="Zonas activas / posibles" />
        </div>

        <div className="border-2 border-gray-600 rounded-xl p-6 hover:border-gray-500 transition-colors">
          <h3 className="text-xl font-semibold mb-4">Actividad Reciente</h3>
          <div className="space-y-3 max-h-[250px] overflow-y-auto">
            {loadingMessages ? (
              <p className="text-gray-400">Cargando mensajes...</p>
            ) : messages?.slice(-4).reverse().map((msg) => (
              <div key={msg.id} className="flex justify-between">
                <div className="max-w-[35%] flex flex-col gap-1">
                  <span className=" ext-sm truncate">
                    {msg.sender === "client" && "Mensaje de cliente"}
                    {msg.sender === "installer" && "Mensaje de instalador"}
                    {msg.sender === "bot" && "Mensaje de bot"}
                    {" - "}{msg["name (from order)"]?.[0]}
                  </span>

                  <span className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour12: false,
                    })}hs
                  </span>
                </div>
                <span className="w-full max-w-[65%] text-start truncate">{msg.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default DashboardContent;
