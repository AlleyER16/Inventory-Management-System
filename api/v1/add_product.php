<?php

    require_once "../helpers/cors.php";

    header("Content-Type: application/json");

    if(isset($_POST["product_name"]) && isset($_POST["product_price"]) && isset($_POST["sold_in_stocks"]) 
    && isset($_POST["stock"]) && isset($_FILES["picture"])){

        $product_name = $_POST["product_name"];
        $product_price = $_POST["product_price"];
        $sold_in_stocks = $_POST["sold_in_stocks"];
        $stock = $_POST["stock"];
        $picture = $_FILES["picture"];

        if(!empty($product_name) && $sold_in_stocks != "" && !empty($picture)){

            $root_redirect = "../../";

            require_once $root_redirect."ebl/Products.class.php";

            $products_obj = new Products();

            $add_product = $products_obj->add_product($product_name, $sold_in_stocks, $product_price, $stock);

            if($add_product[0]){

                $product_id = $add_product[1];

                $product_dir = $root_redirect."dc/products/$product_id/";

                if(@mkdir($product_dir)){

                    $new_file_name = uniqid("", true)."_".$picture["name"];

                    $destination = $product_dir.$new_file_name;

                    if(move_uploaded_file($picture["tmp_name"], $destination)){

                        $file_path = "dc/products/$product_id/".$new_file_name;

                        if($products_obj->update_product_datum($product_id, "ProductImage", $file_path)){

                            echo json_encode([
                                "message" => "Product added successfully",
                                "product_id" => $product_id
                            ]);

                        }else{

                            $products_obj->delete_product($product_id);

                            rmdir($product_dir);

                            echo json_encode([
                                "message" => "Error adding product. Try again"
                            ]);

                        }

                    }else{

                        $products_obj->delete_product($product_id);

                        rmdir($product_dir);

                        echo json_encode([
                            "message" => "Error adding product. Try again"
                        ]);

                    }

                }else{

                    $products_obj->delete_product($product_id);

                    echo json_encode([
                        "message" => "Error adding product. Try again"
                    ]);

                }

            }else{

                echo json_encode([
                    "message" => "Error adding product. Try again"
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