import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const profileContenu = () => {
    const [recipes, setRecipes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams(); // Get the user ID from the URL parameters
    const [needRefresh, setNeedRefresh] = useState(false)
    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/profilerecette/${id}`, {
                    method: "GET",
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setRecipes(data);

            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };
        const fetchUserReviews = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/profilereview/${id}`, {
                    method: "GET",
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setReviews(data);

            } catch (error) {
                console.error('Error fetching user Reviews:', error);
            }
        };

        fetchUserRecipes();
        fetchUserReviews();
    }, [id, needRefresh]);

    if (recipes.length === 0) {
        return <p>Loading...</p>;
    }
    const handleDeleteRecette = (event, idRecette) => {
        event.preventDefault();
        fetch("http://localhost:5000/api/recettes/" + idRecette, {
            method: "DELETE",
            credentials: "include"
        })
            .then((Response) => {
                setNeedRefresh(!needRefresh)
            })
    }
    const handleDeleteReview = (event, idReview) => {
        fetch("http://localhost:5000/api/review/" + idReview, {
            method: "DELETE",
            credentials: "include"
        })
            .then((Response) => {
                setNeedRefresh(!needRefresh)
            })
    }
    return (
        <section className='sectionRecette'>
            <h1 className="h1profile"> Vos Recettes</h1>
            {recipes.map((recipe) => (
                <article className="articlecontenu" key={recipe.id}>
                    <div className='divimage'>
                        <h1 className="detailH1">{recipe.title}</h1>
                        <img className='detailImageprofile' src={recipe.imageUrl} alt={recipe.title} />
                    </div>
                    <h3 className='servingsH3'>servings pour {recipe.servings} Personnes</h3>
                    <h4 className='h4Prepartion'>Prépartion des {recipe.title} de Gustoso</h4>
                    <p className='detailp'>{recipe.preparation}</p>

                    <p className='detailpInfo'> {recipe.descriptionProduit}</p>
                    <div className='divdetailH5'>
                        <h5 className='detailH5'>{recipe.tempsTotal}</h5>
                        <h5 className='detailH5'> /  {recipe.difficulty_level}</h5>
                    </div>
                    <div className="btndiv">

                        <Link to={`/profile/update/recette/${recipe.id}`}> <button className="btn modify-btn" >modify</button></Link>
                        <button className="btn delete-btn" onClick={(event) => handleDeleteRecette(event, recipe.id)}>Delete</button>
                    </div>
                    <div className='lineRed'></div>
                </article>
            ))}
            <h1 className="h1profile">Vos Reviews</h1>

            <div className="divAllReview">

                {reviews.map((review) => (
                    <article key={review.id} className="card">
                        <h2 className="h2cardProfile">{review.Recette ? review.Recette.title : 'Unknown Recette'}</h2>
                        <p className="pcard">{review.comment}</p>
                        <div className="divrating"><p className="prating"> Reting {review.rating}</p></div>
                        <h5 className="dateReview">{new Date(review.createdAt).toLocaleDateString()}</h5>
                        <div className="btndiv">
                            <Link to={`/profile/update/review/${review.id}`}> <button className="btn modify-btn" >modify</button></Link>
                            <button className="btn delete-btn" onClick={(event) => handleDeleteReview(event, review.id)}>Delete</button>
                        </div>
                    </article>
                ))}
            </div>

        </section>
    );
};

export default profileContenu
