import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../style/Css/categories.css"
const Plat = () => {

    const [plats, setPlats] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/api/recettes/plat", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {

                setPlats(data.data);
            });
    }, []);

    return (
        <main>
            <h1 className="h1Categorie">Plat</h1>
            <section className="CategorieSection">
                {plats.map((plat) => (
                    <article className="articleCategorie" key={plat.id}>
                        <h2 className="h2Categorie">{plat.title}</h2>
                        <Link to={`/recettes/deatil/${plat.id}`}> <img className="Categoriephote" src={plat.imageUrl} alt={plat.title} /></Link>
                    </article>
                ))}
            </section>
        </main>
    );
}


export default Plat