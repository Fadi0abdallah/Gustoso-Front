import { BrowserRouter, Route, Routes } from "react-router-dom"

import AccueilPage from "./page/public/AccueilPage"
import ConnexionPage from "./page/public/ConnexionPage"
import SignUpPage from "./page/public/SignUpPage"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccueilPage />} />
        <Route path="/connexion" element={<ConnexionPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
