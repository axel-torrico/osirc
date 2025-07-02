"use client"

import { ChevronRightIcon, ChevronDownIcon } from "./Icons"

const NavigationMenu = ({ activeSection, activeSubSection, onSectionChange, onSubSectionChange }) => {
  const menuItems = [
    {
      id: "instaladores",
      label: "Instaladores",
      hasArrow: true,
    },
    {
      id: "zonas",
      label: "Zonas",
      hasArrow: true,
    },
    {
      id: "pedidos",
      label: "Pedidos",
      hasArrow: true,
      hasDropdown: true,
      subItems: ["Lista", "Detalles"],
    },
  ]

  const handleMainItemClick = (itemId, hasDropdown = false) => {
    if (hasDropdown) {
      // Para items con dropdown, solo expandir/colapsar
      if (activeSection === itemId) {
        onSectionChange("dashboard")
        onSubSectionChange(null)
      } else {
        onSectionChange(itemId)
        onSubSectionChange(null)
      }
    } else {
      // Para items sin dropdown, navegar directamente
      onSectionChange(itemId)
      onSubSectionChange(null)
    }
  }

  const handleSubItemClick = (subItem) => {
    onSubSectionChange(subItem)
  }

  return (
    <div className="w-80 border-r-2 border-gray-600 p-6 bg-gray-900 h-full overflow-hidden">
      <div className=" p-6 h-full bg-gray-900 flex flex-col">
        <h2 className="text-xl font-bold mb-8 text-center">Menú</h2>

        <div className="space-y-4 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleMainItemClick(item.id, item.hasDropdown)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 hover:bg-gray-800 flex items-center justify-between ${activeSection === item.id ? "border-white bg-gray-800" : "border-gray-600 hover:border-gray-500"
                  }`}
              >
                <span className="font-medium">{item.label}</span>
                {item.hasArrow && (
                  <>
                    {item.hasDropdown ? (
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-200 ${activeSection === item.id ? "rotate-180" : ""
                          }`}
                      />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5" />
                    )}
                  </>
                )}
              </button>

              {/* Dropdown para pedidos */}
              {item.hasDropdown && activeSection === item.id && item.subItems && (
                <div className="mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem}
                      onClick={() => handleSubItemClick(subItem)}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 hover:bg-gray-800 text-sm ${activeSubSection === subItem
                        ? "border-blue-400 bg-gray-800 text-blue-400"
                        : "border-gray-600 hover:border-gray-500"
                        }`}
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavigationMenu
