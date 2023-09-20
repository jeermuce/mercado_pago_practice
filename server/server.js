const express = require("express");
const server = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

const corsOptions = {
    origin: "*",
};
const port = 3001;

mercadopago.configure({
    access_token: `${ACCESS_TOKEN}`, //TODO: add access token
});

server.use(cors());
server.use(express.json());
server.get("/", function (req, res) {
    res.send("mercadopago server working");
});
server.post("/preference", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            },
        ],
        back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "",
        },
        auto_return: "approved",
    };
    mercadopago.preferences.create(preference).then(function (response) {
        res.json({ id: response.id }).catch(function (error) {
            {
                throw { error: error.message };
            }
        });
    });
});

server.listen(port, function () {
    console.log(`server running in ${port}`);
});
