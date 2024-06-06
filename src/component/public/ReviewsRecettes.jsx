import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ReviewsRecettes = () => {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/review/" + id, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const dataReview = await response.json();

                if (!Array.isArray(dataReview)) {
                    throw new Error('Data is not an array');
                }

                console.log(dataReview);
                setReviews(dataReview);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [id]);


    if (reviews.length === 0) {
        return <p>Aucun commentaire sur cette recette</p>;
    }

    return (
        <section>
            <p>Commentaire Page</p>
            <div>Donnez votre avis</div>

            {reviews.map((review) => (
                <article key={review.id}>
                    <div>{review.User ? review.User.username.slice(0, 2) : 'NN'}</div>
                    <h2>{review.User ? review.User.username : 'Unknown User'}</h2>
                    <div>like</div>
                    <p>{review.comment}</p>
                    <h5>{new Date(review.createdAt).toLocaleDateString()}</h5>
                    {/* Link to all reviews for the current recette */}

                </article>
            ))}
            <Link to={`/review/${id}`}>All Reviews</Link>

        </section>
    );
};

export default ReviewsRecettes;



