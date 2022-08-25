<?php

    require_once "../helpers/cors.php";

    header("Content-Type: application/json");

    if(isset($_POST["firstname"]) && isset($_POST["lastname"]) && isset($_POST["username"])
    && isset($_POST["password"]) && isset($_FILES["picture"])){

        $firstname = $_POST["firstname"];
        $lastname = $_POST["lastname"];
        $username = $_POST["username"];
        $password = $_POST["password"];
        $picture = $_FILES["picture"];

        if(!empty($firstname) && !empty($lastname) && !empty($username) && !empty($password) && !empty($picture)){

            $root_redirect = "../../";

            require_once $root_redirect."ebl/SalesPersons.class.php";

            $sales_persons_obj = new SalesPersons();

            if($sales_persons_obj->sales_person_exists("Username", $username)[0]){

                echo json_encode([
                    "message" => "Sales person exists with inputed username"
                ]);

                die();

            }

            $add_sales_person = $sales_persons_obj->add_sales_person($firstname, $lastname, $username, $password);

            if($add_sales_person[0]){

                $sales_person_id = $add_sales_person[1];

                $sales_person_dir = $root_redirect."dc/sales_person/$sales_person_id/";

                if(@mkdir($sales_person_dir)){

                    $new_file_name = uniqid("", true)."_".$picture["name"];

                    $destination = $sales_person_dir.$new_file_name;

                    if(move_uploaded_file($picture["tmp_name"], $destination)){

                        $file_path = "dc/sales_person/$sales_person_id/".$new_file_name;

                        if($sales_persons_obj->update_sales_person_datum($sales_person_id, "Picture", $file_path)){

                            echo json_encode([
                                "message" => "Sales person added successfully",
                                "sales_person_id" => $sales_person_id
                            ]);

                        }else{

                            $sales_persons_obj->delete_sales_person($sales_person_id);

                            rmdir($sales_person_dir);

                            echo json_encode([
                                "message" => "Error adding sales person. Try again"
                            ]);

                        }

                    }else{

                        $sales_persons_obj->delete_sales_person($sales_person_id);

                        rmdir($sales_person_dir);

                        echo json_encode([
                            "message" => "Error adding sales person. Try again"
                        ]);

                    }

                }else{

                    $sales_persons_obj->delete_sales_person($sales_person_id);

                    echo json_encode([
                        "message" => "Error adding sales person. Try again"
                    ]);

                }

            }else{

                echo json_encode([
                    "message" => "Error adding sales person. Try again"
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