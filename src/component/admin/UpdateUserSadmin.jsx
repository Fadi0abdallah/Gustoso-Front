import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useVerifyToken } from "../../utils/auth"
import "../../style/Css/admindash.css"

const UpdateUserSadmin = () => {
    const [updateUser, setUpdateUser] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    useVerifyToken()

    useEffect(() => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: "GET",
            credentials: "include"  // Include credentials for authentication
        })
            .then((response) => response.json())
            .then((userData) => {
                if (userData.data) {
                    setUpdateUser(userData.data)
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error)
            })
    }, [id])

    const handleUpdateUser = (event) => {
        event.preventDefault()

        const username = event.target.username.value
        const roleid = event.target.roleid.value

        const jsonUserData = {
            username: username,
            RoleId: roleid  // Ensure that role ID key matches your backend model
        }

        fetch(`http://localhost:5000/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(jsonUserData),
            credentials: "include",  // Include credentials for authentication
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    navigate("/admin/user")
                }
            })
            .catch((error) => {
                console.error("Error updating user:", error)
            })
    }
    const decodedToken = useVerifyToken()
    useEffect(() => {
        if (!decodedToken || !(decodedToken.roleId === 1 || decodedToken.roleId === 2)) {
            navigate("/");
        }
    }, [decodedToken, navigate]);
    return (
        <section>
            {decodedToken && (decodedToken.roleId === 1 || decodedToken.roleId === 2) && (
                <>
                    {updateUser && (
                        <form onSubmit={handleUpdateUser} className="update-form">
                            <div className="form-group">
                                <label className="form-label">
                                    Username:
                                    <input
                                        type="text"
                                        name="username"
                                        defaultValue={updateUser.username}
                                        required
                                        className="form-input"
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    Role ID:
                                    <input
                                        type="number"
                                        name="roleid"
                                        defaultValue={updateUser.RoleId}
                                        required
                                        className="form-input"
                                    />
                                </label>
                            </div>
                            <input type="submit" value="Mettre à jour" className="submit-button" />
                        </form>
                    )}
                </>

            )}
        </section>
    )
}

export default UpdateUserSadmin
