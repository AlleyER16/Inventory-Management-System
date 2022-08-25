import SalesPersonNavbar from "../../components/SalesPersonNavbar";

import { FaPlusCircle, FaSearch, FaTrash, FaCheckCircle } from "react-icons/fa";

import { useState, useEffect } from "react";

import { useAppContext } from "../../context";

import { CNT__searchProducts, CNT__getProductDetails, CNT__addNewTransaction } from "../../controllers/sales_persons";

import { Navigate, useNavigate } from "react-router-dom";

import SearchProductNT from "../../components/SearchProductNT";

const NewTransaction = () => {

    const navigate = useNavigate();

    const [searchProducts, setSearchProducts] = useState(false);

    const [search_keyword, set_search_keyword] = useState("");
    const [search_page, set_search_page] = useState(1);

    const [search_products, set_search_products] = useState([]);
    const [search_products_pagination, set_search_products_pagination] = useState([]);
    const [error_search, set_error_search] = useState(false);

    const {
        transactionDraft, 
        updateTransactionCustomerInformation,
        updateTransactionTransactionInformation,
        updateNewTransactionProductDatum,
        removeNewTransactionProduct,
        salesPersonLogged, 
        salesPersonData,
        clearTransactionDraft
    } = useAppContext();

    const [customer_information, set_customer_information] = useState(transactionDraft.customer_information);
    const [transaction_information, set_transaction_information] = useState(transactionDraft.transaction_information);

    const [server_response, set_server_response] = useState("");

    useEffect(() => {

        updateTransactionCustomerInformation(customer_information);

    }, [customer_information]);

    useEffect(() => {

        updateTransactionTransactionInformation(transaction_information);

    }, [transaction_information]);

    useEffect(() => {

        if(server_response){

            setTimeout(() => {
                set_server_response("");
            }, 3000);

        }

    }, [server_response]);

    const handleSearchProductsForm = (e) => {

        e.preventDefault();

        const data = CNT__searchProducts(search_keyword, search_page);

        if (data.message === "Products search fetched successfully"){

            set_search_products(data.search_products);
            set_search_products_pagination(data.pagination);

        }else{

            set_error_search(true);

        }

    }

    const handleCustomerInfoChange = (e) => {

        set_customer_information({...customer_information, [e.target.name]:e.target.value})

    }

    const handleTransactionInfoChange = (e) => {

        set_transaction_information({...transaction_information, [e.target.name]:e.target.value})

    }

    const addNewTransaction = () => {

        const data = CNT__addNewTransaction(salesPersonData.ID, transactionDraft);

        if(data.message === "Transaction added successfully"){

            clearTransactionDraft();

            navigate(`/receipt/${data.transaction_id}`);

        }else{

            set_server_response(data.message);

        }

    }

    if (!salesPersonLogged || salesPersonData === null) return <Navigate to="/login"/>

    let transactionAmount = 0.0;

    return (
        <>
            <SalesPersonNavbar/>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h3>New Transaction</h3>
                            </div>
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">Customer Information</div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <div className="form-group">
                                                    <label>Email address:</label>
                                                    <input type="email" className="form-control" placeholder="Enter email address" name="email_address" value={customer_information.email_address} onChange={handleCustomerInfoChange}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <label>Gender:</label>
                                                    <select className="form-select" name="gender" onChange={handleCustomerInfoChange}>
                                                        <option >Male</option>
                                                        <option>Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <div className="form-group">
                                                    <label>First Name:</label>
                                                    <input type="text" className="form-control" placeholder="Enter first name" name="first_name" value={customer_information.first_name} onChange={handleCustomerInfoChange}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <div className="form-group">
                                                    <label>Last Name:</label>
                                                    <input type="text" className="form-control" placeholder="Enter last name" name="last_name" value={customer_information.last_name} onChange={handleCustomerInfoChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 mt-4">
                                <div className="card">
                                    <div className="card-header">Transaction Information</div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Payment Type:</label>
                                                    <select className="form-select" name="transaction_type" onChange={handleTransactionInfoChange}>
                                                        <option>Cash</option>
                                                        <option>POS</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 mt-4">
                                <div className="card">
                                    <div className="card-header">Products</div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive">
                                                    <table className="table table-bordered table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>S/N</th>
                                                                <th>Product</th>
                                                                <th>Unit Price</th>
                                                                <th>Quantity</th>
                                                                <th>Amount</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody style={{borderTop: "none"}}>
                                                            {
                                                                (transactionDraft.products.length >= 1)?
                                                                <>
                                                                {
                                                                    transactionDraft.products.map((product, index) => {
                                                                        let product_details = CNT__getProductDetails(product.ProductID);
                                                                        if (product_details.message !== "Product details fetched successfully"){
                                                                            // removeNewTransactionProduct(product.ProductID);
                                                                            return <></>;
                                                                        }
                                                                        product_details = product_details.product_details;
                                                                        if(parseInt(product_details.SoldInStocks) !== product.SoldInStocks){
                                                                            // removeNewTransactionProduct(product.ProductID);
                                                                            return <></>;
                                                                        }
                                                                        if(product.SoldInStocks){
                                                                            transactionAmount += parseFloat(product_details.ProductPrice) * product.Quantity;
                                                                            // updateNewTransactionProductDatum(product.ProductID, "Amount", parseFloat(product_details.ProductPrice) * product.Quantity);
                                                                        }else{
                                                                            transactionAmount += product.Amount;
                                                                        }
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{index+1}</td>
                                                                                <td className="text-center">
                                                                                    <img src={product_details.ProductImage} alt={product_details.ProductName} style={{width: "100px", height: "100px"}} className="rounded" /><br/>
                                                                                    <span>{product_details.ProductName}</span>
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    {
                                                                                        (parseInt(product_details.SoldInStocks) === 1) ?
                                                                                        <>&#8358;{product_details.ProductPrice}</>:
                                                                                        "N/A"
                                                                                    }
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    {
                                                                                        (parseInt(product_details.SoldInStocks) === 1) ?
                                                                                        <input 
                                                                                            type="number" 
                                                                                            min="1" 
                                                                                            max={product_details.Stock}
                                                                                            className="form-control r-form" 
                                                                                            value={product.Quantity} 
                                                                                            onChange={(e) => updateNewTransactionProductDatum(product.ProductID, "Quantity", parseInt(e.target.value))} 
                                                                                            style={{width: "80px"}}
                                                                                        />:
                                                                                        "N/A"
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        (parseInt(product_details.SoldInStocks) === 0) ?
                                                                                        <input 
                                                                                            type="number" 
                                                                                            min="0" 
                                                                                            className="form-control r-form" 
                                                                                            value={product.Amount} 
                                                                                            style={{width: "80px"}}
                                                                                            onChange={(e) => updateNewTransactionProductDatum(product.ProductID, "Amount", parseFloat(e.target.value))}
                                                                                            />:
                                                                                        <>&#8358;{product.Quantity * parseFloat(product_details.ProductPrice)}</>
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    <button type="btn" className="btn btn-danger" onClick={() => removeNewTransactionProduct(product.ProductID)}><FaTrash/></button>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })
                                                                }
                                                                <tr>
                                                                    <td colSpan="6" style={{textAlign: "right"}}>Total: &#8358;{transactionAmount}</td>
                                                                </tr>
                                                                </>:
                                                                <tr>
                                                                    <td colSpan="6" className="text-center">No products added</td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-primary" onClick={() => setSearchProducts(true)}><FaPlusCircle/> Add Product</button>
                                            </div>
                                            <div className="col-lg-6" style={{textAlign: "right"}}>
                                                <button className="btn btn-success" onClick={addNewTransaction}><FaCheckCircle/> Add Transaction</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                server_response &&
                                <div className="col-lg-12 mt-4">
                                    <div class="alert alert-danger">
                                        {server_response}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-5">
                        {
                            searchProducts &&
                            <>
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={handleSearchProductsForm}>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Search product to add" value={search_keyword} onChange={(e) => set_search_keyword(e.target.value)} required/>
                                            <div className="input-group-append">
                                                <button className="btn btn-success" type="submit"><FaSearch/></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row mt-3">
                                {
                                    (error_search) ? 
                                    <div className="col-lg-12 text-center">
                                        An error occured. Try again
                                    </div>:
                                    <>
                                    {
                                        (search_products.length === 0) ?
                                        <div className="col-lg-12 text-center">
                                            No search results
                                        </div>:
                                        <>
                                            {search_products.map((product) => <SearchProductNT key={product.ProductID} product={product} />)}
                                        </>
                                    }
                                    </>
                                }
                            </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );

}

export default NewTransaction