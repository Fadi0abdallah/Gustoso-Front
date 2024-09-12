import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useVerifyToken } from "../../utils/auth"

const ListAllRecettesAdm = () => {
    const [recettes, setRecettes] = useState([])
    const [needRefresh, setNeedRefresh] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {

        fetch("http://localhost:5000/api/recettes")
            .then((response) => {
                return response.json()
            })
            .then((dataRecettes) => {

                setRecettes(dataRecettes.data)
            })
    }, [needRefresh])
    const handleDeleteRecette = (event, idRecette) => {
        event.preventDefault();
        fetch("http://localhost:5000/api/recettes/" + idRecette, {
            method: "DELETE",
            credentials: "include"
        })
            .then((Response) => {
                setNeedRefresh(!needRefresh)
            })
    }
    const decodedToken = useVerifyToken()
    useEffect(() => {
        if (!decodedToken || !(decodedToken.roleId === 1 || decodedToken.roleId === 2)) {
            navigate("/");
        }
    }, [decodedToken, navigate]);
    return (

        <section className="allrecettesection">
            {decodedToken && (decodedToken.roleId === 1 || decodedToken.roleId === 2) && (
                <>
                    <Link to="/admin"> <img className="exitimage" src="/logoAndImage/sortir.png" alt="back" /> </Link>

                    <h2 className="h2terminee">Hello Page All Recettes</h2>
                    {recettes.map((recette) => {
                        return (
                            <article className='articleRecette' key={recette.id}>
                                <div className='divimage'>
                                    <h1 className="detailH1">{recette.title}</h1>
                                    <img className='divimage' src={recette.imageUrl} alt={recette.title} />

                                </div>

                                <h3 className='detailH3'>pour {recette.servings} Personnes</h3>
                                <div className='divdetailH5'>
                                    <h5 className='detailH5 '>{recette.tempsTotal}</h5>
                                    <h5 className='detailH5'>{recette.difficulty_level}</h5>
                                </div>

                                <p className='detailp'>{recette.preparation}</p>
                                <p className='detailpInfo'> INFO {recette.descriptionProduit}</p>
                                <div className="btndiv">

                                    <Link to={`/admin/recette/update/${recette.id}`}> <button className="btn modify-btn" >modify</button></Link>
                                    <button className="btn delete-btn" onClick={(event) => handleDeleteRecette(event, recette.id)}>Delete</button>
                                </div>

                            </article>

                        )
                    })}
                </>

            )}
        </section>
    )

}
export default ListAllRecettesAdm