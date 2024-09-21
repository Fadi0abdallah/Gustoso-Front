import React, { useEffect, useState } from 'react';
import '../../style/header.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Helper function to check if the access token exists
const hasCookies = (tokenName) => {
    return Cookies.get(tokenName) !== undefined;
};

const Header = () => {
    const [isCookie, setIsCookie] = useState(false);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        Cookies.remove('access_token');
        navigate('/connexion');
    };

    // Handle recette search
    const handleRecetteSearch = (event) => {
        event.preventDefault();
        const searchRecetteByName = event.target.searchRecette.value;
        navigate(`/recette-search/${searchRecetteByName}`);
    };

    // Handle burger click for mobile navigation toggle
    const [isActive, setIsActive] = useState(false);
    const handleBurgerClick = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        const checkCookies = hasCookies('access_token');
        setIsCookie(checkCookies);

        if (checkCookies) {
            fetch('http://localhost:5000/api/users/profile', {
                credentials: 'include'
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Non authentifié');
                    }
                    return response.json();
                })
                .then((dataProfile) => {
                    setProfile(dataProfile);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }

        // Cleanup function
        return () => {
            setProfile(null);
        };
    }, []);

    return (
        <header>
            <article className='navheaser'>
                <ul className={`recetteNav ${isActive ? 'active' : ''}`}>
                    <Link to="/entree"><li>Entrées</li></Link>
                    <Link to="/plat"><li>Plats</li></Link>
                    <Link to="/dessert"><li>Desserts</li></Link>

                    {isCookie &&

                        <Link to="/newrecette"><li>Ajouter une recette</li></Link>
                    }
                </ul>
                <div>
                    <form className="searchForm" onSubmit={handleRecetteSearch}>
                        <label className="search-box">
                            <button className="search-btn" aria-label="Search">
                                <img className="logosearch" src="/logoAndImage/search.png" alt="Search icon" />
                            </button>
                            <input
                                type="search"
                                id="site-search"
                                name="searchRecette"
                                placeholder="Rechercher une recette"
                                aria-label="Search for a recipe"
                            />
                        </label>
                    </form>
                </div>



                <div onClick={handleBurgerClick} id="burger" className={isActive ? 'active' : ''}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </article>

            <div className="logoAndbar">
                <Link to="/">
                    <img className="logoheader" src="/logoAndImage/food___beverage-removebg-preview.png" alt="Logo" />
                </Link>

                {loading && <p>Loading...</p>}

                {isCookie ? (
                    <>
                        <div className="profileLogout">
                            <Link to="/profile">
                                <img className="logoprofile" src="/logoAndImage/profile.png" alt="Profile" />
                                {profile && <h2 className="h2profile">Bonjour {profile.username}</h2>}
                            </Link>
                            <li onClick={handleLogout}>
                                <img className="logosearch" src="/logoAndImage/se-deconnecter.png" alt="Logout" />
                            </li>
                        </div>
                    </>
                ) : (
                    !loading && (
                        <div className="btndiv">
                            <Link to="/connexion" className="section4">Connexion</Link>
                            <Link to="/signup" className="section5">Sign Up</Link>
                        </div>
                    )
                )}
            </div>

            {error && <p className="error">{error}</p>}
        </header>
    );
};

export default Header;
