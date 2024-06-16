import { Link, useNavigate } from "react-router-dom";
import { useVerifyToken } from "../../utils/auth"
import { useEffect } from "react";
import "../../style/Css/admindash.css"
const AdminDashboard = () => {
    const decodedToken = useVerifyToken();
    const navigate = useNavigate()
    return (
        <main className="admin">
            <h1 className="h2admin"> Bonjour Admin</h1>
            <div className='logoAndbar'>
                <Link to="/"> <img className='logoheader' src="/logoAndImage/food___beverage-removebg-preview.png" alt="logo" /></Link>
            </div>

            <div className="adminsection">
                {decodedToken.roleId === 1 || decodedToken.roleId === 2 ?
                    <ul>
                        <li>  <Link className="auser" to="/admin/user">Users</Link></li>
                        <li>  <Link className="arecette" to="/admin/recette">Recettes</Link></li>
                        <li>  <Link className="areview" to="/admin/review">Reviews</Link></li>
                        <li> <Link className="aingredient" to="/admin/ingredient">Ingredient</Link></li>
                    </ul> : useEffect(() => {
                        navigate("/")
                    })
                }
            </div>
        </main>
    )
}
export default AdminDashboard