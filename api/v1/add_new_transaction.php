<?php

    require_once "../helpers/cors.php";

    header("Content-Type: application/json");

    if(!isset($_POST["sales_person"]) || $_POST["sales_person"] == "" || !isset($_POST["data"]) || empty($_POST["data"])){

        echo json_encode([
            "message" => "An error occured. Try again"
        ]);

        die();

    }

    $sales_person_id = $_POST["sales_person"];
    $data = json_decode($_POST["data"]);

    // print_r($data); die();

    $root_redirect = "../../";

    require_once $root_redirect."ebl/SalesPersons.class.php";

    $sales_persons_obj = new SalesPersons();

    $sales_person_exists = $sales_persons_obj->sales_person_exists("ID", $sales_person_id);

    if(!$sales_person_exists[0]){

        echo json_encode([
            "message" => "Error identifying sales person"
        ]);

        die();

    }

    if($data->customer_information->gender == ""){

        echo json_encode([
            "message" => "Fill in customer gender"
        ]);

        die();

    }

    require_once $root_redirect."ebl/Customers.class.php";

    $customers_obj = new Customers();

    $add_customer = $customers_obj->add_customer($data->customer_information->first_name, $data->customer_information->last_name, $data->customer_information->gender, $data->customer_information->email_address);

    if(!$add_customer[0]){

        json_encode([
            "message" => "Error adding customer. Try again"
        ]);

        die();

    }

    $customer_id = $add_customer[1];

    require_once $root_redirect."ebl/Transactions.class.php";

    $transactions_obj = new Transactions();

    $add_transaction = $transactions_obj->add_transaction($sales_person_id, $data->transaction_information->transaction_type, $customer_id);

    if(!$add_transaction[0]){

        $customers_obj->delete_customer($customer_id);

        json_encode([
            "message" => "Error adding transaction. Try again"
        ]);

        die();

    }

    $transaction_id = $add_transaction[1];


    require_once $root_redirect."ebl/Products.class.php";

    $products_obj = new Products();

    function rollback_transaction_products($index, $message){

        global $products_obj, $transactions_obj, $customers_obj, $products_obj, $transaction_id, $customer_id;

        for ($i = 0; $i < $index; $i++){

            $product = $data->products[$i];

            $products_obj->delete_transaction_product($transaction_id, $product->ProductID);

            if($product->SoldInStocks){
                $products_obj->update_product_stock($product->ProductID, $product->Quantity, "increase");
            }

        }

        $transactions_obj->delete_transaction($transaction_id);

        $customers_obj->delete_customer($customer_id);

        echo json_encode([
            "message" => "Product validations failed",
            "product_error" => $message
        ]);

        die();

    }

    $total_amount = 0;

    for($i = 0; $i < count($data->products); $i++){

        $product = $data->products[$i];

        $product_exists = $products_obj->product_exists("ProductID", $product->ProductID);

        if(!$product_exists[0] && in_array("Could not identify one or more products", $products_validations)){
            rollback_transaction_products($i, "Could not identify one or more products");
        }

        $product_details = $product_exists[1];

        if($product_details->SoldInStocks != $product->SoldInStocks){
            rollback_transaction_products($i, "Data mismatch for product ".$product_details->ProductName);
        }

        $amount = 0;

        if($product->SoldInStocks){

            if($product->Quantity == 0){
                rollback_transaction_products($i, "Product quantity cannot be 0 for ".$product_details->ProductName);
            }
    
            if($product_details->Stock < $product->Quantity){
                rollback_transaction_products($i, "More quantity than available stock for product ".$product_details->ProductName);
            }

            $amount = $product->Quantity * $product_details->ProductPrice;

        }else{

            $amount = $product->Amount;

        }

        if($products_obj->transaction_product_exists($transaction_id, $product->ProductID)){
            rollback_transaction_products($i, "Product ".$product_details->ProductName." added more than once");
        }

        if($products_obj->add_transaction_product($transaction_id, $product->ProductID, $product->Quantity ?? "", $product_details->ProductPrice ?? "", $amount)){
            if($product->SoldInStocks){
                $products_obj->update_product_stock($product->ProductID, $product->Quantity, "decrease");
            }
            $total_amount += $amount;
        }else{
            rollback_transaction_products($i, "Error adding transaction. Try again");
        }

    }

    $transactions_obj->update_transaction_datum($transaction_id, "Amount", $total_amount);

    echo json_encode([
        "message" => "Transaction added successfully",
        "transaction_id" => $transaction_id
    ]);

?>