import React, { useState } from 'react';
import '../../style/header.css';

const Header = () => {
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
                <img className='logoheader' src="../public/logoAndImage/food___beverage-removebg-preview.png" alt="logo" />
                <div className='divsearch'>
                    <img className='logosearch' src="../public/logoAndImage/search.png" alt="search" />
                </div>
            </div>
            <div>
                <a className='section4' href="#section4">Connexion</a>
            </div>
        </header>
    );
};

export default Header;