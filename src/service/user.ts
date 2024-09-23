
import axios from 'axios'

const VITE_APP_BACKEND_URL = "https://swapi.dev/api"


export const getPeoples = async () => {
  return axios.get(`${VITE_APP_BACKEND_URL}/people`)
}

export const getPeople = async (id: string) => {
  return await axios.get(`${VITE_APP_BACKEND_URL}/people/${id}/`);
}