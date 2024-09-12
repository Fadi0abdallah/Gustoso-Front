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
            <p className="message" aria-live="polite">{message}</p>

            <section className="sectionConnexion">
                <form className="connexion" onSubmit={handleConnexionSubmit}>
                    <h1>
                        <span>SE</span> CONNECTER
                    </h1>
                    <p>Nous sommes heureux de vous revoir !</p>

                    <div className='divusernameconnexion'>
                        <label className='usernameconnexion' htmlFor="username">Username:</label>
                        <input
                            className="usernameinput"
                            type="text"
                            id="username"
                            name="username"

                        />
                    </div>

                    <div className='divpasswordconnexion'>
                        <label className='passwordconnexion' htmlFor="password">Password:</label>
                        <input
                            className="passwordinput"
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>

                    <input
                        className="connexionsubmitinput"
                        type="submit"
                        value="Connexion"
                    />

                    <h2>OU</h2>

                    <Link to="/signup" className="signup-link">
                        Sign Up
                    </Link>
                </form>
            </section>


        </>

    )
}
export default Connexion