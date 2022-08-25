<?php

    require_once "../helpers/cors.php";
    
    header("Content-Type: application/json");

    $page = $_GET["page"] ?? 1;
    $division = $_GET["division"] ?? 8;

    $root_redirect = "../../";

    require_once $root_redirect."ebl/SalesPersons.class.php";

    $sales_persons_obj = new SalesPersons();

    $sales_persons = $sales_persons_obj->get_sales_persons($page, $division);

    $__base_url = "http://localhost/ims/";

    for($i = 0; $i < count($sales_persons); $i++){

        $sales_persons[$i]->Status = "ACTIVE";
        $sales_persons[$i]->Picture = $__base_url.$sales_persons[$i]->Picture;

    }

    echo json_encode([
        "message" => "Sales persons fetched successfully",
        "sales_persons" => $sales_persons,
        "pagination" => $sales_persons_obj->get_sales_persons_pagination($division)
    ]);

?>