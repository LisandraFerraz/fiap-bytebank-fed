import { apiFetch } from "@bytebank/utils";
import { UserDataStore } from "../../stores/user-data-store";
import { IExpansesChart } from "../interfaces/charts";

export const UseCharts = () => {
  const { access_token, user } = UserDataStore((state) => state.data);

  const expansesChart = async () => {
    return await apiFetch<IExpansesChart>({
      url: `/api/charts/expanses?usuarioCpf=${user?.cpf}`,
      method: "GET",
      access_token: access_token,
    });
  };

  return {
    expansesChart,
  };
};
