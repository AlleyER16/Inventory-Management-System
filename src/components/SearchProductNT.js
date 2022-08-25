import { FaPlusCircle } from "react-icons/fa";

import { useAppContext } from "../context";

const SearchProductNT = ({product}) => {

    const {ProductID, ProductImage, ProductName, SoldInStocks, ProductPrice, Stock} = product;

    const ready_to_add_product = {
        ProductID: parseInt(ProductID),
        SoldInStocks: parseInt(SoldInStocks)
    }

    const {
        addNewTransactionProduct,
        inNewTransactionProducts
    } = useAppContext();

    return (
        <div className="col-lg-6">
            <div className="card card-body">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <img src={ProductImage} style={{width: "150px", height: "150px"}} className="rounded" alt={ProductName}/>
                    </div>
                    <div className="col-lg-12 text-center mt-2">
                        <h5 className="mb-0">{ProductName}</h5>
                        {
                            (parseInt(SoldInStocks) === 1)?
                            <p className="my-2 text-success">Price: &#8358;{ProductPrice}<br/>Stock: {Stock}</p>:
                            <p className="my-2"></p>
                        }
                    </div>
                    <div className="col-lg-12">
                        {
                            (inNewTransactionProducts(parseInt(ProductID)))?
                            <button type="button" className="btn btn-info text-white" style={{width: "100%"}} disabled>IN PRODUCTS</button>:
                            <button type="button" className="btn btn-info text-white" style={{width: "100%"}} onClick={() => addNewTransactionProduct(ready_to_add_product)}><FaPlusCircle/> Add</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SearchProductNT;