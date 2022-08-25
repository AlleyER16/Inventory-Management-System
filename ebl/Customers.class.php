<?php

    require_once (dirname(__DIR__).'/ebl/config/Dbh.config.php');

    class Customers extends Dbh{

        private const CUSTOMERS_TABLE = "Customers";

        public function __construct() {
            $this->db_object = $this->getConnection();
        }

        public function customer_exists($unique_key, $test){

            //sanitizing variables
            $unique_key = $this->SanitizeVariable($unique_key);
            $test = $this->SanitizeVariable($test);

            //operations
            $sql = "SELECT * FROM ".self::CUSTOMERS_TABLE." WHERE $unique_key = ?";
            $prepared_statement = $this->db_object->prepare($sql);
            $prepared_statement->execute([$test]);

            if($prepared_statement->rowCount() == 1){

                return [true, $prepared_statement->fetchAll()[0]];

            }else{

                return [false];

            }

        }

        public function add_customer($first_name, $last_name, $gender, $email_address) {

            //sanitizing variables
            $first_name = $this->SanitizeVariable($first_name);
            $last_name = $this->SanitizeVariable($last_name);
            $gender = $this->SanitizeVariable($gender);
            $email_address = $this->SanitizeVariable($email_address);

            //operations
            $sql = "INSERT INTO ".self::CUSTOMERS_TABLE."(FirstName, LastName, Gender, EmailAddress, Timestamp) VALUES(?, ?, ?, ?, ?)";
            $prepared_statement = $this->db_object->prepare($sql);
            
            if($prepared_statement->execute([($first_name == "") ? NULL : $first_name, ($last_name == "") ? NULL : $last_name, $gender, ($email_address == "") ? NULL : $email_address, time()])){

                return [true, $this->db_object->lastInsertId()];

            }else{

                return [false];

            }

        }

        public function delete_customer($id){

            //sanitiing variables
            $id = $this->SanitizeVariable($id);

            //operations
            $sql = "DELETE FROM ".self::CUSTOMERS_TABLE." WHERE ID = ?";
            $prepared_statement = $this->db_object->prepare($sql);
            
            return $prepared_statement->execute([$id]);

        }

    }

?>
