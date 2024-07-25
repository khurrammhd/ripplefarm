import axios from "axios"

export const apiClient = axios.create({
  baseURL: "https://ripplefarm.bluerider.software/api/",
})
