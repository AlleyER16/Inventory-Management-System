import { useAppContext } from "../context";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

const AdminNavbar = () => {

    const {appName} = useAppContext();

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
                    <div className="col-md-4 mt-1">
                        <span className="navbar-appname">{appName}</span>
                    </div>
                    <div className="col-md-6 mt-1" style={{textAlign: "right"}}>
                        <Link to="/admin/transactions" className="navbar-link">My Transactions</Link>
                        <Link to="/admin/products" className="navbar-link">Products</Link>
                        <Link to="/admin/sales_persons" className="navbar-link">Sales Persons</Link>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-danger"><FaArrowCircleLeft/> Logout</button>
                    </div>
                </div>
            </nav>
            <div ref={marginDivRef}></div>
        </>
    );
}

export default AdminNavbar