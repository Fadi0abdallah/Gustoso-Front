import { useNavigate, useParams } from "react-router-dom";
import "../../style/Css/review.css"
const CreateReview = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const handleCreateReview = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;
        const rating = event.target.rating.value;
        const RecetteId = event.target.RecetteId.value;

        const jsonReviewData = {
            comment: comment,
            rating: rating,
            RecetteId: RecetteId  // Include RecetteId in the request body
        };

        fetch(`http://localhost:5000/api/review`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(jsonReviewData),
            credentials: "include",  // Include credentials for authentication
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    navigate("/recettes/deatil/" + id);
                } else {
                    throw new Error('Error creating review');
                }
            })
            .catch((error) => {
                console.error("Error creating review:", error);
            });
    };

    return (
        <main >

            <form className="formreview" onSubmit={handleCreateReview}>
                <div className="divreview">
                    <textarea className="comment" type="text" placeholder="Comment ici" name="comment" required />
                </div>
                <div className="recetteid">
                    <label>
                        RecetteId:
                        <input type="number" name="RecetteId" required defaultValue={id} />
                    </label>
                </div>
                <div className="retinSubmit">
                    <input className="review-btn" type="submit" value="Submit" />
                    <input type="number" className="ratin" name="rating" placeholder=" Rating" required min="1" max="5" />
                </div>

            </form>
        </main>

    );
};

export default CreateReview;
