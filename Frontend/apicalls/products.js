const axios = require("axios");

const API = "http://localhost:3000";

const getProduct = (prodId) => {
  return axios
    .get(`${API}/product/${prodId}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getProducts = () => {
  return axios
    .get(`${API}/product/all`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = {
  getProduct,
  getProducts,
};
