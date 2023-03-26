import axios from "axios";
import Card from "../interfaces/Card";

let api: string = process.env.REACT_APP_API || "";

export function addCard(newCard: Card) {
  return axios.post(`${api}/biz-cards`, newCard, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

export function getCardsByUserId() {
  return axios.get(`${api}/biz-cards`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

export function getAllCards() {
  return axios.get(`${api}/cards`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

export function getCardById(id: number) {
  return axios.get(`${api}/cards/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

export function updateCard(card: Card, updateCardId: number) {
  return axios.put(`${api}/biz-cards/${updateCardId}`, card, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

export function deleteCard(idToDelete: number) {
  return axios.delete(`${api}/biz-cards/${idToDelete}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}
