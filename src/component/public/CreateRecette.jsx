import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../style/Css/createRecette.css";

const CreateRecette = () => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/ingredient", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((dataIngredient) => {
                setIngredients(dataIngredient.data);
            });

        fetch("http://localhost:5000/api/categorie", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((dataCategories) => {
                setCategories(dataCategories.data);
            });
    }, []);

    const handleCreateRecette = (event) => {
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

        fetch("http://localhost:5000/api/recettes", {
            method: "POST",
            body: formData,
            credentials: "include"
        })
            .then((response) => response.json())
            .then((data) => {
                const recetteId = data.data.id;
                handleCreateRecetteIngredients(recetteId);
                navigate(`/recettes/deatil/${recetteId}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleCreateRecetteIngredients = (recetteId) => {
        selectedIngredients.forEach((ingredient) => {
            const recetteIngredient = {
                IngredientId: ingredient.id,
                RecetteId: recetteId,
                quantity: ingredient.quantity,
                unit: ingredient.unit
            };

            fetch("http://localhost:5000/api/recetteingredient", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recetteIngredient),
                credentials: 'include'
            })
                .then((response) => response.json())
                .then((data) => {

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

    const handleAddIngredient = (ingredient) => {
        setSelectedIngredients(prevSelectedIngredients => {
            if (!prevSelectedIngredients.some(ing => ing.id === ingredient.id)) {
                return [...prevSelectedIngredients, { ...ingredient, quantity: '', unit: '' }];
            }
            return prevSelectedIngredients;
        });
    };

    const handleRemoveIngredient = (ingredientId) => {
        setSelectedIngredients(prevSelectedIngredients => {
            return prevSelectedIngredients.filter(ing => ing.id !== ingredientId);
        });
    };

    return (
        <>
            <form className='createForm' onSubmit={handleCreateRecette}>
                <h2 className='h2createForm'>Créer une Recette</h2>

                <div className='form-group'>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Title" required />
                </div>
                <div className='form-group'>
                    <label>Servings</label>
                    <input type="number" name="servings" placeholder='Servings' required />
                </div>
                <div className='form-group'>
                    <label>Temps Total </label>
                    <input type="text" name="tempsTotal" placeholder="Temps Total" required />
                </div>
                <div className='form-group'>
                    <label >Niveau de difficulté</label>
                    <select className='recetteLabel' name="difficulty_level" required>
                        <option value="Facile">Facile</option>
                        <option value="Moyen">Moyen</option>
                        <option value="Difficile">Difficile</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Preparation </label>
                    <textarea name="preparation" placeholder="Preparation" required></textarea>
                </div>
                <div className='form-group'>
                    <label>Description de Produit </label>
                    <textarea name="descriptionProduit" placeholder="Description de Produit" required></textarea>
                </div>
                <div className='form-group'>
                    <label className='recetteLabel'>Category </label>
                    <select name="category" required>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label className='labelImage'> Image </label>
                    <input type="file" name="imageUrl" accept="image/*" required /> {/* Ensure this matches */}
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

                <button className='submit-button' type="submit">Create Recette</button>
            </form>
            <Link to="/new-ingredient"><button>Ajout d'un nouvel ingrédient</button></Link>
        </>
    );
};
export default CreateRecette;