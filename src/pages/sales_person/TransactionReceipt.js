import SalesPersonNavbar from "../../components/SalesPersonNavbar";

import { FaPrint, FaEye, FaEdit, FaSpinner } from "react-icons/fa";

import { useEffect, useState } from "react";

import { useAppContext } from "../../context";

import { Navigate, useParams } from "react-router-dom";

import { CNT_getTransactionDetails } from "../../controllers/sales_persons";

const TransactionReceipt = () => {

    const {salesPersonLogged, salesPersonData} = useAppContext();

    const {id:transaction_id} = useParams();

    const [reloadComponent, setReloadComponent] = useState(true);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [pg_data, set_pg_data] = useState({});

    useEffect(()=>{

        if(reloadComponent){

            setLoading(true);
            setError(false);

            const data =  CNT_getTransactionDetails(transaction_id, salesPersonData.ID);

            if(data.message === "Transaction details fetched successfully"){

                set_pg_data(data.data);

                setLoading(false);

            }else{

                setLoading(false);
                setError(true);

            }

            setReloadComponent(false);

        }

    }, [reloadComponent]); 

    if (!salesPersonLogged || salesPersonData === null) return <Navigate to="/login"/>

    if(loading){

        return (
            <>
            <SalesPersonNavbar/>
            <div style={{position: "fixed", top: "0px", left: "0px", width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <h3><FaSpinner className="spinner"/> Loading Receipt...</h3>
            </div>
            </>
        );

    }

    if(error){

        return (
            <>
            <SalesPersonNavbar/>
            <div style={{position: "fixed", top: "0px", left: "0px", width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <h3>Error Loading Receipt. <span style={{color: "blue", cursor: "pointer"}} onClick={() => setReloadComponent(true)}>Try again</span></h3>
            </div>
            </>
        );

    }

    return (
        <>
            <SalesPersonNavbar/>
            <div className="container" style={{marginBottom: "50px"}}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card card-body">
                                    <div className="row">
                                        <div className="col-lg-12 text-center">
                                            <h3>Shokem Stores</h3>
                                            <p className="mb-0">Sales Receipt</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-lg-6">
                                            <b>Payment Type: </b> {pg_data.transaction_information.transaction_type}
                                        </div>
                                        <div className="col-lg-6 text-end">
                                            <b>Date: </b> {pg_data.transaction_information.date}
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-12">
                                            <hr/>
                                        </div>
                                    </div>
                                    {
                                        pg_data.products.map((product) => {
                                            return (
                                                <div key={product.product_id} className="row mb-2">
                                                    <div className="col-lg-3 text-center">
                                                        <img src={product.product_image} alt={product.product_name} className="rounded" style={{width: "100px", height: "100px"}}/><br/>
                                                        <span>{product.product_name}</span>
                                                    </div>
                                                    <div className="col-lg-3" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        {(product.unit_price) ? product.unit_price : "N/A"}
                                                    </div>
                                                    <div className="col-lg-3" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        {(product.quantity) ? product.quantity : "N/A"}
                                                    </div>
                                                    <div className="col-lg-3" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                        &#8358;{product.amount}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                    <div className="row my-2">
                                        <div className="col-lg-12">
                                            <hr/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 text-end">
                                            <b>Total: </b> &#8358;{pg_data.transaction_information.amount}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 text-center">
                                    <button className="btn btn-primary"><FaPrint/> Print Receipt</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                Customer Information
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <b>First Name: </b> {(pg_data.customer_information.first_name) ? pg_data.customer_information.first_name : "N/A"}
                                    </div>
                                    <div className="col-lg-12">
                                        <b>Last Name: </b> {(pg_data.customer_information.last_name) ? pg_data.customer_information.last_name : "N/A"}
                                    </div>
                                    <div className="col-lg-12">
                                        <b>Gender: </b> {(pg_data.customer_information.gender) ? pg_data.customer_information.gender : "N/A"}
                                    </div>
                                    <div className="col-lg-12">
                                        <b>Email address: </b> {(pg_data.customer_information.email_address) ? pg_data.customer_information.email_address : "N/A"}
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <button className="btn btn-primary"><FaEdit/> Edit</button>
                            </div>
                        </div>
                        {
                            (pg_data.transaction_information.transaction_type === "POS") &&
                            <div className="card mt-3">
                                <div className="card-header">
                                    Proof of Payment: POS Receipt
                                </div>
                                <div className="card-body text-center">
                                    {
                                        pg_data.transaction_information.proof_of_payment ?
                                        <img src={pg_data.transaction_information.proof_of_payment} alt="proof of payment" style={{width: "300px", height: "300px"}}/> :
                                        <div className="text-center">No proof of payment uploaded yet</div>
                                    }
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            {
                                                pg_data.transaction_information.proof_of_payment &&
                                                <a href={pg_data.transaction_information.proof_of_payment} target="_new" className="btn btn-primary"><FaEye/> Preview</a>
                                            }
                                        </div>
                                        <div className="col-md-6 text-end">
                                            <button className="btn btn-primary"><FaEdit/> Upload/Change</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );

}

export default TransactionReceipt;