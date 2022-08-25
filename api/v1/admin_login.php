<?php

    require_once "../helpers/cors.php";

    header("Content-Type: application/json");

    if(isset($_POST["username"]) && isset($_POST["password"])){

        $username = $_POST["username"];
        $password = $_POST["password"];

        if(!empty($username) && !empty($password)){

            if($username == "ims_admin" && $password == "ims_admin"){

                session_start();

                $_SESSION["admin_logged"] = true;
                setcookie("admin_logged", "logged", time() + 3600, "/");

                echo json_encode([
                    "message" => "Admin logged successfully"
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