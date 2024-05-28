import { useVerifyToken } from "../../utils/auth"

const AdminDashboard = () => {
    useVerifyToken();

    return (


        <h1>Hello admin</h1>
    )

}
export default AdminDashboard