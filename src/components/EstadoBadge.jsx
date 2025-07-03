const EstadoBadge = ({ estado }) => {
  const baseClasses = "px-2 py-2 rounded text-xs font-medium ";
  switch (estado) {
    case "Received":
      return <span className={`${baseClasses} bg-fuchsia-600 text-white`}>recibido</span>
    case "On assignment":
      return <span className={`${baseClasses} bg-blue-600 text-white`}>en asignación</span>
    case "Assigned":
      return <span className={`${baseClasses} bg-green-600 text-white`}>asignado</span>
    case "Completed":
      return <span className={`${baseClasses} bg-gray-600 text-white`}>finalizado</span>
    case "Unassigned":
      return <span className={`${baseClasses} bg-red-500 text-white`}>no asignado</span>
    default:
      return <span className={`${baseClasses} bg-gray-600 text-white`}>{estado}</span>
  }
}

export default EstadoBadge
