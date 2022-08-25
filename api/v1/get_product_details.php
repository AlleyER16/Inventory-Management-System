<?php

    require_once "../helpers/cors.php";

    header("Content-Type: application/json");

    if(!isset($_GET["product_id"]) || $_GET["product_id"] == ""){

        echo json_encode([
            "message" => "Error identifying product"
        ]);

        die();

    }

    $product_id = $_GET["product_id"];

    $root_redirect = "../../";

    require_once $root_redirect."ebl/Products.class.php";

    $products_obj = new Products();

    $product_exists = $products_obj->product_exists("ProductID", $product_id);

    if(!$product_exists[0]){

        echo json_encode([
            "message" => "Error identifying product"
        ]);

        die();

    }else{

        $__base_url = "http://localhost/ims/";

        $product_exists[1]->ProductImage = $__base_url.$product_exists[1]->ProductImage;

        echo json_encode([
            "message" => "Product details fetched successfully",
            "product_details" => $product_exists[1]
        ]);

        die();

    }

?>