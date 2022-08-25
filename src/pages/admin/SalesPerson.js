import AdminNavbar from "../../components/AdminNavbar";

import { useParams } from "react-router-dom";

import { useState } from "react";

import Transaction from "../../components/Transaction";

const SalesPerson = () => {

    const {id:sales_person_id} = useParams();

    //console.log(sales_person_id);

    const [page, setPage] = useState("analytics");

    return (
        <>
            <AdminNavbar/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 text-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="avatar" style={{width: "100px", height: "100px"}} className="rounded-circle"/>
                        <p className="mt-1 mb-0">Rehoboth Micah-Daniels</p>
                        <p>@akashi_senpai</p>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <button onClick={() => setPage("analytics")} className={`btn btn${(page === "analytics") ? "": "-outline"}-primary`} type="button">Analytics</button>
                                <button onClick={() => setPage("transactions")} className={`btn btn${(page === "transactions") ? "": "-outline"}-primary ml-c`} type="button">Transactions</button>
                                <button onClick={() => setPage("sessions")} className={`btn btn${(page === "sessions") ? "": "-outline"}-primary ml-c`} type="button">Sessions</button>
                                <button onClick={() => setPage("edit_info")} className={`btn btn${(page === "edit_info") ? "": "-outline"}-primary ml-c`} type="button">Edit Information</button>
                            </div>
                            {
                                (page === "analytics") &&
                                <div className="col-lg-12 mt-4">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="card card-header">
                                                <h5>Today Sales:</h5>
                                                <h3 className="mb-0">&#8358;200.00</h3>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="card card-header">
                                                <h5>Total Sales:</h5>
                                                <h3 className="mb-0">&#8358;20000.00</h3>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="card card-header">
                                                <h5>Date Added:</h5>
                                                <h3 className="mb-0">12/12/2004</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                (page === "transactions") &&
                                <div className="col-lg-12 mt-4">
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default SalesPerson;