import { FaEye } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const SalesPersonsCMP = ({sales_persons}) => {

    // console.log(sales_persons);

    const navigate = useNavigate();

    return (
        <div className="row mt-4">
            {sales_persons.map((sales_person) => {

                const {ID, FirstName, LastName, Username, Picture, Status} = sales_person;

                return (
                    <div key={ID} className="col-md-3">
                        <div className="card card-body">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <img src={Picture} style={{width: "150px", height: "150px"}} className="rounded-circle" alt={`${FirstName} ${LastName}`}/>
                                </div>
                                <div className="col-lg-12 text-center mt-2">
                                    <h5 className="mb-0">{`${FirstName} ${LastName}`}</h5>
                                    <p className="mb-0">@{Username}</p>
                                    {
                                        (Status === "ACTIVE")?
                                        <p className="my-2 text-success">ACTIVE</p>:
                                        <p className="my-2 text-danger">INACTIVE</p>
                                    }
                                </div>
                                <div className="col-lg-12">
                                    <button onClick={() => navigate(`/admin/sales_person/${ID}`)} className="btn btn-info text-white" style={{width: "100%"}}><FaEye/> View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default SalesPersonsCMP;