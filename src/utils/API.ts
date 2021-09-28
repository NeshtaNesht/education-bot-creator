import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.API_HOST,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  //   'Access-Control-Allow-Headers':
  //     'X-Requested-With, content-type, Authorization',
  // },
  withCredentials: true,
});
