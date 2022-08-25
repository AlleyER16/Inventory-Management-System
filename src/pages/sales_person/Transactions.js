import SalesPersonNavbar from "../../components/SalesPersonNavbar";

import Transaction from "../../components/Transaction";

import { useAppContext } from "../../context";

import { Navigate, useNavigate } from "react-router-dom";

import { FaPlusCircle } from "react-icons/fa";

const SalesPersonTransactions = () => {

    const {salesPersonLogged, salesPersonData} = useAppContext(); 

    const navigate = useNavigate();

    if (!salesPersonLogged || salesPersonData === null) return <Navigate to="/login"/>

    return (
        <>
            <SalesPersonNavbar/>
            <div className="container" style={{marginBottom: "50px"}}>
                <div className="row">
                    <div className="col-md-12 mb-4 text-center">
                        <button className="btn btn-success" onClick={() => navigate("/new_transaction")}><FaPlusCircle/> New Transaction</button>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>Transactions</h4>
                            </div>
                            <div className="col-lg-3">
                                <select className="form-select" style={{marginLeft: "10px", display: "inline-block", width: "200px"}}>
                                    <option>CASH</option>
                                    <option>POS</option>
                                </select>
                            </div>
                            <div className="col-md-5" style={{textAlign: "right"}}>
                                <label>Filter:</label>
                                <select className="form-select" style={{marginLeft: "10px", display: "inline-block", width: "200px"}}>
                                    <option>Today</option>
                                    <option>Yesterday</option>
                                    <option>Last 1 month</option>
                                </select>
                            </div>
                            <div className="col-md-12 mt-3">
                                {[1, 2, 3, 4, 5].map((key) => <Transaction key={key}/>)}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th colSpan="2" className="text-center">Today Overview</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{borderTop: "none"}}>
                                            <tr>
                                                <td>Total Sales</td>
                                                <td>&#8358;20000</td>
                                            </tr>
                                            <tr>
                                                <td>POS Sales</td>
                                                <td>&#8358;5000</td>
                                            </tr>
                                            <tr>
                                                <td>Cash Sales</td>
                                                <td>&#8358;3000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th colSpan="2" className="text-center">All Time Overview</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{borderTop: "none"}}>
                                            <tr>
                                                <td>Total Sales</td>
                                                <td>&#8358;20000</td>
                                            </tr>
                                            <tr>
                                                <td>POS Sales</td>
                                                <td>&#8358;5000</td>
                                            </tr>
                                            <tr>
                                                <td>Cash Sales</td>
                                                <td>&#8358;3000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        Date filter
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <label>Start Date:</label>
                                                <input type="date" className="form-control r-form"/>
                                            </div>
                                            <div className="col-lg-12 mt-1">
                                                <label>End Date:</label>
                                                <input type="date" className="form-control r-form"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer text-end">
                                        <button className="btn btn-success">Filter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalesPersonTransactions;