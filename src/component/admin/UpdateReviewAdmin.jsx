import { useEffect, useState } from "react";
import { useVerifyToken } from "../../utils/auth";
import { useNavigate, useParams } from "react-router-dom";

const UpdateReviewAdmin = () => {
    const [updateReview, setUpdateReview] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    useVerifyToken();

    useEffect(() => {
        fetch(`http://localhost:5000/api/review/admin/${id}`, {
            method: "GET",
            credentials: "include"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((reviewData) => {
                if (reviewData.data) {

                    setUpdateReview(reviewData.data);
                } else {
                    throw new Error('No data found');
                }
            })
            .catch((error) => {
                console.error("Error fetching review data:", error);
            });
    }, [id]);

    const handleUpdateReview = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;
        const rating = event.target.rating.value;

        const jsonReviewData = {
            comment: comment,
            rating: rating
        };

        fetch(`http://localhost:5000/api/review/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(jsonReviewData),
            credentials: "include",  // Include credentials for authentication
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    navigate("/admin/review");
                } else {
                    throw new Error('Error updating review');
                }
            })
            .catch((error) => {
                console.error("Error updating review:", error);
            });
    };
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
                    {updateReview ? (
                        <form className="formreview" onSubmit={handleUpdateReview}>
                            <div className="divreview">
                                <textarea className="comment" type="text" defaultValue={updateReview.comment} name="comment" required />
                            </div>
                            <div className="recetteid">
                                <label>
                                    RecetteId:
                                    <input type="number" name="RecetteId" required defaultValue={id} />
                                </label>
                            </div>
                            <div className="retinSubmit">
                                <input className="review-btn" type="submit" value="Mettre à jour" />
                                <input type="number" className="ratin" name="rating" defaultValue={updateReview.rating} required min="1" max="5" />
                            </div>

                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                </>
            )}
        </section>
    );
};

export default UpdateReviewAdmin;
