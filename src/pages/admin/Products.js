import AdminNavbar from "../../components/AdminNavbar";

import {FaPlusCircle} from "react-icons/fa";

import {useNavigate} from "react-router-dom";

const Products = () => {

    const navigate = useNavigate();

    return (
        <>
            <AdminNavbar/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h4>Products</h4>
                        <button className="btn btn-success" onClick={()=>navigate("/admin/add_product")}><FaPlusCircle/> New Product</button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Products