import { useAppContext } from "../../context";

import { Navigate } from "react-router-dom";

import AdminNavbar from "../../components/AdminNavbar";

import { useRef, useState } from "react";

import { FaSpinner } from "react-icons/fa";

import { CNT__addSalesPerson } from "../../controllers/admin";

const AddSalesPerson = () => {

    const {adminLogged} =  useAppContext();

    if (!adminLogged) <Navigate to="/admin/login"/>

    const [form, setForm] = useState({firstname: "", lastname: "", username: "", password: "", picture: null});
    const [requesting, setRequesting] = useState(false);
    const [server_response, set_server_response] = useState("");
    const [navigate, setNavigate] = useState({go: false, sp_id: null});

    const fileInputRef = useRef(null);
    const imagePreviewRef = useRef(null);

    const triggerFileInputClick = () => {

        fileInputRef.current.click();

    }

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        // console.log(name, value)

        setForm({...form, [name]:value});

    }

    const handleFileChange = (e) => {

        if(e.target.files.length > 0){

            var src = URL.createObjectURL(e.target.files[0]);
            
            imagePreviewRef.current.src = src;

            setForm({...form, picture: e.target.files[0]});

        }else{

            imagePreviewRef.current.src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

        }

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        setRequesting(true);

        const data = CNT__addSalesPerson(form);

        if (data.message === "Sales person added successfully"){

            setNavigate({go:true,sp_id:data.sales_person_id});

        }else{

            set_server_response(data.message);
            setRequesting(false);

        }

    }

    if(navigate.go){
        return <Navigate to={`sales_person/${navigate.sp_id}`}/>
    }

    return(
        <>
            <AdminNavbar/>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card card-body">
                            <div className="text-center">
                                <h3>Add Sales Person</h3>
                                <p>Add a sales person</p>
                            </div>
                            <form className="form row" onSubmit={handleSubmit}>
                                <div className="col-lg-4 offset-lg-4 mb-2 text-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="avatar" style={{width: "100px", height: "100px"}} ref={imagePreviewRef} className="rounded-circle"/>
                                    <input type="file" style={{display: "none"}} name="picture" ref={fileInputRef} onChange={handleFileChange}/>
                                </div>
                                <div className="col-lg-6 offset-lg-3 mb-3 text-center">
                                    <button type="button" className="btn btn-info text-white" onClick={triggerFileInputClick}>Select/Change Image</button>
                                </div>
                                <div className="col-lg-6 form-group mb-3">
                                    <label className="mb-2">First Name</label>
                                    <input type="text" className="form-control r-form" placeholder="Enter first name" name="firstname" value={form.firstname} onChange={handleChange}/>
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label className="mb-2">Last Name</label>
                                    <input type="text" className="form-control r-form" placeholder="Enter last name" name="lastname" value={form.lastname} onChange={handleChange}/>
                                </div>
                                <div className="col-lg-6 form-group mb-3">
                                    <label className="mb-2">Username</label>
                                    <input type="text" className="form-control r-form" placeholder="Enter username" name="username" value={form.username} onChange={handleChange}/>
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label className="mb-2">Password</label>
                                    <input type="password" className="form-control r-form" placeholder="Enter password" name="password" value={form.password} onChange={handleChange}/>
                                </div>
                                <div>
                                    {
                                        (requesting) ?
                                        <button className="btn btn-success r-form mt-3" style={{width: "100%"}} type="button"><FaSpinner className="spinner"/> Adding...</button>
                                        :
                                        <button className="btn btn-success r-form mt-3" style={{width: "100%"}} type="submit">Add</button>
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

export default AddSalesPerson