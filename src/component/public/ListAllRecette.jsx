import { useEffect, useState } from "react"

const ListAllRecettes = () => {
    const [recettes, setRecettes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [recettesIngredients, setRecettesIngredients] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/api/recettes")
            .then((response) => {
                return response.json()
            })
            .then((dataRecettes) => {
                console.log(dataRecettes);
                setRecettes(dataRecettes.data)
            })
        fetch("http://localhost:5000/api/ingredient")
            .then((response) => {
                return response.json()
            })
            .then((dataIngredient) => {
                console.log(dataIngredient)
                setIngredients(dataIngredient.data)

            })
        fetch("http://localhost:5000/api/recetteingredient")
            .then((response) => {
                return response.json()
            })
            .then((datarecetteIngredient) => {
                console.log(datarecetteIngredient)
                setRecettesIngredients(datarecetteIngredient.data)

            })
    }, [])
    return (
        <section>
            {recettes.map((recette) => {
                return (
                    <article key={recette.id}>

                        <h1>{recette.title}</h1>
                        {/* <h3>pour {recette.servings}</h3>
                        <h5>{recette.tempsTotal}</h5>
                        <h5>{recette.difficulty_level}</h5>
                        <p>{recette.preparation}</p>
                        <p> INFO {recette.descriptionProduit}</p> */}


                    </article>

                )
            })}
            {ingredients.map((ingredient) => {
                return (
                    <article key={ingredient.id}>
                        <h2>{ingredient.nom}</h2>

                    </article>
                )

            })}
            {recettesIngredients.map((recetteIngredient) => {
                return (
                    <article key={recetteIngredient.id}>
                        <h2>quantity :{recetteIngredient.quantity} {recetteIngredient.unit}</h2>

                    </article>
                )
            })}
        </section>
    )
}
export default ListAllRecettes