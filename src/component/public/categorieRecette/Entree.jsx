import { useEffect, useState } from "react";

const Entree = () => {
    const [entrees, setEntrees] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/recettes/entree", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setEntrees(data.data);
            });
    }, []);

    return (
        <main>
            <h1>Page entree</h1>
            <section>
                {entrees.map((entree) => (
                    <article key={entree.id}>
                        <h1>{entree.title}</h1>
                        <img src={entree.imageUrl} alt={entree.title} />
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Entree;
