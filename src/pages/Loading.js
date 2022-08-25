import { useEffect, useState } from "react";
import {Navigate} from "react-router-dom";
import {FaSpinner} from "react-icons/fa";

import { useAppContext } from "../context";

const Loading = () => {

    const [navigate, setNavigate] = useState(false);

    const {appName} = useAppContext();

    useEffect(() => {
        document.title = "Loading :: IMS";

        const loadingTimeout = setTimeout(() => {
            setNavigate(true)
        }, 3000);

        return () => clearTimeout(loadingTimeout);

    }, []);

    if (navigate) return <Navigate to="/login"/>

    return (
        <div className="loading-div">
            <div style={{display: "block"}}>
                <h3>{appName}</h3>
                <p className="text-center"><FaSpinner className="spinner"/> Loading...</p>
            </div>
        </div>
    );
}

export default Loading