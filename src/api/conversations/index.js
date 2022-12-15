import { API_URL } from "@/constants";
import { useQuery } from "react-query";
import { axiosInstance } from "@/utils/axios.util";

export const useOpenConversation = ({ senderId, workspaceId }) => {
  return useQuery(
    ["open-conversation", senderId],
    async () => {
      const { data } = await axiosInstance.post(
        `${API_URL}/proxy/${workspaceId}/conversations.open`,
        {
          channel: senderId,
        },
      );
      return data;
    },
    {
      enabled: Boolean(senderId) && Boolean(workspaceId),
    },
  );
};

export const useConversationHistory = ({ channelId, workspaceId, messageId }) => {
  return useQuery(["history-conversation", messageId], async () => {
    return axiosInstance
      .get(`${API_URL}/proxy/${workspaceId}/conversations.history`, {
        params: {
          channel: channelId,
        },
      })
      .then(({ data }) => data.messages.reverse());
  });
};
