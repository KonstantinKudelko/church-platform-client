import { API_URL } from "@/constants";
import { useMutation } from "react-query";
import { queryClient } from "@/app";
import { axiosInstance } from "@/utils/axios.util";

export const usePostMessage = (messageId) => {
  return useMutation(
    ({ text, channelId, workspaceId }) =>
      axiosInstance.post(`${API_URL}/proxy/${workspaceId}/chat.post`, {
        channel: channelId,
        text,
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries(["history-conversation", messageId]);
        queryClient.invalidateQueries(["chats"]);
      },
    },
  );
};
