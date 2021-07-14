const axios = require("axios");

const API = "http://localhost:3000";

const getWarr = (warrId) => {
    return axios
        .get(`${API}/single/${warrId}`)
        .then(function(response) {
            return response.data;
        })
        .catch(function(err) {
            console.log(err);
        });
};

const getAllWarr = () => {
    return axios
        .get(`${API}/all`)
        .then(function(response) {
            return response.data;
        })
        .catch(function(err) {
            console.log(err);
        });
};

module.exports = { getWarr };