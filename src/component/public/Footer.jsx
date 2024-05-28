import "../../style/footer.css";
const Footer = () => {
    return (
        <footer>
            <section className="gridOne">

                <h1>Suivez-nous sur nos <span>réseaux sociaux !</span></h1>
                <ul className="socialmedia">
                    <li><img src="/logoAndImage/facebook.png" alt="" /></li>
                    <li><img src="/logoAndImage/instagram.png" alt="" /></li>
                    <li><img src="/logoAndImage/twitter.png" alt="" /></li>
                </ul>
            </section>
            <section className="gridFour">

                <img className="logofooter" src="/logoAndImage/food___beverage-removebg-preview.png" alt="logo" />

            </section>


            <nav className="gridThree">
                <ul>
                    <li>Entrées</li>
                    <li>-</li>
                    <li>Plats</li>
                    <li>-</li>
                    <li>Desserts</li>
                </ul>
            </nav>
            <nav className="gridFive">
                <ul>
                    <li>Tous droits réservés</li>
                    <li>-</li>
                    <li>Mentions légales</li>
                    <li>-</li>
                    <li>Gestion des cookies</li>
                    <li>-</li>
                    <li>&#9400; 2024</li>
                </ul>
            </nav>
        </footer>

    )
}
export default Footer