
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Navbar from "./Components/Navbar"
import UploadPdf from "./pages/UploadPdfPage"
import PapersList from "./pages/AllPapers"
import PaperDetails from "./pages/PaperDetails"
import UserDashboard from "./pages/UserDashboard"
import Footer from "./Components/Footer"

const App = () => {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 transition-opacity duration-700 ">
      <Navbar/>

      <div className="container mx-auto px-4">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/upload" element={<UploadPdf/>}/>
              <Route path="/papers" element={<PapersList/>}/>
              <Route path="/userDashboard" element={<UserDashboard/>}/>
              <Route path="/papers/:id" element={<PaperDetails />} />
          </Routes>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App