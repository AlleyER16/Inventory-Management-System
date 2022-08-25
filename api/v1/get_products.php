<?php

    require_once "../helpers/cors.php";
    
    header("Content-Type: application/json");

    $page = $_GET["page"] ?? 1;
    $division = $_GET["division"] ?? 8;

    $root_redirect = "../../";

    require_once $root_redirect."ebl/Products.class.php";

    $products_obj = new Products();

    $products = $products_obj->get_products($page, $division);

    $__base_url = "http://localhost/ims/";

    for($i = 0; $i < count($products); $i++){

        $products[$i]->Sold = false;
        $products[$i]->ProductImage = $__base_url.$products[$i]->ProductImage;

    }

    echo json_encode([
        "message" => "Products fetched successfully",
        "products" => $products,
        "pagination" => $products_obj->get_products_pagination($division)
    ]);

?>