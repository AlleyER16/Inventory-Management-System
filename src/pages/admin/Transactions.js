import AdminNavbar from "../../components/AdminNavbar";

import Transaction from "../../components/Transaction";

import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context";

const AdminTransactions = () => {

    const {adminLogged} = useAppContext();

    if (!adminLogged) return <Navigate to="/admin/login"/>

    return (
        <>
            <AdminNavbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>Transactions</h4>
                            </div>
                            <div className="col-md-8" style={{textAlign: "right"}}>
                                <label>Filter:</label>
                                <select className="form-select" style={{marginLeft: "10px", display: "inline-block", width: "200px"}}>
                                    <option>Today</option>
                                    <option>Yesterday</option>
                                    <option>Last 1 month</option>
                                    <option>All Time</option>
                                </select>
                            </div>
                            <div className="col-md-12 mt-3">
                                {[1, 2, 3, 4, 5].map((key) => <Transaction key={key}/>)}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">

                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminTransactions;