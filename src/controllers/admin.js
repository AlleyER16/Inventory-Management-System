import $ from "jquery";

import {api_path} from "./data";

const CNT__adminLogin = (username, password) => {
    let message = "";

    $.ajax({
        type: "POST",
        data: {
            username, password
        },
        url: api_path + "admin_login.php",
        async: false,
        success: (data) => {
            message = data
        }
    });

    return message
}

const CNT__addSalesPerson = ({firstname, lastname, username, password, picture}) => {

    let message = "";

    const form_data = new FormData();

    form_data.append("firstname", firstname);
    form_data.append("lastname", lastname);
    form_data.append("username", username);
    form_data.append("password", password);
    form_data.append("picture", picture);

    $.ajax({
        type: "POST",
        data: form_data,
        contentType: false,
        processData: false,
        url: api_path + "add_sales_person.php",
        async: false,
        success: (data) => {
            
            message = data;

        }
    });

    return message;

}

const CNT__addProduct = ({product_name, product_price, sold_in_stocks, stock, picture}) => {

    let message = "";

    const form_data = new FormData();

    form_data.append("product_name", product_name);
    form_data.append("product_price", product_price);
    form_data.append("sold_in_stocks", sold_in_stocks);
    form_data.append("stock", stock);
    form_data.append("picture", picture);

    $.ajax({
        type: "POST",
        data: form_data,
        contentType: false,
        processData: false,
        url: api_path + "add_product.php",
        async: false,
        success: (data) => {
            
            message = data;

        }
    });

    return message;

}

const CNT__getSalesPersons = (page) => {

    let message = "";

    $.ajax({
        type: "GET",
        url: api_path + "get_sales_persons.php",
        data: {page},
        async: false,
        success: (data) => {
            message = data
        }
    });

    return message

}

export {CNT__adminLogin, CNT__addSalesPerson, CNT__getSalesPersons, CNT__addProduct}