import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";
const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/api/users/signin", formData);
export const signUp = (formData) => API.post("/api/users/signup", formData);

export const createTour = (tourData) => API.post("/api/tours", tourData);
export const getTours = (page) => API.get(`/api/tours?page=${page}`);
export const getTour = (id) => API.get(`/api/tours/${id}`);
export const deleteTour = (id) => API.delete(`/api/tours/${id}`);
export const updateTour = (updatedTourData, id) => API.patch(`/api/tours/${id}`, updatedTourData);
export const getToursByUser = (userId) => API.get(`/api/tours/userTours/${userId}`);
export const getToursBySearch = (searchQuery) => API.get(`/api/tours/search?searchQuery=${searchQuery}`);
export const getRelatedTours = (tags) => API.post(`/api/tours/relatedTours`, tags);
export const likeTour = (id) => API.patch(`api/tours/like/${id}`);