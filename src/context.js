import { createContext, useContext, useReducer, useEffect } from "react";

import reducer from "./reducer";

const AppContext = createContext();

const initialState = {
    appName: "Inventory Management System",
    loadSalesPersonNavbar: false,
    adminLogged: false,
    salesPersonLogged: false,
    salesPersonData: null,
    transactionDraft: {
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
    }
}

const getInitialState = () => {
    const appInitState = localStorage.getItem("app_state") || JSON.stringify(initialState);

    return JSON.parse(appInitState);
}

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, getInitialState());

    useEffect(() => {
        localStorage.setItem("app_state", JSON.stringify(state));
    }, [state]);

    const updateAdminLogged = (value) => {
        dispatch({type: "UPDATE_ADMIN_LOGGED", payload: {value}})
    }

    const loginSalesPerson = (sales_person_data) => {
        dispatch({type: "LOGIN_SALES_PERSON", payload: {sales_person_data}})
    }

    const updateTransactionCustomerInformation = (customer_information) => {
        dispatch({type: "UPDATE_TRANSACTION_CUSTOMER_INFORMATION", payload: {customer_information}})
    }

    const updateTransactionTransactionInformation = (transaction_information) => {
        dispatch({type: "UPDATE_TRANSACTION_TRANSACTION_INFORMATION", payload: {transaction_information}})
    }

    const addNewTransactionProduct = (product) => {
        dispatch({type: "ADD_NEW_TRANSACTION_PRODUCT", payload: {product}})
    }

    const updateNewTransactionProductDatum = (product_id, datum_key, new_value) => {
        dispatch({type: "UPDATE_NEW_TRANSACTION_PRODUCT_DATUM", payload: {product_id, datum_key, new_value}})
    }

    const removeNewTransactionProduct = (product_id) => {
        dispatch({type: "REMOVE_NEW_TRANSACTION_PRODUCT", payload: {product_id}});
    }

    const inNewTransactionProducts = (product_id) => {
        let count = 0;

        state.transactionDraft.products.forEach((product) => {
            count += (product.ProductID === product_id) ? 1 : 0;
        });

        return (count === 1);
    }

    const clearTransactionDraft = () => {

        dispatch({type: "CLEAR_TRANSACTION_DRAFT"});

    }

    return (
        <AppContext.Provider value={{
            ...state, 
            updateAdminLogged, 
            loginSalesPerson, 
            updateTransactionCustomerInformation, 
            updateTransactionTransactionInformation,
            addNewTransactionProduct, 
            updateNewTransactionProductDatum,
            removeNewTransactionProduct,
            inNewTransactionProducts,
            clearTransactionDraft
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
}

export {AppProvider, useAppContext}