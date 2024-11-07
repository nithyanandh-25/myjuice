import axios from 'axios';

const CustomerUrl = "http://localhost:8080/Customers";

export const getCustomer = async (id) => {
    const response = await axios.get(`${CustomerUrl}/${id}`);
    return response.data;
}

export const postRegister = async (name, mobilenumber, password) => {
    const response = await axios.post(`${CustomerUrl}/register`, {
        name,
        mobilenumber,
        password,
    });
    return response.data; // Ensure it returns id
}

export const postLogin = async (mobilenumber, password) => {
    const response = await axios.post(`${CustomerUrl}/login`, {
        mobilenumber,
        password,
    });
    return response.data; // Ensure it returns id
}

export const updateCustomer = async (id, formData) => {
    const response = await axios.put(`${CustomerUrl}/${id}`, formData);
    return response.data;
}
