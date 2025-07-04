"use client"

import { ChevronRightIcon, ChevronDownIcon } from "./Icons"

const NavigationMenu = ({ activeSection, activeSubSection, onSectionChange, onSubSectionChange }) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      hasArrow: true,
    },
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
      subItems: ["Lista", "Chat"],
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
    <div className="w-60 p-4 border-r-2 border-gray-900 bg-gray-800 h-full overflow-hidden">
      <div className="h-fullflex flex-col">
        <div className="mb-6 pb-4 border-b-1 border-gray-600">
          <h2 className="text-xl font-bold text-center">OSIRC</h2>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleMainItemClick(item.id, item.hasDropdown)}
                className={`w-full px-4 py-2 rounded-xl transition-all duration-200 hover:bg-gray-700 hover:text-white flex items-center justify-between ${activeSection === item.id ? "text-gray-900 bg-gray-300" : "hover:border-gray-500"
                  }`}
              >
                <span className="font-medium">{item.label}</span>
                {item.hasArrow && (
                  <>
                    {item.hasDropdown ? (
                      <ChevronDownIcon
                        className={`w-6 h-6 transition-transform duration-200 ${activeSection === item.id ? "rotate-180" : ""
                          }`}
                      />
                    ) : (
                      <ChevronRightIcon className="w-6 h-6" />
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
                      className={`w-full py-2 rounded-lg transition-all duration-200 bg-gray-700 hover:bg-gray-600 text-sm ${activeSubSection === subItem
                        ? "border border-blue-400 bg-gray-800 text-blue-400"
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
