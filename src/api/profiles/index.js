import { API_URL } from "@/constants";
import { queryClient } from "@/app";
import { axiosInstance } from "@/utils/axios.util";
import { useMutation, useQuery } from "react-query";

export const useProfile = (senderId) => {
  return useQuery(["profile", senderId], async () => {
    const { data } = await axiosInstance.get(`${API_URL}/profiles/${senderId}`);
    return data;
  });
};

export const useSetProfile = (senderId) => {
  return useMutation((body) => axiosInstance.post(`${API_URL}/profiles/${senderId}`, body), {
    onSuccess() {
      queryClient.invalidateQueries(["chats"]);
      queryClient.invalidateQueries(["profile", senderId]);
      queryClient.invalidateQueries(["profile-custom-statuses"]);
    },
  });
};

export const useProfileStatuses = () => {
  return useQuery(["profile-custom-statuses"], async () => {
    const { data } = await axiosInstance.get(`${API_URL}/profiles/status/custom`);
    return data;
  });
};
