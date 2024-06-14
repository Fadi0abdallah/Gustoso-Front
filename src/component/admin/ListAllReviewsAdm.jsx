import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVerifyToken } from "../../utils/auth";

const ListAllReviewsAdm = () => {
    const [reviews, setReviews] = useState([]);
    const [needRefresh, setNeedRefresh] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://localhost:5000/api/review/admin/reviwes", {
            method: "GET",
            credentials: 'include'
        })
            .then((response) => {
                return response.json()
            })
            .then((dataReviwes) => {
                console.log(dataReviwes);
                setReviews(dataReviwes.data)
            })
    }, [needRefresh])
    const handleDeleteReview = (event, idReview) => {
        fetch("http://localhost:5000/api/review/" + idReview, {
            method: "DELETE",
            credentials: "include"
        })
            .then((Response) => {
                setNeedRefresh(!needRefresh)
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
                    <Link to="/admin"> <img className="exitimage" src="/logoAndImage/sortir.png" alt="back" /> </Link>

                    <h2>Hello Page All Reviews</h2>


                    {reviews.map((review) => (
                        <article key={review.id}>
                            <h2>{review.User ? review.User.username : 'Unknown User'}</h2>
                            <h2>{review.Recette ? review.Recette.title : 'Unknown User'}</h2>
                            <p>{review.comment}</p>
                            <h5>{new Date(review.createdAt).toLocaleDateString()}</h5>
                            <Link to={`/admin/review/update/${review.id}`}> <button >Modifie</button></Link>
                            <button onClick={(event) => handleDeleteReview(event, review.id)}>Delete</button>
                        </article>
                    ))}
                </>
            )}
        </section>
    )

}
export default ListAllReviewsAdm