import { methods } from "../../../utils/types";
import { env } from "../_environment/environment";

interface IApi {
  url: string;
  method: methods;
  params?: any;
}

export const coreApi = async ({ url, method, params }: IApi) => {
  let preparedUrl = `${env.localApi}/${url}`;

  const config = {
    method: method,
    headers: { "Content-Type": "application/json" },
  };

  if (method !== "GET" && method !== "DELETE" && params) {
    Object.assign(config, { params: params });
  }

  const res = await fetch(preparedUrl, config);
  return res;
};
