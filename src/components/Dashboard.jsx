"use client"

import { useState } from "react"
import NavigationMenu from "./NavigationMenu"
import DashboardContent from "./DashboardContent"

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [activeSubSection, setActiveSubSection] = useState(null)

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <NavigationMenu
        activeSection={activeSection}
        activeSubSection={activeSubSection}
        onSectionChange={setActiveSection}
        onSubSectionChange={setActiveSubSection}
      />

      <div className="flex-1 p-6 bg-gray-900 overflow-hidden">
        <DashboardContent activeSection={activeSection} activeSubSection={activeSubSection} />
      </div>
    </div>
  )
}

export default Dashboard
