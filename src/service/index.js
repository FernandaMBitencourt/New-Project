import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-api-desafio.cloudfunctions.net/",
});

export default api;