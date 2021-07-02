import axi from 'axios';

export const axios = axi.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});
