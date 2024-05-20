const Footer = () => {
    return (
        <footer>
            <section>

                <div>
                    <img src="../public/logoAndImage/food___beverage-removebg-preview.png" alt="logo" />
                </div>
                <ul>
                    <li><img src="../public/logoAndImage/facebook.png" alt="" /></li>
                    <li><img src="../public/logoAndImage/instagram.png" alt="" /></li>
                    <li><img src="../public/logoAndImage/twitter.png" alt="" /></li>
                </ul>
            </section>
            <div>
                <h1>sine up A la Gustoso</h1>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" />
            </div>

            <div>
                <label for="pass">Password</label>
                <input type="password" id="pass" name="password" required />
            </div>

            <input type="submit" value="Sign UP" />

            <nav>
                <ul>
                    <li>Entrées</li>
                    <li>Plats</li>
                    <li>Desserts</li>
                </ul>
            </nav>
        </footer>

    )
}
export default Footer