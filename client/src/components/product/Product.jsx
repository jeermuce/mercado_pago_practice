import React, { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const PUBLIC_KEY = "";

import "./Product.css";

function Product() {
    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago(PUBLIC_KEY); //TODO: YOUR PUBLIC KEY

    const createPreference = async () => {
        try {
            const response = await axios.post("/preference", {
                description: "Bones",
                price: 100,
                quantity: 2,
                currency_id: "USD",
            });
            const { id } = response.data;

            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const handlePayment = async () => {
        try {
            const id = await createPreference();
            if (id) {
                setPreferenceId(id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card_product_container">
            <div className="card_product">
                <div className="card">
                    <img src="https://i.imgur.com/FTAK7os.png" alt="" />
                    <h3>product A</h3>
                    <p className="price">$100.00</p>
                    <button className="btn_buy" onClick={handlePayment}>
                        buy
                    </button>
                    {preferenceId && (
                        <Wallet initialization={{ preferenceId }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Product;
