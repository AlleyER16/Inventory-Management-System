const reducer = (currentState, action) => {

    if (action.type === "UPDATE_ADMIN_LOGGED") {
        return {...currentState, adminLogged: action.payload.value}
    }else if (action.type === "LOGIN_SALES_PERSON"){
        return {...currentState, salesPersonLogged: true, salesPersonData: action.payload.sales_person_data}
    }else if (action.type === "UPDATE_TRANSACTION_CUSTOMER_INFORMATION"){
        return {...currentState, transactionDraft: {...currentState.transactionDraft, customer_information: action.payload.customer_information}}
    }else if (action.type === "UPDATE_TRANSACTION_TRANSACTION_INFORMATION"){
        return {...currentState, transactionDraft: {...currentState.transactionDraft, transaction_information: action.payload.transaction_information}}
    }else if (action.type === "ADD_NEW_TRANSACTION_PRODUCT"){
        let new_product = action.payload.product;
        if (new_product.SoldInStocks === 1){
            new_product.Quantity = 1
        }else{
            new_product.Amount = 0.0
        }
        return {...currentState, transactionDraft: {...currentState.transactionDraft, products: [...currentState.transactionDraft.products, new_product]}}
    }else if (action.type === "UPDATE_NEW_TRANSACTION_PRODUCT_DATUM"){
        const new_products = currentState.transactionDraft.products.map((product) => {
            if (product.ProductID === action.payload.product_id){
                return {...product, [action.payload.datum_key]: action.payload.new_value}
            }
            return product
        })
        return {...currentState, transactionDraft: {...currentState.transactionDraft, products: new_products}};
    }else if (action.type === "REMOVE_NEW_TRANSACTION_PRODUCT"){
        const new_products = currentState.transactionDraft.products.filter((product) => product.ProductID !== action.payload.product_id);
        return {...currentState, transactionDraft: {...currentState.transactionDraft, products: new_products}};
    }else if (action.type === "CLEAR_TRANSACTION_DRAFT"){

        return {...currentState, transactionDraft: {
            customer_information: {
                first_name: "",
                last_name: "",
                gender: "Male",
                email_address: ""
            },
            transaction_information: {
                transaction_type: "Cash"
            },
            products: []
        }};

    }

    return currentState;

}

export default reducer;