import axios from "axios"

export const instance = axios.create({
  baseURL: 'https://tg-web-app-backend.onrender.com',
  timeout: 3000,
  headers: {'Content-Type': 'application/json'},
})