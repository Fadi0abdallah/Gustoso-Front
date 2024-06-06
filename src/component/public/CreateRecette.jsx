import React, { useEffect, useState } from 'react';

const CreateRecette = () => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [categories, setCategories] = useState([]);

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
                console.log(data);
                const recetteId = data.data.id; // Assuming the backend returns the created recipe ID
                handleCreateRecetteIngredients(recetteId);
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

    return (
        <>
            <h2>Créer une Recette</h2>
            <form onSubmit={handleCreateRecette}>
                <div>
                    <label>
                        Title
                        <input type="text" name="title" required />
                    </label>
                </div>
                <div>
                    <label>
                        Servings
                        <input type="number" name="servings" required />
                    </label>
                </div>
                <div>
                    <label>
                        Temps Total
                        <input type="text" name="tempsTotal" required />
                    </label>
                </div>
                <div>
                    <label>
                        Niveau de difficulté
                        <select name="difficulty_level" required>
                            <option value="Facile">Facile</option>
                            <option value="Moyen">Moyen</option>
                            <option value="Difficile">Difficile</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Preparation
                        <textarea name="preparation" required></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        Description de Produit
                        <textarea name="descriptionProduit" required></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        Category
                        <select name="category" required>
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
                        <input type="file" name="imageUrl" accept="image/*" required /> {/* Ensure this matches */}
                    </label>
                </div>

                <h3>Ingredients</h3>
                {ingredients.map((ingredient) => (
                    <div key={ingredient.id}>
                        <label>
                            <input
                                type="checkbox"
                                name="selectedIngredients"
                                value={ingredient.id}
                                onChange={(e) => handleIngredientChange(e, ingredient)}
                            />
                            {ingredient.nom}
                        </label>
                        {selectedIngredients.some(ing => ing.id === ingredient.id) && (
                            <>
                                <label>
                                    Quantity
                                    <input
                                        type="text"
                                        name="quantity"
                                        onChange={(e) => handleIngredientChange(e, ingredient)}
                                        required
                                    />
                                </label>
                                <label>
                                    Unit
                                    <input
                                        type="text"
                                        name="unit"
                                        onChange={(e) => handleIngredientChange(e, ingredient)}
                                        required
                                    />
                                </label>
                            </>
                        )}
                    </div>
                ))}

                <button type="submit">Create Recette</button>
            </form>
        </>
    );
};

export default CreateRecette;
