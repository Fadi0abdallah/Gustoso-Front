import { Link } from "react-router-dom";
import "../../style/footer.css";
const Footer = () => {
    return (
        <footer>
            <section className="gridOne">

                <h1>Suivez-nous sur nos <span>réseaux sociaux !</span></h1>
                <ul className="socialmedia">
                    <li><img src="/logoAndImage/facebook.png" alt="facebook" /></li>
                    <li><img src="/logoAndImage/instagram.png" alt="instagram" /></li>
                    <li><img src="/logoAndImage/twitter.png" alt="twitter" /></li>
                </ul>
            </section>
            <section className="gridFour">

                <Link to="/"> <img className="logofooter" src="/logoAndImage/food___beverage-removebg-preview.png" alt="logo" /></Link>

            </section>


            <nav className="gridThree">
                <ul>
                    <Link to="/entree"><li>Entrées</li></Link>
                    <li>-</li>
                    <Link to="/plat"><li>Plats</li></Link>
                    <li>-</li>
                    <Link to="/dessert"><li>Desserts</li></Link>
                    <li>-</li>
                    <Link to="/recettes"><li>Recettes</li></Link>
                </ul>
            </nav>
            <li className="gridFive">&#9400; 2024 Gustoso</li>


        </footer>

    )
}
export default Footer