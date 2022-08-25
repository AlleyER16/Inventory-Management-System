<?php

    require_once "../helpers/cors.php";

    header("Content-Type: application/json");

    if (!isset($_GET["search_keyword"]) || empty($_GET["search_keyword"])){

        echo json_encode([
            "message" => "Fill in all fields"
        ]);

        die();

    }

    $search_keyword = $_GET["search_keyword"];

    $page = $_GET["page"] ?? 1;
    $division = $_GET["division"] ?? 4;

    $root_redirect = "../../";

    require_once $root_redirect."ebl/Products.class.php";

    $products_obj = new Products();

    $search_products = $products_obj->get_search_products($search_keyword, $page, $division);

    $__base_url = "http://localhost/ims/";

    for($i = 0; $i < count($search_products); $i++){

        $search_products[$i]->ProductImage = $__base_url.$search_products[$i]->ProductImage;

    }

    echo json_encode([
        "message" => "Products search fetched successfully",
        "search_products" => $search_products,
        "pagination" => $products_obj->get_search_products_pagination($search_keyword, $division)
    ]);

?>