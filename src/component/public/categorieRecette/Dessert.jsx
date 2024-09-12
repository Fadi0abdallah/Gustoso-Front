import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../style/Css/categories.css"
const Dessert = () => {
    const [desserts, setDesserts] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/api/recettes/dessert", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {

                setDesserts(data.data);
            });
    }, []);

    return (
        <main>
            <h1 className="h1Categorie">Desserts</h1>
            <section className="CategorieSection">
                {desserts.map((dessert) => (
                    <article className="articleCategorie" key={dessert.id}>
                        <h2 className="h2Categorie">{dessert.title}</h2>
                        <Link to={`/recettes/deatil/${dessert.id}`}><img className="Categoriephote" src={dessert.imageUrl} alt={dessert.title} /></Link>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Dessert