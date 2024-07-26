import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1337/admin' // Change to your Strapi base URL
});

export default instance;
