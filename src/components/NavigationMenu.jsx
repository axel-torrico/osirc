"use client";

import { useState } from "react";
import { HiChevronDown, HiOutlineClipboardList } from "react-icons/hi";
import { FiUsers, FiMapPin } from "react-icons/fi";
import { BsDiagram3 } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi2";

const NavigationMenu = ({ activeSection, activeSubSection, onSectionChange, onSubSectionChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPedidosOpen, setIsPedidosOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HiOutlineHome className="w-5 h-5" />,
    },
    {
      id: "instaladores",
      label: "Instaladores",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      id: "zonas",
      label: "Zonas",
      icon: <FiMapPin className="w-5 h-5" />,
    },
    {
      id: "pedidos",
      label: "Pedidos",
      icon: <HiOutlineClipboardList className="w-5 h-5" />,
      hasDropdown: true,
      subItems: ["Lista", "Chat", "En espera"],
    },
  ];

  const handleMainItemClick = (itemId, hasDropdown = false) => {
    if (hasDropdown) {
      if (itemId === "pedidos") {
        setIsPedidosOpen((prev) => !prev);
        onSectionChange("pedidos");
        onSubSectionChange("Lista");
      }
    } else {
      setIsPedidosOpen(false);
      onSectionChange(itemId);
      onSubSectionChange(null);
    }
  };

  const handleSubItemClick = (subItem) => {
    onSubSectionChange(subItem);
  };

  return (
    <div
      className={`h-full px-2 transition-all duration-300 bg-gray-800 border-r-2 border-gray-900 overflow-hidden
      ${isHovered ? "w-60" : "w-[70px]"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center items-center my-4 pb-4 border-b border-gray-600">
        <BsDiagram3 className="w-7 h-7 text-white" />
        <h2
          className={`mt-1 text-white font-bold text-2xl transition-all duration-300 text-center
          ${isHovered ? "opacity-100 pl-3" : "opacity-0 w-0 overflow-hidden"}`}
        >
          OSIRC
        </h2>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => handleMainItemClick(item.id, item.hasDropdown)}
              className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200
              ${activeSection === item.id ? "text-gray-900 font-bold bg-gray-300" : "hover:text-white hover:border-gray-500"}`}
            >
              <span className="min-w-[20px] mr-2 flex justify-center">{item.icon}</span>
              <span
                className={`whitespace-nowrap transition-opacity duration-200 ease-in-out font-medium 
                ${isHovered ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"}`}
              >
                {item.label}
              </span>
              {item.hasDropdown && isHovered && (
                <HiChevronDown
                  className={`w-5 h-5 ml-auto transition-transform duration-300
                  ${isPedidosOpen ? "rotate-180" : "rotate-0"}`}
                />
              )}
            </button>

            {item.hasDropdown && activeSection === item.id && (
              <div
                className={`transition-all overflow-hidden duration-300 ease-in-out
                ${isHovered && isPedidosOpen ? "max-h-40 mt-2 space-y-2" : "max-h-0"}`}
              >
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem}
                    onClick={() => handleSubItemClick(subItem)}
                    className={`w-full py-2 rounded-lg transition-all duration-200 bg-gray-700 hover:bg-gray-600 text-sm
                    ${activeSubSection === subItem
                        ? "border border-blue-400 bg-gray-800 text-blue-400"
                        : "border border-transparent"
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
  );
};

export default NavigationMenu;
