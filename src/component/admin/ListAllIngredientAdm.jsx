import { useEffect, useState } from "react"
import { useVerifyToken } from "../../utils/auth"
import { Link, useNavigate, useParams } from "react-router-dom"

const ListAllIngredientsAdm = () => {
    const [ingredients, setIngredients] = useState([])
    const [needRefresh, setNeedRefresh] = useState(false)
    const [editingIngredientId, setEditingIngredientId] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://localhost:5000/api/ingredient")
            .then((response) => response.json())
            .then((dataIngredient) => {
                setIngredients(dataIngredient.data)
            })
    }, [needRefresh])

    const decodedToken = useVerifyToken()
    useEffect(() => {
        if (!decodedToken || !(decodedToken.roleId === 1 || decodedToken.roleId === 2)) {
            navigate("/")
        }
    }, [decodedToken, navigate])


    const handleDeleteIngredient = (event, idingredient) => {
        event.preventDefault()
        fetch(`http://localhost:5000/api/ingredient/${idingredient}`, {
            method: "DELETE",
            credentials: "include"
        })
            .then((response) => {
                setNeedRefresh(!needRefresh)
            })
    }

    const handleUpdateIngredient = (event, idingredient) => {
        event.preventDefault()
        const nom = event.target.nom.value

        const jsonIngredientData = {
            nom: nom,
        }

        fetch(`http://localhost:5000/api/ingredient/${idingredient}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(jsonIngredientData),
            credentials: "include"
        })
            .then(() => {
                setEditingIngredientId(null)
                setNeedRefresh(!needRefresh)
            })
    }

    return (
        <section>
            {decodedToken && (decodedToken.roleId === 1 || decodedToken.roleId === 2) && (
                <>
                    <Link to="/admin">
                        <img className="exitimage" src="/logoAndImage/sortir.png" alt="back" />
                    </Link>

                    <h2>Hello Page All Ingredients</h2>
                    {ingredients.map((ingredient) => (
                        <article key={ingredient.id}>
                            <h2>{ingredient.nom}</h2>
                            <button onClick={() => setEditingIngredientId(ingredient.id)}>Modify</button>
                            {editingIngredientId === ingredient.id && (
                                <form onSubmit={(event) => handleUpdateIngredient(event, ingredient.id)}>
                                    <div className='form-group'>
                                        <label>nom de ingredient:</label>
                                        <input type="text" name="nom" defaultValue={ingredient.nom} required />
                                    </div>
                                    <button type="submit" value="Submit">Update</button>
                                </form>
                            )}
                            <button onClick={(event) => handleDeleteIngredient(event, ingredient.id)}>Delete</button>
                        </article>
                    ))}
                </>
            )}
        </section>
    )
}

export default ListAllIngredientsAdm
