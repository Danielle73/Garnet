import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeScreen from "@/screens/HomeScreen"
import TrackerScreen from '@/screens/TrackerScreen';


function App() {
return(
  <>
  <BrowserRouter>
  <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/tracker" element={<TrackerScreen />} />
      </Routes>
  </BrowserRouter>
  </>
);
}

export default App
