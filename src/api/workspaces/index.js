import { API_URL } from "@/constants";
import { queryClient } from "@/app";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "@/utils/axios.util";

export const useWorkspaces = () => {
  return useQuery(["workspaces"], async () => {
    const { data } = await axiosInstance.get(`${API_URL}/workspaces`);
    return data;
  });
};

export const useNewWorkspace = () => {
  return useMutation((body) => axiosInstance.post(`${API_URL}/workspaces/`, body), {
    onSuccess() {
      queryClient.invalidateQueries(["workspaces"]);
    },
  });
};

export const useUpdateWorkspace = () => {
  return useMutation((body) => axiosInstance.put(`${API_URL}/workspaces/${body._id}`, body), {
    onSuccess({ data }) {
      queryClient.setQueryData(["workspaces"], (workspaces) =>
        workspaces.map((workspace) => (workspace._id === data._id ? data : workspace)),
      );
    },
  });
};

export const useDeleteWorkspace = () => {
  return useMutation((id) => axiosInstance.delete(`${API_URL}/workspaces/${id}`), {
    onSuccess() {
      queryClient.invalidateQueries(["workspaces"]);
    },
  });
};

export const useBulkAddWorkspaces = () => {
  return useMutation(
    (body) =>
      axiosInstance.post(`${API_URL}/workspaces/bulk`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries(["workspaces"]);
      },
    },
  );
};
