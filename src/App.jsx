import { BrowserRouter, Route, Routes } from "react-router-dom"
import "../src/style/Css/app.css"
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
import CreateRecettePage from "./page/public/CreateRecettePage"
import ListAllUserPageAdm from "./page/admin/ListAllUserAdmPage"
import ListAllRecettesPageAdm from "./page/admin/ListAllRecetteAdmPage"
import ListAllReviwesPageAdm from "./page/admin/ListAllReviwesAdmPage"
import ListAllIngredientsPageAdm from "./page/admin/ListAllIngredientAdmPage"
import UpdateUserSadminPage from "./page/admin/UpdateUserSadminPage"
import UpdateReviewAdminPage from "./page/admin/UpdateReviewAdminPage"
import UpdateRecetteAdmPage from "./page/admin/UpdateRecetteAdmPage"
import CreateReviewPage from "./page/public/CreateReviewPage"
import RecetteSearchPage from "./page/public/RecetteSearchPage"
import CreateIngredientPage from "./page/public/CreateIngredientPage"
import ProfileUpdateRecette from "./page/public/ProfileUpdateRecette"
import ProfileUpdateReviewPage from "./page/public/ProfileUpdateReviewPage"



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
        <Route path="/profile/update/recette/:id" element={<ProfileUpdateRecette />} />
        <Route path="/profile/update/review/:id" element={<ProfileUpdateReviewPage />} />
        <Route path="/review/create" element={<CreateReviewPage />} />
        <Route path="/review/:id" element={<DeatilReviewPage />} />
        <Route path="/entree" element={<EntreePage />} />
        <Route path="/plat" element={<PlatPage />} />
        <Route path="/dessert" element={<DessertPage />} />
        <Route path="/new-ingredient" element={<CreateIngredientPage />} />
        <Route path="/newrecette" element={<CreateRecettePage />} />
        <Route path="/recette-search/:RecetteName" element={<RecetteSearchPage />} />



        {/* Admin */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/user" element={<ListAllUserPageAdm />} />
        <Route path="/admin/user/update/:id" element={<UpdateUserSadminPage />} />
        <Route path="/admin/recette" element={<ListAllRecettesPageAdm />} />
        <Route path="/admin/recette/update/:id" element={<UpdateRecetteAdmPage />} />
        <Route path="/admin/review" element={<ListAllReviwesPageAdm />} />
        <Route path="/admin/review/update/:id" element={<UpdateReviewAdminPage />} />
        <Route path="/admin/ingredient" element={<ListAllIngredientsPageAdm />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
