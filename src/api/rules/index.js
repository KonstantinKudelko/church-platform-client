import { API_URL } from "@/constants";
import { queryClient } from "@/app";
import { axiosInstance } from "@/utils/axios.util";
import { useMutation, useQuery } from "react-query";

export const useRules = () => {
  return useQuery(["rules"], async () => {
    const { data } = await axiosInstance.get(`${API_URL}/rule`);
    return data;
  });
};

export const useNewRule = () => {
  return useMutation((body) => axiosInstance.post(`${API_URL}/rule`, body), {
    onSuccess() {
      queryClient.invalidateQueries(["rules"]);
    },
  });
};

export const useUpdateRule = () => {
  return useMutation(({ _id, ...body }) => axiosInstance.put(`${API_URL}/rule/${_id}`, body), {
    onSuccess() {
      queryClient.invalidateQueries(["rules"]);
    },
  });
};

export const useDeleteRule = () => {
  return useMutation((_id) => axiosInstance.delete(`${API_URL}/rule/${_id}`), {
    onSuccess() {
      queryClient.invalidateQueries(["rules"]);
    },
  });
};
