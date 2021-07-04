import { Client } from "./web-api-client";
import axios from "axios";
import authService from "../components/auth/AuthorizeService";

export async function financeApi() {
  const token = await authService.getAccessToken();

  const instance = axios.create({});

  instance.defaults.headers.common["Authorization"] = "bearer " + token;

  instance.interceptors.response.use(
    (request) => {
      return request;
    },
    (error) => {
      if (error.response.status === 401) {
        authService.signIn({ returnUrl: "https://localhost:5001/" });
      }
      if (error.response.status === 500) {
        console.log(error);
      }
    }
  );

  return new Client(undefined, instance);
}
