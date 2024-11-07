import axios from 'axios';

const ProductUrl = "http://localhost:8080/api/products";

export const getProducts = async() => {
    const response = await axios.get(ProductUrl);
    return response.data;
};

export const getProduct = async(id) => {
    const response = await axios.get(`${ProductUrl}/${id}`);
    return response.data;
};
