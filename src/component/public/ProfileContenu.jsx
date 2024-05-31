import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const profileContenu = () => {
    const [recipes, setRecipes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams(); // Get the user ID from the URL parameters

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
                console.log(data)
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
                console.log(data)
            } catch (error) {
                console.error('Error fetching user Reviews:', error);
            }
        };

        fetchUserRecipes();
        fetchUserReviews();
    }, [id]);

    if (recipes.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <h1>Your Recipes</h1>
            {recipes.map((recipe) => (
                <article key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    <img src={recipe.imageUrl} alt={recipe.title} />
                    <p>{recipe.descriptionProduit}</p>
                    <p>{recipe.preparation}</p>
                    <p>Servings: {recipe.servings}</p>
                    <p>Difficulty: {recipe.difficulty_level}</p>
                    <p>Time: {recipe.tempsTotal}</p>
                </article>
            ))}
            <h1>Your Reviews</h1>
            {reviews.map((review) => (
                <article key={review.id}>
                    <h2>{review.Recette ? review.Recette.title : 'Unknown Recette'}</h2>
                    <p> {review.comment}</p>
                    <p> {review.rating}</p>
                </article>
            ))}
        </section>
    );
};

export default profileContenu