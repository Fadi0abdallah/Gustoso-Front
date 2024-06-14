import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateIngredient = () => {
    const [needRefresh, setNeedRefresh] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams()
    const handleCreateIngredient = (event) => {
        event.preventDefault();
        const nom = event.target.nom.value;


        const jsonIngredientData = {
            nom: nom,
        };

        fetch(`http://localhost:5000/api/ingredient`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(jsonIngredientData),
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    setNeedRefresh(!needRefresh);
                    window.location.reload(); // Refresh the page
                } else {
                    throw new Error("Error creating ingredient");
                }
            })
            .catch((error) => {
                console.error("Error creating ingredient:", error);
            });
    };
    return (
        <form onSubmit={handleCreateIngredient}>
            <div className='form-group'>
                <label>nom de ingredient:</label>
                <input type="text" name="nom" required />

            </div>

            <button type="submit" value="Submit" > Ajoter</button>
        </form>
    );

};



export default CreateIngredient