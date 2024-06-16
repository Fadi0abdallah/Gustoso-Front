import { useState } from 'react';
import '../../style/connexion.css';
import { Link, useNavigate } from 'react-router-dom';
const Connexion = () => {
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const handleConnexionSubmit = (event) => {
        event.preventDefault();

        const username = event.target.username.value
        const password = event.target.password.value

        const connexionData = {
            username: username,
            password: password,
        }
        const ConnexionDataJson = JSON.stringify(connexionData)

        fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            body: ConnexionDataJson,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Connexion Réussie")
                    navigate("/")
                } else {
                    setMessage("Connexion Réfusé ")
                }
            });
    };
    return (
        <>
            <p className='message'>{message}</p>
            <section className='sectionConnexion'>
                <form className="connexion" onSubmit={handleConnexionSubmit} >

                    <h1><span>SE</span> CONNECTER </h1>
                    <p>Nous sommes heureux de vous revoir !</p>



                    <input className="usernameinput" type="text" id="username" placeholder=" Username" name="username" />
                    <input className="passwordinput" type="password" id="pass" required placeholder=" password" name="password" />


                    <input className="connexionsubmitinput" type="submit" value="Connexion" />
                    <h3>OU</h3>

                    <Link to="http://localhost:5173/signup">
                        <input className="signupinput" type="submit" value="Sign UP" />
                    </Link>
                </form>


            </section>
        </>

    )
}
export default Connexion