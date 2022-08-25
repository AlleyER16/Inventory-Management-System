<?php

    require_once (dirname(__DIR__).'/ebl/config/Dbh.config.php');

    class Transactions extends Dbh{

        private const TRANSACTIONS_TABLE = "Transactions";

        public function __construct() {
            $this->db_object = $this->getConnection();
        }

        public function get_transactions($sales_person_id, $transaction_type, $start_date, $end_date){

            

        }

        public function transacion_exists_by_id($transaction_id){

            //sanitizing variables
            $transaction_id = $this->SanitizeVariable($transaction_id);

            //operations
            $sql = "SELECT * FROM ".self::TRANSACTIONS_TABLE." WHERE ID = ?";
            $prepared_statement = $this->db_object->prepare($sql);
            $prepared_statement->execute([$transaction_id]);

            if($prepared_statement->rowCount() == 1){

                return [true, $prepared_statement->fetchAll()[0]];

            }else{

                return [false];

            }

        }

        public function add_transaction($sales_person_id, $payment_type, $customer) {

            //sanitizing variables
            $sales_person_id = $this->SanitizeVariable($sales_person_id);
            $payment_type = $this->SanitizeVariable($payment_type);
            $customer = $this->SanitizeVariable($customer);

            //operations
            $sql = "INSERT INTO ".self::TRANSACTIONS_TABLE."(SalesPerson, PaymentType, Customer, TransactionTimestamp) VALUES(?, ?, ?, ?)";
            $prepared_statement = $this->db_object->prepare($sql);
            
            if($prepared_statement->execute([$sales_person_id, $payment_type, $customer, time()])){

                return [true, $this->db_object->lastInsertId()];

            }else{

                return [false];

            }

        }

        public function update_transaction_datum($id, $datum_key, $new_value){

            //sanitizing variables
            $id = $this->SanitizeVariable($id);
            $datum_key = $this->SanitizeVariable($datum_key);
            $new_value = $this->SanitizeVariable($new_value);

            //operations
            $sql = "UPDATE ".self::TRANSACTIONS_TABLE." SET $datum_key = ? WHERE ID = ?";
            $prepared_statement = $this->db_object->prepare($sql);
            
            return $prepared_statement->execute([$new_value, $id]);

        }

        public function delete_transaction($id){

            //sanitiing variables
            $id = $this->SanitizeVariable($id);

            //operations
            $sql = "DELETE FROM ".self::TRANSACTIONS_TABLE." WHERE ID = ?";
            $prepared_statement = $this->db_object->prepare($sql);
            
            return $prepared_statement->execute([$id]);

        }

    }

?>
