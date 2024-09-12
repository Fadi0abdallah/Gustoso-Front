import { useEffect, useState } from "react";
import "../../style/Css/random.css"
import { Link } from "react-router-dom";
const RandomRecette = () => {
    const [random, setRandom] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/recetteingredient/random", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((randomData) => {

                if (randomData.data && randomData.data.Recette) {
                    setRandom(randomData.data.Recette);
                } else {
                    console.error("Expected an object with Recette property but got:", randomData.data);
                }


            })
            .catch((error) => {
                console.error("Error fetching random recipes:", error);
            });
    }, []);

    return (
        <section className="sectionRandom">
            {random ? (

                <article className="articlRandom">
                    <Link to={`/recettes/deatil/${random.id}`}>
                        <img className="imgRandom" src={random.imageUrl} alt={random.title} />
                        <p className="pRandom">{random.title}</p>
                    </Link>
                </article>


            ) : (
                <p className="pRandom">No random recipes available.</p>
            )}
        </section>
    );
};

export default RandomRecette;
