import { Link, useParams } from "react-router-dom";
import "../../style/Css/review.css";
import Cookies from 'js-cookie';

const isCookiePresent = (access_token) => {
    return Cookies.get(access_token) !== undefined;
};

const CreateReview = () => {
    const { id } = useParams();
    const access_token = 'access_token'; // Assurez-vous que c'est le bon nom pour le cookie
    const isCookie = isCookiePresent(access_token);

    const handleCreateReview = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;
        const rating = event.target.rating.value;

        const jsonReviewData = {
            comment: comment,
            rating: rating,
            RecetteId: id // Utiliser directement l'id de useParams
        };

        fetch(`http://localhost:5000/api/review`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(jsonReviewData),
            credentials: "include"
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    // Recharger la page actuelle
                    window.location.reload();
                } else {
                    throw new Error('Erreur lors de la création de l\'avis');
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la création de l'avis :", error);
            });
    };

    return (
        <main>
            <Link className="allCom" to={`/review/${id}`}> Tous les commentaires</Link>
            {isCookie ? (
                <form className="formreview" onSubmit={handleCreateReview}>
                    <div className="divreview">
                        <textarea className="comment" type="text" placeholder="Commentaire ici" name="comment" required />
                    </div>
                    <div className="retinSubmit">
                        <input className="review-btn" type="submit" value="Envoyer" />
                        <input type="number" className="ratin" name="rating" placeholder="Note" required min="1" max="5" />
                    </div>
                </form>
            ) : (
                <p className="pasReview">Veuillez vous connecter pour laisser un avis.</p>
            )}
        </main>
    );
};

export default CreateReview;
