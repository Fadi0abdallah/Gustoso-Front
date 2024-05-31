import { useEffect, useState } from "react";

const Dessert = () => {
    const [desserts, setDesserts] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/api/recettes/dessert", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setDesserts(data.data);
            });
    }, []);

    return (
        <main>
            <h1>Page entree</h1>
            <section>
                {desserts.map((dessert) => (
                    <article key={dessert.id}>
                        <h1>{dessert.title}</h1>
                        <img src={dessert.imageUrl} alt={dessert.title} />
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Dessert