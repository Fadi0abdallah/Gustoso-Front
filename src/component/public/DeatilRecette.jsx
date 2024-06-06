import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DeatilRecette = () => {
    const { id } = useParams();
    const [deatilRecette, setDeatilRecette] = useState(null);
    const [deatilRecetteIngredient, setDeatilRecetteIngredient] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        // Fetch recipe details
        fetch("http://localhost:5000/api/recettes/" + id)
            .then((response) => response.json())
            .then((dataRecette) => {
                console.log(dataRecette);
                setDeatilRecette(dataRecette.data);
            });

        // Fetch ingredients for the recipe
        fetch("http://localhost:5000/api/recetteingredient/by-recette/" + id)
            .then((response) => response.json())
            .then((datarecetteIngredients) => {
                console.log(datarecetteIngredients);
                setDeatilRecetteIngredient(datarecetteIngredients.data);
            });

        fetch("http://localhost:5000/api/ingredient")
            .then((response) => response.json())
            .then((dataIngredients) => {
                console.log(dataIngredients);
                setIngredients(dataIngredients.data || []);
            });
    }, [id]);


    // Ainsi, lorsque `ingredients.find()` est appelé, il parcourt chaque élément (`ing`) du tableau `ingredients`. Pour chaque élément, il vérifie si sa propriété `id` correspond à l'`ingredientId` fourni. Si une correspondance est trouvée, l'objet ingrédient est retourné et assigné à la variable `ingredient`. Si aucune correspondance n'est trouvée, `ingredient` sera `undefined`.

    const getIngredientName = (ingredientId) => {
        const ingredient = ingredients.find(ing => ing.id === ingredientId);
        return ingredient ? ingredient.nom : 'Ingrédient inconnu';
    };
    return (
        <main>
            {deatilRecette ?
                <section>
                    <h1>{deatilRecette.title}</h1>
                    <h3>pour {deatilRecette.servings}</h3>
                    <h5>{deatilRecette.tempsTotal}</h5>
                    <h5>{deatilRecette.difficulty_level}</h5>
                    <p>{deatilRecette.preparation}</p>
                    <p> INFO {deatilRecette.descriptionProduit}</p>

                    <h2>Ingredients</h2>
                    {deatilRecetteIngredient && deatilRecetteIngredient.length > 0 ? (
                        <ul>
                            {deatilRecetteIngredient.map((ingredient) => (
                                <li key={ingredient.id}>
                                    {getIngredientName(ingredient.IngredientId)} - {ingredient.quantity} {ingredient.unit}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun ingrédient trouvé pour cette recette.</p>
                    )}
                </section>
                :
                <h2>Recette non trouve</h2>
            }
        </main>
    );
}

export default DeatilRecette;
