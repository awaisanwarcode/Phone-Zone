import "./footer.css";
export const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-top-div">
                    <div className="footer-first-div">
                        <h2>PhoneShop.</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo adipisci eligendi numquam ad voluptatem alias voluptatum facere sapiente libero, fugiat totam amet architecto cupiditate, consequatur sunt harum accusamus explicabo aliquam!</p>
                    </div>
                    <div className="footer-sec-div">
                        <h3>Famous Products</h3>
                        <div>
                            <a href="#Vivo">Vivo</a>
                            <a href="#Oppo">Oppo</a>
                            <a href="#Iphone">Iphone</a>
                        </div>
                    </div>
                    <div id="Contact" className="footer-third-div">
                        <h3>Contacts</h3>
                        <div>
                            <span>+92-300-1234567</span>
                            <span>example@gmail.com</span>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="footer-last-div">
                    <p>2006-2025 <sup>&#169;</sup></p>
                    <p>All right reserved</p>
                    <p>Made by <em>Awais Anwar S/O Muhammad Ayub</em> with &hearts;</p>
                </div>
            </footer>
        </>
    )
}