import axios from "axios";
import User from "../interfaces/User";

let api: string = process.env.REACT_APP_API || "";

export function checkUser(userToCheck: User) {
  return axios.post(`${api}/login`, userToCheck);
}

export function createUser(userToCreate: User) {
  return axios.post(`${api}/register`, userToCreate);
}
