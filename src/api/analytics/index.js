import { API_URL } from "@/constants";
import { useQuery } from "react-query";
import { axiosInstance } from "@/utils/axios.util";

export const useAnalytics = (params) => {
  const paramsValues = Object.values(params);
  const queryParams = new URLSearchParams({
    ...params,
  });

  return useQuery(["analytics", ...paramsValues], async () => {
    const { data } = await axiosInstance.get(`${API_URL}/analytic/profile`, {
      params: queryParams,
    });
    return data;
  });
};
