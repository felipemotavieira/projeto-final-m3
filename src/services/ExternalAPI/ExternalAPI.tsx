import axios from "axios";

const ExternalAPI = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/",
  timeout: 5000
});

export default ExternalAPI;
