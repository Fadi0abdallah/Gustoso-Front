import { useEffect, useState } from "react";

const RandomRecette = () => {
    const [random, setRandom] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/recetteingredient/random", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((randomData) => {
                console.log(randomData.data);
                if (Array.isArray(randomData.data)) {
                    setRandom(randomData.data);
                } else {
                    console.error("Expected an array but got:", randomData.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching random recipes:", error);
            });
    }, []);

    return (
        <section>
            {
                random ? (

                    <article >
                        <img src={dom.Recette.imageUrl} alt={dom.Recette.title} />
                        <p>{dom.Recette.title}</p>
                    </article>
                ) : (
                    <p>No random recipes available.</p>
                )
            }
        </section>
    );
};

export default RandomRecette;
