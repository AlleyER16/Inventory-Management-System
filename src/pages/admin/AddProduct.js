import AdminNavbar from "../../components/AdminNavbar";

import {useState, useRef} from "react";

import {FaSpinner} from "react-icons/fa";

import {CNT__addProduct} from "../../controllers/admin";

import {Navigate} from "react-router-dom";

const AddProduct = () => {

    const [form, setForm] = useState({product_name: "", product_price: "", sold_in_stocks: 1, stock: "", picture: null});

    const [requesting, setRequesting] = useState(false);
    const [server_response, set_server_response] = useState("");

    const [navigate, setNavigate] = useState({go:false, p_id: null});

    const fileInputRef = useRef(null);
    const imagePreviewRef = useRef(null);

    const handleFileChange = (e) => {

        if(e.target.files.length > 0){

            var src = URL.createObjectURL(e.target.files[0]);
            
            imagePreviewRef.current.src = src;

            setForm({...form, picture: e.target.files[0]});

        }else{

            imagePreviewRef.current.src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

        }

    }

    const triggerFileInputClick = () => {

        fileInputRef.current.click();

    }

    const handleChange = (e) => {

        console.log(e.target.name, e.target.value);

        setForm({...form, [e.target.name]:e.target.value});

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        setRequesting(true);

        const data = CNT__addProduct(form);

        if (data.message === "Product added successfully"){

            setNavigate({go:true,p_id:data.product_id});

        }else{

            set_server_response(data.message);
            setRequesting(false);

        }

    }

    if (navigate.go) {
        return <Navigate to={`/product/${navigate.p_id}`} />
    }

    return (
        <>
            <AdminNavbar/>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card card-body">
                            <div className="text-center">
                                <h3>Add Product</h3>
                                <p>Add a product</p>
                            </div>
                            <form className="form row" onSubmit={handleSubmit}>
                                <div className="col-lg-4 offset-lg-4 mb-2 text-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="avatar" style={{width: "100px", height: "100px"}} ref={imagePreviewRef} className="rounded"/>
                                    <input type="file" style={{display: "none"}} name="picture" ref={fileInputRef} onChange={handleFileChange}/>
                                </div>
                                <div className="col-lg-6 offset-lg-3 mb-3 text-center">
                                    <button type="button" className="btn btn-info text-white" onClick={triggerFileInputClick}>Select/Change Image</button>
                                </div>
                                <div className="col-lg-6 form-group mb-3">
                                    <label className="mb-2">Product Name</label>
                                    <input type="text" className="form-control r-form" placeholder="Enter product name" name="product_name" value={form.firstname} onChange={handleChange}/>
                                </div>
                                <div className="col-lg-6 form-group mb-3">
                                    <label className="mb-2">Sold in stocks</label>
                                    <select className="form-select r-form" name="sold_in_stocks" onChange={handleChange}>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div className="col-lg-6 form-group" style={(parseInt(form.sold_in_stocks) === 1) ? {} : {display: "none"}}>
                                    <label className="mb-2">Product Price</label>
                                    <input type="number" className="form-control r-form" placeholder="Enter product price" name="product_price" value={form.lastname} onChange={handleChange}/>
                                </div>
                                <div className="col form-group mb-3" style={(parseInt(form.sold_in_stocks) === 1) ? {} : {display: "none"}}>
                                    <label className="mb-2">Stock</label>
                                    <input type="number" className="form-control r-form" placeholder="Enter no of stock" name="stock" value={form.username} onChange={handleChange}/>
                                </div>
                                <div>
                                    {
                                        (requesting) ?
                                        <button className="btn btn-success r-form mt-3" style={{width: "100%"}} type="button"><FaSpinner className="spinner"/> Adding Product...</button>
                                        :
                                        <button className="btn btn-success r-form mt-3" style={{width: "100%"}} type="submit">Add Product</button>
                                    }
                                    
                                </div>
                                <div className="text-center pt-3">
                                    {server_response}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default AddProduct;