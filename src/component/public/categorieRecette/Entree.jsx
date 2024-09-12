import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../style/Css/categories.css"
const Entree = () => {
    const [entrees, setEntrees] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/recettes/entree", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {

                setEntrees(data.data);
            });
    }, []);

    return (
        <main>
            <h1 className="h1Categorie">Entrées</h1>
            <section className="CategorieSection">
                {entrees.map((entree) => (
                    <article className="articleCategorie" key={entree.id}>
                        <h2 className="h2Categorie">{entree.title}</h2>
                        <Link to={`/recettes/deatil/${entree.id}`}><img className="Categoriephote" src={entree.imageUrl} alt={entree.title} /></Link>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Entree;
