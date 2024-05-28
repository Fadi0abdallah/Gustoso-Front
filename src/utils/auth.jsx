import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useVerifyToken = () => {
    const navigate = useNavigate()

    const accessToken = Cookies.get("access_token")
    let decodedToken = null

    if (accessToken === undefined) {
        navigate("/connexion")
    }
    if (accessToken) {
        decodedToken = jwtDecode(accessToken);
        console.log(decodedToken)

        if (!decodedToken.userId) {
            navigate("/connexion");
        }
    } else {
        navigate("/connexion");
        // Idéalement, utilisez la date de validé pour re-générer le token quand il est périmé
        // si le token est périmé et qu'il n'a pas été re-généré : déconnecté l'user


    }

    if (decodedToken.RoleId === 3) {
        navigate("/")
    }

    return decodedToken
}