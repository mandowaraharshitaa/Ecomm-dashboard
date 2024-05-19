import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import PrivateComp from "./components/PrivateComp";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateComponent";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComp />}>
          <Route path="/" element={<ProductList/>}></Route>
          <Route path="/add" element={<AddProduct/>}></Route>
          <Route
            path="/update/:id"
            element={<UpdateProduct/>}
          ></Route>
          <Route path="/logout" element={<h1>logout </h1>}></Route>
          <Route path="/profile" element={<h1>Profile </h1>}></Route>
        </Route>

        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
