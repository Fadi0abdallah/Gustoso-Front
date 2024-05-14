import { BrowserRouter, Route, Routes } from "react-router-dom"

import AccueilPage from "./page/public/AccueilPage"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccueilPage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
