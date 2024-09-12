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
            <article key={recette.id}>
                <div className='divimage'>
                    <h1 className="detailH1">{recette.title}</h1>
                    <img className='divimage' src={recette.imageUrl} alt={recette.title} />
                </div>

            </article>
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

export default DetailReview;
