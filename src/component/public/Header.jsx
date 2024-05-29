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

    const [isActive, setIsActive] = useState(false);

    const handleBurgerClick = () => {
        setIsActive(!isActive);
    };

    return (
        <header>
            <nav>
                <ul className={`recetteNav ${isActive ? 'active' : ''}`}>
                    <li><a href="#section1">Entrées</a></li>
                    <li><a href="#section2">Plats</a></li>
                    <li><a href="#section3">Desserts</a></li>
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
                <img className='logoheader' src="/logoAndImage/food___beverage-removebg-preview.png" alt="logo" />
                <div className='divsearch'>
                    <img className='logosearch' src="/logoAndImage/search.png" alt="search" />
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : isCookie ? (
                <div>
                    <Link to="/profile">Profile</Link>
                    {profile && <h1>Hello, {profile.username}</h1>}
                    <li onClick={logOut}>Logout</li>
                </div>
            ) : (
                <div className='btndiv'>
                    <Link to="/connexion" className='section4'>Connexion</Link>
                    <h1>/</h1>
                    <Link to="/signup" className='section5'>Sign Up</Link>
                </div>
            )}
            {error && <p>{error}</p>}
        </header>
    );
};

export default Header;
