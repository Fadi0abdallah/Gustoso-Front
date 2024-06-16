import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../style/Css/review.css"
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
        return <p className="pReview">Aucun commentaire sur cette recette</p>;
    }

    return (
        <section className="sectioncard">


            {reviews.map((review) => (
                <article key={review.id} className="card">
                    <div className="avatar"><p>{review.User ? review.User.username.slice(0, 2) : 'NN'}</p></div>
                    <h2 className="h2card">{review.User ? review.User.username : 'Unknown User'}</h2>
                    <p className="pcard">{review.comment}</p>
                    <div className="divrating"><p className="prating"> Reting {review.rating}</p>
                    </div>
                    <h5 className="dateReview">{new Date(review.createdAt).toLocaleDateString()}</h5>


                </article>
            ))}


        </section>
    );
};

export default ReviewsRecettes;



