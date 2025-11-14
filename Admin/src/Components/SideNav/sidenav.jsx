import { useState } from "react";
import "./sidenav.css";
import { useEffect } from "react";
export const SideNavbar = () => {
    let activeTag = JSON.parse(localStorage.getItem("ActiveT"));
    let [hideNav, setHidnav] = useState(true);
    let [acativeTage, setActivetag] = useState((activeTag) ? activeTag : "Add Items");
    const changeActiveTag = (e) => {
        let name = e.target.name;
        setActivetag(localStorage.setItem("ActiveT", JSON.stringify(name)));
    }
    return (
        <>
            {/* Navbar For Large Screens */}
            <nav className="nav-tag">
                <div className="sideNav">
                    <div className={(acativeTage === "Add Items") ? "sdeNav-div Active" : "sdeNav-div"}>
                        <a href="/" name="Add Items" onClick={(e) => changeActiveTag(e)}>➕ Add Items</a>
                    </div>
                    <div className={(acativeTage === "Orders") ? "sdeNav-div Active" : "sdeNav-div"} name="Orders" onClick={(e) => changeActiveTag(e)}>
                        <a href="/ordrs/All" name="Orders" onClick={(e) => changeActiveTag(e)}>📃 Orders</a>
                    </div>
                    <div className={(acativeTage === "All Items") ? "sdeNav-div Active" : "sdeNav-div"} name="All Items" onClick={(e) => changeActiveTag(e)}>
                        <a href="/prdct/all" name="All Items" onClick={(e) => changeActiveTag(e)}>📱 All Items</a>
                    </div>
                </div>
            </nav>
            {/* Navbar for Small Screen based on state*/}
            {(!hideNav)
                ?
                <nav className="sld-nav-tag">
                    <div className="sideNav">
                        <div className={(acativeTage === "Add Items") ? "sdeNav-div Active" : "sdeNav-div"}>
                            <a href="/" name="Add Items" onClick={(e) => changeActiveTag(e)}>➕ Add Items</a>
                        </div>
                        <div className={(acativeTage === "Orders") ? "sdeNav-div Active" : "sdeNav-div"} name="Orders" onClick={(e) => changeActiveTag(e)}>
                            <a href="/ordrs/All" name="Orders" onClick={(e) => changeActiveTag(e)}>📃 Orders</a>
                        </div>
                        <div className={(acativeTage === "All Items") ? "sdeNav-div Active" : "sdeNav-div"} name="All Items" onClick={(e) => changeActiveTag(e)}>
                            <a href="/prdct/all" name="All Items" onClick={(e) => changeActiveTag(e)}>📱 All Items</a>
                        </div>
                    </div>
                </nav>
                :
                <></>
            }
            {/* Navbar OPening Btn in small Screens */}
            <div className="menuBar" onClick={() => setHidnav(!hideNav)}>
                &#9776;
            </div>
        </>
    )
}