
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Navbar from "./Components/Navbar"
import UploadPdf from "./pages/UploadPdfPage"

const App = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100 transition-opacity duration-700 pt-20">
      <Navbar/>

      <div className="container mx-auto px-4 py-6">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/upload" element={<UploadPdf/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default App