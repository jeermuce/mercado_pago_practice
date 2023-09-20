import axios from "axios";
import "./App.css";
import Product from "./components/product/Product";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
    return (
        <>
            <Product />
        </>
    );
}

export default App;
