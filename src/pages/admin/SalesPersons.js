import AdminNavbar from "../../components/AdminNavbar";

import { useAppContext } from "../../context";

import { Navigate, useNavigate } from "react-router-dom";

import {FaPlusCircle, FaSpinner} from "react-icons/fa";
import { useState, useEffect } from "react";

import { CNT__getSalesPersons } from "../../controllers/admin";

import SalesPersonsCMP from "../../components/SalesPersons";

const SalesPersons = () => {

    const {adminLogged} = useAppContext();

    if (!adminLogged) <Navigate to="/admin/login"/>

    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [page, setPage] = useState(1);
    const [salesPerson, setSalesPerson] = useState([]);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        
        setLoading(true);
        setError(false);

        const data = CNT__getSalesPersons(page);

        // console.log(data);

        if (data.message === "Sales persons fetched successfully"){

            setSalesPerson(data.sales_persons);
            setPagination(data.pagination);

            setLoading(false);

        }else{

            setError(true);
            setLoading(false);

        }
        
    }, [page]);

    const range = (num) => {

        const rng = [];

        for(let i = 1; i <= num; i++){
            
            rng.push(i);

        }

        return rng;

    }

    return (
        <>
            <AdminNavbar/>            
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h4>Sales Persons</h4>
                        <button className="btn btn-success" onClick={()=>navigate("/admin/add_sales_person")}><FaPlusCircle/> New Sales Person</button>
                    </div>
                </div>
                {
                    loading ? 
                    <div className="row" style={{marginTop: "50px"}}>
                        <div className="col-lg-12">
                            <div className="text-center">
                                <h3><FaSpinner className="spinner"/> Loading...</h3>
                            </div>
                        </div>
                    </div>
                    :
                    error ? 
                    <div className="row" style={{marginTop: "50px"}}>
                        <div className="col-lg-12">
                            <div className="text-center">
                                <h5>Error fetching Sales Persons. <span onClick={() => setPage(1)} style={{color: "blue", cursor: "pointer"}}>Try again</span></h5>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        {
                            (salesPerson.length >= 1) ?
                            <SalesPersonsCMP sales_persons={salesPerson}/> :
                            <div className="row mt-4">
                                <div className="col-md-12 text-center">
                                    There are no sales persons
                                </div>
                            </div>
                        }
                        <div className="row mt-4">
                            <div className="col-md-12 text-center">
                                <div class="btn-group">
                                    {range(pagination).map((pg) => {
                                        return <button key={pg} type="button" class={`btn btn${(page === pg) ? "" : "-outline"}-primary`} onClick={() => setPage(pg)}>{pg}</button>
                                    })}
                                </div>
                            </div>
                        </div>
                    </>

                }
            </div>
        </>
    );

}

export default SalesPersons