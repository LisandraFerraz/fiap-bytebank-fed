import { methods } from "../../../utils/types";
import { env } from "../_environment/environment";

interface IApi {
  url: string;
  method: methods;
  body?: any;
}

export const coreApi = async ({ url, method, body }: IApi) => {
  let preparedUrl = `${env.localApi}/${url}`;

  const config = {
    method: method,
    headers: { "Content-Type": "application/json" },
  };

  if (method !== "GET" && method !== "DELETE" && body) {
    Object.assign(config, { body: body });
  }

  const res = await fetch(preparedUrl, config);
  return res;
};
