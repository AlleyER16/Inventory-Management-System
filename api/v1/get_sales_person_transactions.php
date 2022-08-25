<?php

    require_once "../helpers/cors.php";
        
    header("Content-Type: application/json");

    if(isset($_POST["sales_person_id"]) && isset($_POST["transaction_type"]) 
    && isset($_POST["start_date"]) && isset($_POST["end_date"])){

        $sales_person_id = $_POST["sales_person_id"];
        $transaction_type = $_POST["transaction_type"];
        $start_date = $_POST["start_date"];
        $end_date = $_POST["end_date"];

        if($sales_person_id != "" && $transaction_type !== ""){

            

        }else{

            echo json_encode([
                "message" => "Fill in all important fields"
            ]);

        }

    }else{

        echo json_encode([
            "message" => "All fields not set"
        ]);

    }

?>