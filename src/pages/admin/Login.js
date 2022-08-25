import { useState } from "react";
import {useNavigate} from "react-router-dom";

import { useAppContext } from "../../context";

import { FaSpinner } from "react-icons/fa";

import { CNT__adminLogin } from "../../controllers/admin";

const AdminLogin = () => {

    const {updateAdminLogged} = useAppContext();

    const [requesting, setRequesting] = useState(false);
    const [serverResponse, setServerResponse] = useState("");

    //controlled input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        setRequesting(true);

        const server_response = CNT__adminLogin(username, password).message;

        if(server_response === "Admin logged successfully"){

            updateAdminLogged(true);

            navigate("/admin/transactions");

        }else{

            setServerResponse(server_response);
            setRequesting(false);

        }
        
    }

    return (
        <div className="login-container" onSubmit={handleSubmit}>
            <div className="login-div" style={{width: "30%"}}>
                <div className="card card-body">
                    <div className="text-center">
                        <h3>Admin Login</h3>
                        <p>Login to manage business</p>
                    </div>
                    <form className="form">
                        <div className="form-group mb-3">
                            <label className="mb-2">Username</label>
                            <input type="text" className="form-control r-form" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label className="mb-2">Password</label>
                            <input type="password" className="form-control r-form" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            {
                                requesting ? 
                                <button className="btn btn-success r-form mt-3" style={{width: "100%"}} type="button"><FaSpinner className="spinner"/> Login</button>
                                :
                                <button className="btn btn-success r-form mt-3" style={{width: "100%"}} type="submit">Login</button>
                            }
                            
                        </div>
                        {serverResponse && 
                        <div className="text-center pt-3">
                            {serverResponse}
                        </div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin