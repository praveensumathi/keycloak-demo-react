import axios from "axios";
import { createRoot } from "react-dom/client";
import { applyMiddleware, createStore } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import thunk from "redux-thunk";
import App from "./components/App";
import rootReducer from "./modules";
import UserService from "./services/UserService";

// HTTP

export const _axios = axios.create({
  baseURL: "http://localhost:8000",
});

_axios.interceptors.request.use(
  async (config) => {
    if (UserService.isLoggedIn()) {
      if (UserService.isTokenExpired()) {
        await UserService.doLogout();
      }

      // Attach the updated token to the headers
      const token = UserService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// REDUX STORE

const _middleware = applyMiddleware(thunk, axiosMiddleware(_axios));
const store = createStore(rootReducer, _middleware);

// APP

const renderApp = () =>
  createRoot(document.getElementById("app")).render(<App store={store} />);

UserService.initKeycloak(renderApp);
