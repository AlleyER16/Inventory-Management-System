<?php

    require_once (dirname(__DIR__).'/ebl/config/Dbh.config.php');

    class SalesPersons extends Dbh{

        private const SALES_PERSONS_TABLE = "SalesPersons";
        private const SALES_PERSONS_SESSIONS_TABLE = "SalesPersonsSessions";

        public function __construct() {
            $this->db_object = $this->getConnection();
        }

        public function sales_person_exists_by_auth($username, $password){

            //sanitizing variables
            $username = $this->SanitizeVariable($username);
            $password = $this->SanitizeVariable($password);

            //operations
            $sql = "SELECT * FROM ".self::SALES_PERSONS_TABLE." WHERE Username = ? AND Password = ?";
            $prepared_statement = $this->db_object->prepare($sql);
            $prepared_statement->execute([$username, $password]);

            if($prepared_statement->rowCount() == 1){

                return [true, $prepared_statement->fetchAll()[0]];

            }else{

                return [false];

            }

        }

        public function sales_person_exists($unique_key, $test){

            //sanitizing variables
            $unique_key = $this->SanitizeVariable($unique_key);
            $test = $this->SanitizeVariable($test);

            //operations
            $sql = "SELECT * FROM ".self::SALES_PERSONS_TABLE." WHERE $unique_key = ?";
            $prepared_statement = $this->db_object->prepare($sql);
            $prepared_statement->execute([$test]);

            if($prepared_statement->rowCount() == 1){

                return [true, $prepared_statement->fetchAll()[0]];

            }else{

                return [false];

            }

        }

        public function get_num_sales_persons(){

            $sql = "SELECT COUNT(ID) as NumSalesPersons FROM ".self::SALES_PERSONS_TABLE;
            $prepared_statement = $this->db_object->prepare($sql);
            $prepared_statement->execute([]);

            return $prepared_statement->fetchAll()[0]->NumSalesPersons;

        }

        public function get_sales_persons_pagination($division){

            //operations
            $num_sales_persons = $this->get_num_sales_persons();

            $pages = floor($num_sales_persons/$division);

            return (($num_sales_persons % $division) > 0) ? $pages + 1 : $pages;

        }

        public function get_sales_persons($page, $division){

            //sanitizing variables
            $page = $this->SanitizeVariable($page);
            $division = $this->SanitizeVariable($division);

            $start = ($page - 1) * $division;

            //operations
            $sql = "SELECT * FROM ".self::SALES_PERSONS_TABLE." ORDER BY ID DESC LIMIT $start, $division";
            $prepared_statement = $this->db_object->prepare($sql);
            $prepared_statement->execute([]);

            return $prepared_statement->fetchAll();

        }

        public function add_sales_person($firstname, $lastname, $username, $password){

            //sanitizing variables
            $firstname = $this->SanitizeVariable($firstname);
            $lastname = $this->SanitizeVariable($lastname);
            $username = $this->SanitizeVariable($username);
            $password = $this->SanitizeVariable($password);

            //operations
            $sql = "INSERT INTO ".self::SALES_PERSONS_TABLE."(FirstName, LastName, Username, Password, RecordTimestamp) VALUES(?, ?, ?, ?, ?)";
            $prepared_statement = $this->db_object->prepare($sql);
            
            if($prepared_statement->execute([$firstname, $lastname, $username, $password, time()])){
                return [true, $this->db_object->lastInsertId()];
            }else{
                return [false];
            }

        }
        
        public function update_sales_person_datum($id, $datum_key, $new_value){

            //sanitizing variables
            $id = $this->SanitizeVariable($id);
            $datum_key = $this->SanitizeVariable($datum_key);
            $new_value = $this->SanitizeVariable($new_value);

            //operations
            $sql = "UPDATE ".self::SALES_PERSONS_TABLE." SET $datum_key = ? WHERE ID = ?";
            $prepared_statement = $this->db_object->prepare($sql);
            
            return $prepared_statement->execute([$new_value, $id]);

        }

        public function delete_sales_person($id){

            //sanitiing variables
            $id = $this->SanitizeVariable($id);

            //operations
            $sql = "DELETE FROM ".self::SALES_PERSONS_TABLE." WHERE ID = ?";
            $prepared_statement = $this->db_object->prepare($sql);
            
            return $prepared_statement->execute([$id]);

        }

    }

?>
