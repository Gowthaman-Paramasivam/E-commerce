import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

export const signIn = (formData) => API.post("/user/signIn", formData);
export const signUp = (formData) => API.post("/user/signUp", formData);

export const getProduct = (data) => API.post("product/getproduct", data);

export const placeOrder = (data) => API.post("order/placeOrder", data);