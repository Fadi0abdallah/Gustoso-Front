import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useVerifyToken } from "../../utils/auth"
import "../../style/Css/admindash.css"
const ListAllUserAdm = () => {
    const [users, setUsers] = useState([])
    const [needRefresh, setNeedRefresh] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:5000/api/users', {
            method: "GET",
            credentials: 'include'
        })
            .then((response) => {
                return response.json()
            })
            .then((dateUser) => {
                console.log(dateUser.data);
                setUsers(dateUser.data)
            })
    }, [needRefresh])
    const handleDeleteUser = (event, idUser) => {
        fetch("http://localhost:5000/api/users/" + idUser, {
            method: "DELETE",
            credentials: "include"
        })
            .then((Response) => {
                setNeedRefresh(!needRefresh)
            })
    }

    const decodedToken = useVerifyToken()
    useEffect(() => {
        if (!decodedToken || !(decodedToken.roleId === 1)) {
            navigate("/Admin");
        }
    }, [decodedToken, navigate]);
    return (
        <section className="sectionAllUser">
            {decodedToken && (decodedToken.roleId === 1 || decodedToken.roleId === 2) && (
                <>
                    <Link to="/admin"> <img className="exitimage" src="/logoAndImage/sortir.png" alt="back" /> </Link>
                    {
                        users.map((user) => {
                            return (
                                <article key={user.id} className="user-card">

                                    <h2>User Name : {user.username}</h2>
                                    <h4>User Id :{user.id}</h4>
                                    <h4>Role Id : {user.RoleId}</h4>
                                    <Link to={`/admin/user/update/${user.id}`}> <button className="btn modify-btn" >modify</button></Link>
                                    <button className="btn delete-btn" onClick={(event) => handleDeleteUser(event, user.id)}>Delete</button>

                                </article>

                            )
                        })

                    }
                </>
            )}
        </section>
    )

}
export default ListAllUserAdm