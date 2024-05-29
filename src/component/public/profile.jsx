import { useEffect, useState } from "react";
import "../../style/profile.css";
const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/users/profile", {
            credentials: 'include' // Cela permet de s'assurer que les cookies sont envoyés avec la demande
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Non authentifié');
                }
                return response.json();
            })
            .then((dataProfile) => {
                setProfile(dataProfile);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!profile) {
        return <p>Loading...</p>;
    }
    // Extraire la première et la deuxième lettre du nom d'utilisateur
    const firstTwoLetters = profile.username.slice(0, 2);
    //Extraction de la première chambre jusqu'à un dixième du temps
    const timecreatedAt = profile.createdAt.slice(0, 10);
    return (
        <section>
            <article>
                <h1>Hello, {profile.username}</h1>

            </article>
            <div>
                <div className="onediv">
                    <div className="twodiv">
                        <div className="threediv" >
                            {firstTwoLetters}
                        </div>
                        <div className="fourdiv">
                            MON PROFIL
                        </div>
                        <div className='fivediv'>
                            <h2> {profile.username}</h2>
                            <h2>Inscrit depuis : {timecreatedAt}</h2>

                        </div>
                    </div>
                </div>

            </div>


        </section>
    );
};

export default Profile;