import { useContext, useState } from "react"
import "./navbar.css"
import { StoreContext } from "../../Context/context";
import { SaveCartData } from "../../ApiCalls/ApiCalls";
export const Navbar = () => {
    let { cartData, Itemnumber } = useContext(StoreContext);
    let [sideNav, setSidenav] = useState(false);
    return (
        <>
            <nav className="usuall-Nav">
                <div className="nav-left" onClick={() => window.location.href = "/"}>
                </div>
                {(!sideNav)
                    ?
                    <div className="nav-right">
                        <a href="/">Home</a>
                        <a href="#Contact">Contact</a>
                        <a href="#Companies">Companies</a>
                        <a id="cartIcon" onClick={() => SaveCartData(cartData, Itemnumber)}>🛒</a>
                        {(Itemnumber)
                            ?
                            <div className="dot">{Itemnumber}</div>
                            :
                            <></>
                        }
                    </div>
                    :
                    <div className={(sideNav) ? "sideNav" : "hidden"}>
                        <a href="/">Home</a>
                        <hr></hr>
                        <a href="#Contact">Contact</a>
                        <hr></hr>
                        <a href="#Companies">Companies</a>
                        <hr></hr>
                        <p onClick={() => SaveCartData(cartData, Itemnumber)}>Cart</p>
                    </div>
                }
            </nav>
            <div className="menuBar" onClick={() => setSidenav(!sideNav)}>
                {(sideNav) ? <p className="cross">&times;</p> : <p>&#9776;</p>}
            </div>
        </>
    )
}