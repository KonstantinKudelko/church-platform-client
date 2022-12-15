import axios from "axios";
import { API_URL } from "@/constants";
import { useMutation } from "react-query";

export const useLogin = () => {
  return useMutation((body) => axios.post(`${API_URL}/login`, body));
};
