import '../../style/signup.css';
const SignUp = () => {
    return (
        <section>
            <img className='backgroundsignUp' src="https://cdn.pixabay.com/photo/2015/10/25/09/52/italy-1005507_1280.jpg" alt="background" />
            <article className="signup" >

                <h1>Sign up A la <span>Gustoso</span></h1>



                <div className="divinput">
                    <input className="usernameinput" type="text" id="username" placeholder=" Username" name="username" />
                    <input className="passwordinput" type="password" id="pass" required placeholder=" password" name="password" />
                </div>


                <input className="submitinput" type="submit" value="Sign UP" />
            </article>
        </section>

    )
}
export default SignUp