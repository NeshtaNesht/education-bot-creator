import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.API_HOST,
});

export const API_VK = axios.create({
  baseURL: 'https://api.vk.com/method/',
});
// export const API_VK = axios.create({
//   baseURL: "https://api.vk.com/method/"
// })
