const axios = require("axios");
const API = "https://warrenty-backend.herokuapp.com";

const getProduct = (prodId) => {
    return axios
        .get(`${API}/product/${prodId}`)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
};

const getProducts = () => {
    return axios
        .get(`${API}/product/all`)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
};
const modifyProd = (prodId, qty) => {
    return axios
        .get(`${API}/product/modify/${prodId}&${qty}`)
        .then(function(response) {
            return response.data;
        })
        .catch(function(err) {
            console.log(err);
        });
};
module.exports = {
    getProduct,
    getProducts,
    modifyProd,
};