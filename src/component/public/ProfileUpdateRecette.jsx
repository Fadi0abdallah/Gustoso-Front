import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyToken } from "../../utils/auth";
import "../../style/Css/detailRecette.css"
const UpdateRecetteProfile = () => {
    const [recettes, setRecettes] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:5000/api/recettes/${id}`, { method: "GET" })
            .then((response) => response.json())
            .then((dataRecettes) => {
                setRecettes(dataRecettes.data);
                // Initialize selected ingredients if recette has ingredients
                if (dataRecettes.data.ingredients) {
                    setSelectedIngredients(dataRecettes.data.ingredients);
                }
            });

        fetch("http://localhost:5000/api/ingredient", { method: "GET" })
            .then((response) => response.json())
            .then((dataIngredient) => {
                setIngredients(dataIngredient.data);
            });

        fetch("http://localhost:5000/api/categorie", { method: "GET" })
            .then((response) => response.json())
            .then((dataCategories) => {
                setCategories(dataCategories.data);
            });
    }, [id]);

    const handleUpdateRecette = (event) => {
        event.preventDefault();

        const recette = {
            title: event.target.title.value,
            servings: event.target.servings.value,
            tempsTotal: event.target.tempsTotal.value,
            difficulty_level: event.target.difficulty_level.value,
            preparation: event.target.preparation.value,
            descriptionProduit: event.target.descriptionProduit.value,
            CategorieId: event.target.category.value,
        };

        const formData = new FormData();
        formData.append("recette", JSON.stringify(recette));
        if (event.target.imageUrl.files[0]) {
            formData.append("imageUrl", event.target.imageUrl.files[0]);
        }

        fetch(`http://localhost:5000/api/recettes/${id}`, {
            method: "PUT",
            body: formData,
            credentials: "include"
        })
            .then((response) => response.json())
            .then((data) => {
                handleUpdateRecetteIngredients(id);
                navigate("/admin/recette");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleUpdateRecetteIngredients = (recetteId) => {
        selectedIngredients.forEach((ingredient) => {
            const recetteIngredient = {
                IngredientId: ingredient.id,
                RecetteId: recetteId,
                quantity: ingredient.quantity,
                unit: ingredient.unit
            };

            fetch(`http://localhost:5000/api/recetteingredient/${recetteId}/${ingredient.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recetteIngredient),
                credentials: 'include'
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    };

    const handleIngredientChange = (event, ingredient) => {
        const { name, value } = event.target;
        setSelectedIngredients(prevSelectedIngredients => {
            const existingIngredient = prevSelectedIngredients.find(ing => ing.id === ingredient.id);
            if (existingIngredient) {
                return prevSelectedIngredients.map(ing =>
                    ing.id === ingredient.id ? { ...ing, [name]: value } : ing
                );
            } else {
                return [...prevSelectedIngredients, { ...ingredient, [name]: value }];
            }
        });
    };
    const decodedToken = useVerifyToken()
    useEffect(() => {
        if (!decodedToken || !(decodedToken.roleId === 1)) {
            navigate("/Admin");
        }
    }, [decodedToken, navigate]);
    return (
        <section>
            {decodedToken && (decodedToken.roleId === 1 || decodedToken.roleId === 2) && (
                <>
                    <h2>Update Recette</h2>
                    {recettes ? (
                        <form onSubmit={handleUpdateRecette}>
                            <div>
                                <label>
                                    Title
                                    <input type="text" name="title" defaultValue={recettes.title} required />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Servings
                                    <input type="number" name="servings" defaultValue={recettes.servings} required />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Temps Total
                                    <input type="text" name="tempsTotal" defaultValue={recettes.tempsTotal} required />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Niveau de difficulté
                                    <select name="difficulty_level" defaultValue={recettes.difficulty_level} required>
                                        <option value="Facile">Facile</option>
                                        <option value="Moyen">Moyen</option>
                                        <option value="Difficile">Difficile</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Preparation
                                    <textarea name="preparation" defaultValue={recettes.preparation} required></textarea>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Description de Produit
                                    <textarea name="descriptionProduit" defaultValue={recettes.descriptionProduit} required></textarea>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Category
                                    <select name="category" defaultValue={recettes.CategorieId} required>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Photo
                                    <input type="file" name="imageUrl" accept="image/*" /> {/* Ensure this matches */}
                                </label>
                            </div>

                            <h3>Ingredients</h3>
                            <input
                                type="text"
                                placeholder="Search Ingredients"
                                className="ingredient-search-bar"
                                onChange={(e) => {
                                    const searchTerm = e.target.value.toLowerCase();
                                    setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.nom.toLowerCase().includes(searchTerm)));
                                }}
                            />
                            <div className='ingredient-results'>
                                {ingredients.map((ingredient) => (
                                    <div className='ingredient-item' key={ingredient.id}>
                                        <label>
                                            {ingredient.nom}
                                            <button type="button" onClick={() => handleAddIngredient(ingredient)}>Add</button>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <h3>Selected Ingredients</h3>
                            <div className='ingredient-results'>
                                {selectedIngredients.map((ingredient) => (
                                    <div className='ingredient-item' key={ingredient.id}>
                                        <label>{ingredient.nom}</label>
                                        <label>
                                            Quantity
                                            <input
                                                type="text"
                                                name="quantity"
                                                value={ingredient.quantity}
                                                onChange={(e) => handleIngredientChange(e, ingredient)}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Unit
                                            <input
                                                type="text"
                                                name="unit"
                                                value={ingredient.unit}
                                                onChange={(e) => handleIngredientChange(e, ingredient)}
                                                required
                                            />
                                        </label>
                                        <button type="button" onClick={() => handleRemoveIngredient(ingredient.id)}>Remove</button>
                                    </div>
                                ))}
                            </div>

                            <button className='submit-button' type="submit">Mettre à jour</button>

                        </form>
                    ) : (
                        <p>Loading . . .</p>
                    )}
                </>
            )}
        </section>
    );
};

export default UpdateRecetteProfile;
