import React, { useEffect, useState } from 'react';
import '../../style/header.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const isCookies = (access_token) => {
    return Cookies.get(access_token) !== undefined;
};

const Header = () => {
    const [isCookie, setIsCookie] = useState(false);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logOut = () => {
        Cookies.remove('access_token');
        navigate("/connexion");
    };

    useEffect(() => {
        const haveCookies = isCookies('access_token');
        setIsCookie(haveCookies);

        if (haveCookies) {
            fetch("http://localhost:5000/api/users/profile", {
                credentials: 'include' // This ensures cookies are sent with the request
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
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);


    const handleRecetteSearch = (event) => {
        event.preventDefault();
        const searchRecettebyname = event.target.searchRecette.value;
        navigate(`/recette-search/${searchRecettebyname}`);
    };



    const [isActive, setIsActive] = useState(false);

    const handleBurgerClick = () => {
        setIsActive(!isActive);
    };

    return (
        <header>
            <nav>
                <ul className={`recetteNav ${isActive ? 'active' : ''}`}>
                    <Link to="/entree"><li><a href="#section1">Entrées</a></li> </Link>
                    <Link to="/plat"> <li><a href="#section2">Plats</a></li> </Link>
                    <Link to="/dessert"><li><a href="#section3">Desserts</a></li></Link>
                    {isCookie &&
                        <Link to="/newrecette"><li><a href="#section4">Ajouter une recette</a></li></Link>

                    }

                </ul>
                <div
                    onClick={handleBurgerClick}
                    id="burger"
                    className={isActive ? 'active' : ''}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>

            <div className='logoAndbar'>
                <Link to="/"> <img className='logoheader' src="/logoAndImage/food___beverage-removebg-preview.png" alt="logo" /></Link>

                <div>
                    <form className='searchForm' onSubmit={handleRecetteSearch}>
                        <label className='search-box'>
                            <button className='search-btn' ><img className='logosearch' src="/logoAndImage/search.png" alt="search" /></button>

                            <input type="search" id="site-search" name="searchRecette" />
                        </label>
                    </form>
                </div>

            </div>

            {loading ? (
                <p>Loading...</p>
            ) : isCookie ? (
                <>
                    <div className='profileLogout'>
                        <Link to="/profile"><img className='logoprofile' src="/logoAndImage/profile.png" alt="search" />
                            {profile && <h2 className='h2profile'>Bonjour {profile.username}</h2>}</Link>
                    </div>
                    <li onClick={logOut}><img className='logosearch' src="/logoAndImage/se-deconnecter.png" alt="logout" /></li>
                </>

            ) : (
                <div className='btndiv'>
                    <Link to="/connexion" className='section4'>Connexion</Link>
                    <Link to="/signup" className='section5'>Sign Up</Link>
                </div>
            )}
            {error && <p className='error'>{error}</p>}
        </header>
    );
};

export default Header;
