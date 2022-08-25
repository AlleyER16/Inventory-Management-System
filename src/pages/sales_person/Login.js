import {useNavigate} from "react-router-dom";

import { useState } from "react";

import { FaSpinner } from "react-icons/fa";

import { CNT__salesPersonLogin } from "../../controllers/sales_persons";

import { useAppContext } from "../../context";

const Login = () => {

    const [form, setForm] = useState({username:"", password:""});

    const [requesting, setRequesting] = useState(false);

    const [server_response, setServerResponse] = useState("");

    const navigate = useNavigate();

    const {loginSalesPerson} = useAppContext();

    const handleSubmit = (e) => {

        e.preventDefault();

        setRequesting(true);
        
        const data = CNT__salesPersonLogin(form);

        if (data.message === "Login successfully"){

           loginSalesPerson(data.sales_person_details);

            navigate("/transactions");

        }else{

            setServerResponse(data.message);
            setRequesting(false);

        }
        
    }

    const handleChange = (e) => {

        setForm({...form, [e.target.name]:e.target.value});

    }

    return (
        <div className="login-container" onSubmit={handleSubmit}>
            <div className="login-div" style={{width: "30%"}}>
                <div className="card card-body">
                    <div className="text-center">
                        <h3>Login</h3>
                        <p>Login to your account</p>
                    </div>
                    <form className="form">
                        <div className="form-group mb-3">
                            <label className="mb-2">Username</label>
                            <input type="text" name="username" className="form-control r-form" placeholder="Enter username" value={form.username} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label className="mb-2">Password</label>
                            <input type="password" name="password" className="form-control r-form" placeholder="Enter password" value={form.password} onChange={handleChange}/>
                        </div>
                        <div>
                            {
                                requesting ?
                                <button type="button" className="btn btn-success r-form mt-3" style={{width: "100%"}}><FaSpinner className="spinner"/> Logging in...</button>:
                                <button type="submit" className="btn btn-success r-form mt-3" style={{width: "100%"}}>Login</button>
                            }
                            
                        </div>
                        {
                            server_response &&
                            <div className="text-center mt-2">
                                {server_response}
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login