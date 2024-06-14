import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ListAllRecettes = () => {
    const [recettes, setRecettes] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/api/recettes")
            .then((response) => {
                return response.json()
            })
            .then((dataRecettes) => {
                console.log(dataRecettes);
                setRecettes(dataRecettes.data)
            })
    }, [])
    return (
        <section className="CategorieSection">
            {recettes.map((recette) => {
                return (
                    <article className="articleCategorie" key={recette.id}>

                        <h2 className="h2Categorie">{recette.title}</h2>
                        <Link to={`/recettes/deatil/${recette.id}`}><img className="Categoriephote" src={recette.imageUrl} alt={recette.title} /></Link>
                    </article>




                )
            })}
        </section>
    )
}
export default ListAllRecettes