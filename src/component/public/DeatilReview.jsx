import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailReview = () => {
    const [recette, setRecette] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecette = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/recettes/${id}`, {
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const dataRecette = await response.json();
                setRecette(dataRecette.data);
                console.log(dataRecette.data);

            } catch (error) {
                console.error('Error fetching recette:', error);
            }
        };


        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/review/${id}`, {
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const dataReview = await response.json();
                setReviews(dataReview);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchRecette();
        fetchReviews();
    }, [id]);

    if (!recette) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <h1>Hello Recette</h1>
            <article key={recette.id}>
                <h1>{recette.title}</h1>
                <img src={recette.imageUrl} alt={recette.title} />
            </article>

            {reviews.map((review) => (
                <article key={review.id}>
                    <div>{review.User ? review.User.username.slice(0, 2) : 'NN'}</div>
                    <h2>{review.User ? review.User.username : 'Unknown User'}</h2>
                    <div>like</div>
                    <p>{review.comment}</p>
                    <h5>{new Date(review.createdAt).toLocaleDateString()}</h5>
                </article>
            ))}
        </section>
    );
};

export default DetailReview;
