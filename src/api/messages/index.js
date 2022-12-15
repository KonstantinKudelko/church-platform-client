import { queryClient } from "@/app";
import { axiosInstance } from "@/utils/axios.util";
import { useMutation, useQuery } from "react-query";
import { API_URL, MESSAGE_STATUSES, SORT_FIELDS } from "@/constants";
import { sortByDate } from "@/utils/sort-by-date.util";

export const useMessages = (status = MESSAGE_STATUSES.DRAFT, sort = SORT_FIELDS.CREATED_AT) => {
  const params = new URLSearchParams({
    status,
  });

  return useQuery(["messages", status], async () => {
    const { data } = await axiosInstance.get(`${API_URL}/messages`, {
      params,
    });

    return sortByDate(data, sort);
  });
};

export const useSenderMessages = (senderId) => {
  return useQuery(["messages", "sender", senderId], async () => {
    const { data } = await axiosInstance.get(`${API_URL}/messages/sender/${senderId}`);
    return data;
  });
};

export const useGroupMessages = (status) => {
  const params = new URLSearchParams({
    status,
  });

  return useQuery(["chats"], async () => {
    const { data } = await axiosInstance.get(`${API_URL}/messages/chats`, {
      params,
    });
    return sortByDate(data, SORT_FIELDS.UPDATED_AT);
  });
};

export const useUpdateGroupMessage = (senderId, status) => {
  const params = new URLSearchParams({
    senderId,
    status,
  });

  return useMutation(() => axiosInstance.put(`${API_URL}/messages/chats`, {}, { params }), {
    onSuccess() {
      queryClient.invalidateQueries(["chats"]);
    },
  });
};

export const useUpdateMessage = (status) => {
  return useMutation(({ id, ...body }) => axiosInstance.put(`${API_URL}/messages/${id}`, body), {
    onSuccess() {
      queryClient.invalidateQueries(["messages", status]);
      queryClient.invalidateQueries(["messages-count"]);
    },
  });
};

export const useMessagesCounter = () => {
  return useQuery(["messages-count"], async () => {
    const { data } = await axiosInstance.get(`${API_URL}/messages/count`);
    return data;
  });
};
