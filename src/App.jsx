import { BrowserRouter, Route, Routes } from "react-router-dom"

import AccueilPage from "./page/public/AccueilPage"
import ConnexionPage from "./page/public/ConnexionPage"
import SignUpPage from "./page/public/SignUpPage"
import AdminDashboardPage from "./page/admin/AdminDashboardPage"
import ListAllRecettePage from "./page/public/ListAllRecettesPage"
import DeatilRecettePage from "./page/public/DeatilRecettePage"
import ProfilePage from "./page/public/ProfilePage"
import DeatilReviewPage from "./page/public/DeatilReviewPage"
import ProfileContenuPage from "./page/public/ProfileContenuPage"
import EntreePage from "./page/public/categoriesPage/EntreePage"
import PlatPage from "./page/public/categoriesPage/platPage"
import DessertPage from "./page/public/categoriesPage/desserPage"



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
        <Route path="/voscontenu/:id" element={<ProfileContenuPage />} />
        <Route path="/review/:id" element={<DeatilReviewPage />} />

        <Route path="/entree" element={<EntreePage />} />
        <Route path="/plat" element={<PlatPage />} />
        <Route path="/dessert" element={<DessertPage />} />



        {/* Admin */}
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
