import { useAppContext } from "../context";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const SalesPersonNavbar = () => {

    const {appName, salesPersonData} = useAppContext();

    const navbarRef = useRef(null);
    const marginDivRef = useRef(null);

    useEffect(() => {

        const height = navbarRef.current.clientHeight + 20;
        
        marginDivRef.current.style.height = `${height}px`;

    });

    return (
        <>
            <nav className="cus-navbar" ref={navbarRef}>
                <div className="row">
                    <div className="col-md-4" style={{display: "flex", alignItems: "center"}}>
                        <span className="navbar-appname">{appName}</span>
                    </div>
                    <div className="col-md-7" style={{display: "flex", alignItems: "center", justifyContent: "right"}}>
                        <Link to="/transactions" className="navbar-link">My Transactions</Link>
                        <Link to="/products" className="navbar-link">Products</Link>
                        <span style={{marginLeft: "100px"}}>
                            <img src={salesPersonData.Picture} alt={`${salesPersonData.FirstName} ${salesPersonData.LastName}`} style={{width: "50px", height: "50px"}} className="rounded-circle"/>
                        </span>
                        <span style={{marginLeft: "20px"}}>{`${salesPersonData.FirstName} ${salesPersonData.LastName}`}</span>
                    </div>
                </div>
            </nav>
            <div ref={marginDivRef}></div>
        </>
    );
}

export default SalesPersonNavbar