import { useState } from 'react';
import '../../style/connexion.css';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const handleSignupSubmit = (event) => {
        event.preventDefault();
        const username = event.target.username.value
        const password = event.target.password.value

        const signupData = {
            username: username,
            password: password,
        }
        const signupDataJson = JSON.stringify(signupData)

        fetch("http://localhost:5000/api/users/signup", {
            method: "POST",
            body: signupDataJson,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("SignUp Réussie")
                    navigate("/connexion")
                } else {
                    setMessage("SignUp Réfusé ")
                }
            });
    };
    return (
        <section className='sectionSignup'>

            <form className="connexion" onSubmit={handleSignupSubmit} >
                <h1><span>S'</span> INSCRIRE</h1>
                <h2> Rejoignez la communauté <span>Gustoso</span></h2>

                <p>Retrouvez facilement vos recettes préférées pour vous faciliter la vie au quotidien.</p>

                <input className="usernameinput" type="text" id="username" placeholder=" Username" name="username" />
                <input className="passwordinput" type="password" id="pass" required placeholder=" password" name="password" />
                <input className="signupinput" type="submit" value="Sign UP" />

            </form>


        </section>






    )
}
export default SignUp