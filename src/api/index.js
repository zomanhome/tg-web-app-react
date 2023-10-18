import axios from "axios"

export const tgInstance = axios.create({
  baseURL: 'https://tg-web-app-backend.onrender.com',
  headers: {'Content-Type': 'application/json'},
})

export const gtInstance = axios.create({
  baseURL: 'https://goose-track-backend-54zr.onrender.com',
  headers: {'Content-Type': 'application/json'},
})

