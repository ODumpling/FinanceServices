import { Client } from "./web-api-client";
import axios from "axios";
import authService from "../components/auth/AuthorizeService";

export async function fsapi() {
  const token = await authService.getAccessToken();

  const instance = axios.create({});

  instance.defaults.headers.common["Authorization"] = "bearer " + token;

  return new Client(undefined, instance);
}
