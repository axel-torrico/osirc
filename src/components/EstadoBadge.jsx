const EstadoBadge = ({ estado }) => {
  const baseClasses = "px-2 py-1 rounded text-xs font-medium"
  switch (estado) {
    case "recibido":
      return <span className={`${baseClasses} bg-yellow-500 text-black`}>recibido</span>
    case "en_asignacion":
      return <span className={`${baseClasses} bg-blue-500 text-white`}>en asignación</span>
    case "asignado":
      return <span className={`${baseClasses} bg-green-500 text-white`}>asignado</span>
    case "finalizado":
      return <span className={`${baseClasses} bg-gray-500 text-white`}>finalizado</span>
    case "no_asignado":
      return <span className={`${baseClasses} bg-red-500 text-white`}>no asignado</span>
    default:
      return <span className={`${baseClasses} bg-gray-500 text-white`}>{estado}</span>
  }
}

export default EstadoBadge
