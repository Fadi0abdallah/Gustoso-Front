import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../../style/Css/detailRecette.css"
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
                <>
                    <section className='sectionRecette' >
                        <div className='recetteDetail'>
                            <div className='divimage'>
                                <h1 className="detailH1">{deatilRecette.title}</h1>
                                <img className='divimage' src={deatilRecette.imageUrl} alt={deatilRecette.title} />
                            </div>

                            <h3 className='detailH3'>Ingrédients pour {deatilRecette.servings} Personnes</h3>
                            <div className='divdetailH5'>
                                <h5 className='detailH5'> <img className='logosearch' src="/logoAndImage/time.png" alt={deatilRecette.tempsTotal} />{deatilRecette.tempsTotal}</h5>
                                <h5 className='detailH5'> <img className='logosearch' src="/logoAndImage/feuille.png" alt={deatilRecette.difficulty_level} /> {deatilRecette.difficulty_level}</h5>
                            </div>
                            <h4 className='h4Prepartion'>Prépartion des {deatilRecette.title} de Gustoso</h4>
                            <p className='detailp'>{deatilRecette.preparation}</p>

                            <p className='detailpInfo'><h6>Info</h6> {deatilRecette.descriptionProduit}</p>


                            {deatilRecetteIngredient && deatilRecetteIngredient.length > 0 ? (
                                <div className='divIngredient'>
                                    <ul>
                                        {deatilRecetteIngredient.map((ingredient) => (
                                            <li key={ingredient.id}>
                                                {getIngredientName(ingredient.IngredientId)} - {ingredient.quantity} {ingredient.unit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>


                            )
                                : (
                                    <p>Aucun ingrédient trouvé pour cette recette.</p>
                                )}
                        </div>
                    </section>
                    <h2 className='h2terminee'>La recette est terminée.</h2>
                    <div className='lineRed'></div>

                </>

                :
                <h2>Recette non trouve</h2>
            }
        </main>
    );
}

export default DeatilRecette;
