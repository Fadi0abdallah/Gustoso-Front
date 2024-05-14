import '../../style/header.css'
const Header = () => {
    return (
        <>


            <header>
                <img className='logoheader' src="../public/food___beverage-removebg-preview.png" alt="logo" />
                <div className='divsearch'>
                    <img className='logosearch' src="../public/logoAndImage/search.png" alt="search" />
                </div>

                <ul className='recetteNav'>
                    <li>Entrées</li>
                    <li>Plats</li>
                    <li>Desserts</li>
                </ul>





                <ul className='connexionNav'>

                    <li>
                        <img className='logoprofile' src="../public/logoAndImage/profile.png" alt="profile" />

                    </li>
                    {/* i must chang to Link */}
                    <li> <a className='btnConnexion' href="">Connexion</a></li>
                </ul>


            </header>
        </>


    )
}
export default Header