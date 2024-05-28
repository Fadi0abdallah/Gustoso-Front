import React, { useEffect, useState } from 'react';
import '../../style/header.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const isCookes = (access_token) => {
    return Cookies.get(access_token) !== undefined
}

const Header = () => {
    const [isCooke, setIsCooke] = useState(false)
    const naviate = useNavigate();

    const logOut = () => {
        Cookies.remove('access_token')
        naviate("/connexion")

    }
    useEffect(() => {
        const haveCookes = isCookes('access_token')
        setIsCooke(haveCookes)
    }, [])
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
            {isCooke ? <div>
                <Link to="/profile">profile</Link>
                {/* <Link to="/logeout">logeout</Link> */}
                <li onClick={logOut}>logout</li>
            </div> : <div className='btndiv'>
                <Link to="/connexion" className='section4' href="#section4">Connexion</Link>
                <h1>/</h1>
                <Link to="/signup" className='section5' href="#section4">signUP</Link>
            </div>
            }

        </header>
    );
};

export default Header;