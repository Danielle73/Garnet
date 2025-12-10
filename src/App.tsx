import { useState } from "react"
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeScreen from "@/screens/HomeScreen"
import TrackerScreen from "@/screens/TrackerScreen"
import HistoryScreen from "@/screens/HistoryScreen"
import type { PeriodEntry } from "./types/period"

function App() {
  const [periodEntries, setPeriodEntries] = useState<PeriodEntry[]>([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/tracker"
          element={
            <TrackerScreen
              periodEntries={periodEntries}
              setPeriodEntries={setPeriodEntries}
            />
          }
        />
        <Route
          path="/history"
          element={<HistoryScreen entries={periodEntries} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
