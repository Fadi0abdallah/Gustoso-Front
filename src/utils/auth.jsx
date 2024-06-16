import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useVerifyToken = () => {
    const navigate = useNavigate()

    const accessToken = Cookies.get("access_token")
    let decodedToken = null

    if (accessToken === undefined) {
        navigate("/connexion")
    }
    if (accessToken) {
        decodedToken = jwtDecode(accessToken);
    }
    useEffect(() => {

        if (decodedToken.roleId === 3) {
            navigate("/")
        }
    })
    return decodedToken
}