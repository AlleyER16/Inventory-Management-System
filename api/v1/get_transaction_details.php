<?php

    require_once "../helpers/cors.php";

    header("Content-Type: application/json");

    if(!isset($_GET["transaction_id"]) || $_GET["transaction_id"] == ""){

        echo json_encode([
            "message" => "An error occured. Try again"
        ]);

        die();

    }

    $transaction_id = $_GET["transaction_id"];

    $root_redirect = "../../";

    require_once $root_redirect."ebl/Transactions.class.php";

    $transactions_obj = new Transactions();

    $transaction_exists = $transactions_obj->transacion_exists_by_id($transaction_id);

    if(!$transaction_exists[0]){

        echo json_encode([
            "message" => "Error identifying transaction"
        ]);

        die();

    }

    $transaction_details = $transaction_exists[1];

    
    require_once $root_redirect."ebl/SalesPersons.class.php";

    $sales_persons_obj = new SalesPersons();

    $sales_person_exists = $sales_persons_obj->sales_person_exists("ID", $transaction_details->SalesPerson);

    if(!$sales_person_exists[0]){

        echo json_encode([
            "message" => "Data mismatch"
        ]);

        die();

    }

    $sales_person_details = $sales_person_exists[1];

    if(isset($_GET["sales_person_id"]) && $_GET["sales_person_id"] != ""){

        if ($transaction_details->SalesPerson != $_GET["sales_person_id"]){

            echo json_encode([
                "message" => "You're unauthorized to view this transaction"
            ]);
    
            die();

        }        

    }

    $__base_url = "http://localhost/ims/";

    $sales_person = [
        "sales_person_id" => $sales_person_details->ID,
        "first_name" => $sales_person_details->FirstName,
        "last_name" => $sales_person_details->LastName,
        "picture" => $__base_url.$sales_person_details->Picture,
        "username" => $sales_person_details->Username
    ];

    $transaction = [
        "transaction_id" => $transaction_details->ID,
        "transaction_type" => $transaction_details->PaymentType,
        "proof_of_payment" => ($transaction_details->ProofOfPayment != NULL) ?  $__base_url.$transaction_details->ProofOfPayment : $transaction_details->ProofOfPayment,
        "date" => date("d-m-Y h:ia", $transaction_details->TransactionTimestamp),
        "amount" => $transaction_details->Amount
    ];

    require_once $root_redirect."ebl/Customers.class.php";

    $customers_obj = new Customers();

    $customer_exists = $customers_obj->customer_exists("ID", $transaction_details->Customer);

    if(!$customer_exists[0]){

        echo json_encode([
            "message" => "Data mismatch"
        ]);

        die();

    }

    $customer_details = $customer_exists[1];

    $customer = [
        "customer_id" => $customer_details->ID,
        "first_name" => $customer_details->FirstName,
        "last_name" => $customer_details->LastName,
        "gender" => $customer_details->Gender,
        "email_address" => $customer_details->EmailAddress
    ];

    require_once $root_redirect."ebl/Products.class.php";

    $products_obj = new Products();


    $products = [];


    $transaction_products = $products_obj->get_transaction_products($transaction_id);

    foreach($transaction_products as $transaction_product){

        $product_build = [];

        $product_id = $transaction_product->Product;

        $product_exists = $products_obj->product_exists("ProductID", $product_id);

        if(!$product_exists[0]){

            echo json_encode([
                "message" => "Data mismatch"
            ]);
    
            die();

        }

        $product_details = $product_exists[1];

        $product_build["product_id"] = $transaction_product->Product;
        $product_build["quantity"] = $transaction_product->Quantity;
        $product_build["unit_price"] = $transaction_product->UnitPrice;
        $product_build["amount"] = $transaction_product->Amount;
        $product_build["product_image"] = $__base_url.$product_details->ProductImage;
        $product_build["product_name"] = $product_details->ProductName;

        array_push($products, $product_build);

    }

    echo json_encode([
        "message" => "Transaction details fetched successfully",
        "data" => [
            "transaction_information" => $transaction,
            "sales_person_information" => $sales_person,
            "customer_information" => $customer,
            "products" => $products
        ]
    ])

?>