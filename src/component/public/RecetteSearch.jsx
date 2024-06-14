import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../../style/Css/app.css"
const RecetteSearch = () => {
    const [searchRecette, setSearchRecette] = useState([]);
    const { RecetteName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (RecetteName) {
            fetch(`http://localhost:5000/api/recettes/search?title=${RecetteName}`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((data) => {
                    setSearchRecette(data.data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setSearchRecette([]);
                });
        }
    }, [RecetteName]);

    return (
        <section className="sectionSeach">
            {searchRecette.length === 0 ? (
                <h2 className="h2Search" >Pas trouvé</h2>
            ) : (
                searchRecette.map((recette) => (
                    <Link to={`/recettes/deatil/${recette.id}`}>
                        <article className="articleSearch" key={recette.id}>
                            <h2 className="h2Search">{recette.title}</h2>
                            <img className="imgSearch" src={recette.imageUrl} alt={recette.title} />
                        </article>
                    </Link>

                ))
            )}
        </section>
    );
};

export default RecetteSearch;

