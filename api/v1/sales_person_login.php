<?php

    require_once "../helpers/cors.php";

    header("Content-Type: application/json");

    if(isset($_POST["username"]) && isset($_POST["password"])){

        $username = $_POST["username"];
        $password = $_POST["password"];

        if(!empty($username) && !empty($password)){

            $root_redirect = "../../";

            require_once $root_redirect."ebl/SalesPersons.class.php";

            $sales_persons_obj = new SalesPersons();

            $sales_person_exists = $sales_persons_obj->sales_person_exists_by_auth($username, $password);

            $sales_person_details = $sales_person_exists[1];

            $__base_url = "http://localhost/ims/";

            $sales_person_details->Picture = $__base_url.$sales_person_details->Picture;

            if($sales_person_exists[0]){

                echo json_encode([
                    "message" => "Login successfully",
                    "sales_person_details" => $sales_person_details
                ]);

            }else{

                echo json_encode([
                    "message" => "Invalid username or password"
                ]);

            }

        }else{

            echo json_encode([
                "message" => "Fill in all fields"
            ]);

        }

    }else{

        echo json_encode([
            "message" => "All fields not set"
        ]);

    }

?>