import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Loading from "./pages/Loading";
import SalesPersonLogin from "./pages/sales_person/Login";
import SalesPersonTransactions from "./pages/sales_person/Transactions";
import AddNewTransaction from "./pages/sales_person/NewTransaction";
import SalesPersonTransactionReceipt from "./pages/sales_person/TransactionReceipt";

import AdminTransactions from "./pages/admin/Transactions";
import AdminLogin from "./pages/admin/Login";
import SalesPersons from "./pages/admin/SalesPersons";
import SalesPerson from "./pages/admin/SalesPerson";
import AddSalesPerson from "./pages/admin/AddSalesPerson";
import AdminProducts from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Loading/>}/>
        <Route exact path="/login" element={<SalesPersonLogin/>}/>
        <Route exact path="/transactions" element={<SalesPersonTransactions/>}/>
        <Route exact path="/new_transaction" element={<AddNewTransaction/>}/>
        <Route exact path="/receipt/:id" element={<SalesPersonTransactionReceipt/>}/>

        <Route exact path="/admin" element={<AdminTransactions/>}/>
        <Route exact path="/admin/login" element={<AdminLogin/>}/>
        <Route exact path="/admin/transactions" element={<AdminTransactions/>}/>
        <Route exact path="/admin/sales_persons" element={<SalesPersons/>}/>
        <Route exact path="/admin/sales_person/:id" element={<SalesPerson/>}/>
        <Route exact path="/admin/add_sales_person" element={<AddSalesPerson/>}/>
        <Route exact path="/admin/products" element={<AdminProducts/>}/>
        <Route exact path="/admin/add_product" element={<AddProduct/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
