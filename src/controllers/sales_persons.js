import $ from "jquery";

import {api_path} from "./data";

const CNT__salesPersonLogin = ({username, password}) => {
    let message = "";

    $.ajax({
        type: "POST",
        data: {
            username, password
        },
        url: api_path + "sales_person_login.php",
        async: false,
        success: (data) => {
            message = data
        }
    });

    return message
}

const CNT__searchProducts = (search_keyword, page=1) => {

    let message = "";

    $.ajax({
        type: "GET",
        url: api_path + "search_products.php",
        data: {search_keyword, page},
        async: false,
        success: (data) => {
            message = data
        }
    });

    return message

}

const CNT__getProductDetails = (product_id) => {

    let message = "";

    $.ajax({
        type: "GET",
        url: api_path + "get_product_details.php",
        data: {product_id},
        async: false,
        success: (data) => {
            message = data
        }
    });

    return message

}

const CNT__addNewTransaction = (sales_person, data) => {

    let message = "";

    $.ajax({
        type: "POST",
        url: api_path + "add_new_transaction.php",
        data: {sales_person, data: JSON.stringify(data)},
        async: false,
        success: (data) => {
            message = data
        }
    });

    return message

}

const CNT_getTransactionDetails = (transaction_id, sales_person_id) => {

    let message = "";

    $.ajax({
        type: "GET",
        url: api_path + "get_transaction_details.php",
        data: {transaction_id, sales_person_id},
        async: false,
        success: (data) => {
            message = data
        }
    });

    return message

}

export {
    CNT__salesPersonLogin, 
    CNT__searchProducts, 
    CNT__getProductDetails, 
    CNT__addNewTransaction,
    CNT_getTransactionDetails
}