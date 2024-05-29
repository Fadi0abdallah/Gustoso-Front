import { BrowserRouter, Route, Routes } from "react-router-dom"

import AccueilPage from "./page/public/AccueilPage"
import ConnexionPage from "./page/public/ConnexionPage"
import SignUpPage from "./page/public/SignUpPage"
import AdminDashboardPage from "./page/admin/AdminDashboardPage"
import ListAllRecettePage from "./page/public/ListAllRecettesPage"
import DeatilRecettePage from "./page/public/DeatilRecettePage"
import ProfilePage from "./page/public/ProfilePage"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccueilPage />} />
        <Route path="/connexion" element={<ConnexionPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/recettes" element={<ListAllRecettePage />} />
        <Route path="/recettes/deatil/:id" element={<DeatilRecettePage />} />
        <Route path="/profile" element={<ProfilePage />} />



        {/* Admin */}
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
