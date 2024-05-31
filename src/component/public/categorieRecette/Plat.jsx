import { useEffect, useState } from "react";

const Plat = () => {

    const [plats, setPlats] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/api/recettes/plat", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setPlats(data.data);
            });
    }, []);

    return (
        <main>
            <h1>Page entree</h1>
            <section>
                {plats.map((plat) => (
                    <article key={plat.id}>
                        <h1>{plat.title}</h1>
                        <img src={plat.imageUrl} alt={plat.title} />
                    </article>
                ))}
            </section>
        </main>
    );
}


export default Plat